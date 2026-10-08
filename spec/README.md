# The spec slice

Hugging Face publishes an OpenAPI 3.1 file for the Hub at
<https://huggingface.co/.well-known/openapi.json>. On 2026-10-08 it was 1.1 MB with 298 paths, covering
everything from SCIM provisioning to Inference Endpoints. This SDK is generated from a small read-only slice of it.

`build_slice.py` downloads the file, keeps the 9 operations listed in `KEEP`, adds the 6 from
`supplement.json`, copies the components they reference, and writes `hf-hub-openapi.slice.json` (also copied
to `.sdk/def/`, which is what `npm run generate` reads).

```bash
python spec/build_slice.py
cd .sdk && npm run generate
```

## What is in it

| Entity | Operations | Source |
| --- | --- | --- |
| Model, Dataset, Space | `list` (search, author, filter, sort, limit), `load` by namespace + repo | `supplement.json` |
| Paper | `load` by arXiv id, `list`, `list` with `$action: 'search'` | published spec |
| DailyPaper | `list` | published spec |
| Trending | `list` | published spec |
| Collection | `list`, `load` by namespace + slug | published spec |
| Profile | `load` by username | published spec |
| Auth | `load` (whoami, needs a token) | published spec |

## Why a supplement

The published file has no path for listing or reading models, datasets or Spaces: `GET /api/models`,
`GET /api/models/{namespace}/{repo}` and the dataset and Space equivalents are missing, although they are the most
used Hub endpoints and are documented at <https://huggingface.co/docs/hub/api>. `make_supplement.py` writes them
into `supplement.json`, with response fields checked against live responses on 2026-10-08.

## Corrections in the guide

The generator's heuristics got a few routes wrong for this API. The corrections are in
`.sdk/model/guide/guide.aontu`, each with a comment: trending and daily papers became their own entities instead
of second `list` routes on Model and Paper, search became a `list` action, `GET /api/collections` became a `list`,
and the user overview became `Profile.load`.
