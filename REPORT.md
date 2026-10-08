# Report: a Hugging Face Hub SDK with the Voxgig SDK generator

Kai Chen, 8 October 2026. Mini task 1 for Voxgig.

## What I built

An unofficial SDK for the read side of the Hugging Face Hub API, in TypeScript, Python and Go, generated with
`@voxgig/create-sdkgen` 0.30.6 and `@voxgig/sdkgen` 4.34.1 on Windows 11 with Node 24.14.

- **API choice.** Hugging Face Hub was not in the catalogue, it publishes its own OpenAPI file, and its public read
  endpoints can be tested live without an account.
- **Spec.** The published file is 1.1 MB with 298 paths, so I generated from a slice: 9 operations from the published
  file plus 6 it leaves out. The model, dataset and Space list and info endpoints are missing from Hugging Face's own
  file. `spec/README.md` has the details and `spec/build_slice.py` rebuilds the slice.
- **Entities.** There are 9: Model, Dataset, Space, Paper, DailyPaper, Trending, Collection, Profile and Auth. They
  needed five corrections in `.sdk/model/guide/guide.aontu` (finding 6).

### Results

| Check | TypeScript | Python | Go |
| --- | --- | --- | --- |
| Offline suite (mock transport) | 277 pass, 0 fail, 16 skip | 252 pass, 0 fail, 94 skip | 262 pass, 0 fail, 10 skip |
| Live suite against huggingface.co, no token | 271 pass, 6 fail | 246 pass, 6 fail | 256 pass, 3 fail |

- **Offline skips.** Every skipped test belongs to a feature this SDK was not generated with (retry, cache, netsim
  and so on).
- **Live failures.** Each one is explained:
  - Auth fails in all three languages, as it should without a token (Hugging Face answers 401).
  - Collection direct-load fails in all three, because collection records have no `id` field for the test to
    discover.
  - The remaining TypeScript and Python failures are findings 4 and 5.
- **Smoke test.** `examples/smoke.cjs` makes 14 live calls through the TypeScript SDK and checks the answers, for
  example that `Model.load` of openai-community/gpt2 returns that id and that paper 1706.03762 is "Attention Is All
  You Need". Results: 13 pass, plus 1 known gap (finding 4).

To rerun it:

```bash
cd ts && npm install && npm run build && npm test && cd ..   # offline
node examples/run-live.cjs ts npm test                       # live, with the load-test ids set
node examples/run-live.cjs py python -m pytest -q test
node examples/run-live.cjs go go test ./test/ -count=1
node examples/smoke.cjs
```

## How I worked, and where AI helped

I used an AI coding agent (Claude Code) for most of the work. I chose the API, the slice and the corrections. The
agent did the following:

- ran the scaffold, the installs, generation and the three test suites;
- wrote the slice and supplement scripts, the guide corrections and the smoke test;
- traced the Windows include failure to its source;
- drafted this report.

I checked the results this way:

- **Test logs.** I read every failing test's log and only kept a finding once I could explain the failure.
- **Generated code.** I confirmed each guide correction in the generated `Config.ts` and entity classes.
- **Live calls.** I checked the live answers against huggingface.co directly.
- **Versions.** I checked the publish dates in finding 1 with `npm view`.

The build took about 20 minutes of wall-clock time, from downloading the spec to the last test run. Most of that was
installs and test runs.

## Developer experience findings

Most important first.

### 1. A fresh scaffold fails `npm install` (all platforms, since 5 October)

- **The clash.** create-sdkgen 0.30.6 is the latest release (1 Oct). It pins `@voxgig/apidef` to `~8.22.1` and
  `@voxgig/sdkgen` to `~4.34.0`. That range now resolves to sdkgen 4.34.1 (5 Oct), whose peer range is
  `@voxgig/apidef >=8.23.0`.
- **The symptom.** `npm install` in `.sdk/` stops with ERESOLVE.
- **My workaround.** I raised the pin to `~8.24.0`.
- **Suggestion.** Release create-sdkgen with the new pin. A scheduled CI job that scaffolds from the published
  packages and runs `npm install` would catch this the day it happens.

### 2. Windows: the scaffold's install step cannot start npm

- **The symptom.** `create-sdkgen` prints `Failed to start npm: spawn npm ENOENT`.
- **The cause.** On Windows npm is `npm.cmd`, which `spawn` only finds with `shell: true`.
- **My workaround.** `--no-install`, then `npm install` by hand.

### 3. Windows: every relative include fails during `npm run generate`

- **The symptom.** `source not found: api/api-info.aontu`, from `model/sdk.aontu:13`. The search list shows paths
  under `.sdk/` instead of `.sdk/model/`, without the drive letter.
- **The cause.**
  - `@voxgig/model` always passes the real `fs` into aontu.
  - The `FileResolver` in `@tabnas/multisource` (`dist/resolver/file.js`, line 64) switches to `Path.posix` whenever
    `ctx.meta.fs` is set.
  - On Windows, posix path functions cannot split `C:\...\model\sdk.aontu`, so the including folder is lost and
    resolution falls back to the working directory.
- **My workaround.** A one-line local patch: keep native path semantics on win32. It is in `node_modules`, so it is
  not in this repo.
- **Suggestion.** Choose POSIX semantics from an explicit "virtual fs" flag rather than from the presence of any fs.
  Adding a Windows runner to CI would catch findings 2 and 3.

### 4. A composite id is declared but never used at runtime

Hugging Face ids look like `openai-community/gpt2`, as GitHub ids do. I declared this in the guide with
`id: { parts: ["namespace", "repo"], sep: "/" }`, and it reaches `Config.ts`. Nothing in the TypeScript runtime reads
it, so:

- **What fails.** `client.Model().load({ id: 'openai-community/gpt2' })` fails with
  `URL path has no value for {namespace}, {repo}`.
- **What works.** `client.Model().load({ namespace: 'openai-community', repo: 'gpt2' })`.
- **Knock-on effect.** For the same reason, the generator switches off the `load` step of the Model, Dataset and
  Space entity flows as unreachable (warning `flow-step-unreachable`).
  - Without ids, the TypeScript live run fails those flows as "coverage incomplete".
  - With the ids supplied through `*_ENTID`, the flow does send the load and gets a 200 for openai-community/gpt2.
    It then fails with "Response identity mismatch". The check at `ts/test/live-entity.ts:149` compares the
    response's `id` with the step's input `id`, and for a composite id the request was built from the parts.
- **Expected.** When `id` is given and the parts are not, split it on `sep` into the parts.

### 5. The same live test behaves differently by language

Model direct-load, with `HUGGINGFACE_HUB_TEST_MODEL_ENTID={"namespace01":"openai-community","repo01":"gpt2"}`:

- **TypeScript and Go** use both values and pass.
- **Python** behaves differently. Its generated test (`py/test/test_model_direct.py`, lines 87-88) takes `namespace`
  from the first listed record's `id`, which is the whole `owner/name`, and only `repo` from the variable. It then
  requests `/api/models/google-bert%2Fbert-base-uncased/gpt2` and gets 401. Dataset and Space fail the same way.

Blocked entity flows also differ: TypeScript fails them, while Python and Go pass the same flow.

### 6. The entity heuristics need help with arrays and non-REST routes

I had to correct five things in `guide.aontu`:

- `GET /api/collections` returns an array but was mapped to `load`.
- `/api/papers/search` returns an array but became a `load` action.
- `/api/users/{username}/overview` returns one object but became a `list` action.
- `/api/trending` and `/api/daily_papers` became second `list` routes on Model and Paper.

The warnings for the last one were precise ("only GET /api/models is ever chosen … guide.aontu tells them apart"),
and the guide made each fix a few lines. Choosing `list` or `load` from the response schema (array or object) would
remove the first three.

### 7. The generated README

- **Title.** The H1 is "HuggingfaceHub SDK", although `main.kit.text.title` is 'Hugging Face Hub'. The title is used
  in the body but not in the heading.
- **First example.** The first example and the tutorial use `client.Auth().load()`. Auth comes first alphabetically,
  and it is the one entity here that needs a credential, so a new user's first copy-paste returns 401. A `list` on an
  entity that needs no credential would make a better first call.
- **Step numbering.** In the TypeScript and Python tutorials, "1. Create a client" is followed by "3. Load an auth":
  step 2 disappears when the chosen entity has no `list`.
- **Catalogue example.** The hook0-sdk README in the catalogue shows "**Features:** `undefined`, `undefined`, …"
  eight times.

### 8. The scaffold's own .gitignore triggers a warning on every run

`.sdk/.gitignore` ignores `log/`. Then `target add` and every `generate` warn that `log/copies.jsonl` and
`log/generated.jsonl` must be committed ("Delete the log/ line"). I deleted the line. The scaffold should not
write it.

### What worked well

- The offline suites passed first time in all three languages.
- The generated `AGENTS.md` files explain the project well enough for a coding agent to work from them, including
  the two silent failure modes.
- The guide is a clean place to correct the heuristics.
- Most warnings say exactly what to change and where.

## Not done

- **Write operations.** None are covered (likes, repo creation, discussions), so Auth is the only entity that uses a
  token.
- **Collection discovery.** The collection live discovery needs an id mapping, since collections have no `id`.
- **Other targets.** The go-cli and go-mcp targets would be a natural next step for this API.
