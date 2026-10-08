// Run a generated target's suite against the live Hugging Face Hub, with known public records for the load tests.
// No API key is needed except for Auth. From the repo root:
//   node examples/run-live.cjs ts npm test
//   node examples/run-live.cjs py python -m pytest -q test
//   node examples/run-live.cjs go go test ./test/ -count=1
//   node examples/run-live.cjs --offline go go test ./test/ -count=1
const { spawnSync } = require('node:child_process')
const path = require('node:path')

// The suites read these from HUGGINGFACE_HUB_TEST_<ENTITY>_ENTID.
const entid = {
  MODEL: { namespace01: 'openai-community', repo01: 'gpt2' },
  DATASET: { namespace01: 'openai', repo01: 'gsm8k' },
  SPACE: { namespace01: 'openai', repo01: 'whisper' },
  COLLECTION: { namespace01: 'vllm-sr', slug01: 'decision-20-6ab7cf7bdfb506bf8269cb00' },
  PROFILE: { username01: 'julien-c' },
}

const args = process.argv.slice(2)
const offline = '--offline' === args[0]
if (offline) args.shift()

const env = { ...process.env, HUGGINGFACE_HUB_TEST_LIVE: offline ? 'FALSE' : 'TRUE' }
for (const [ent, ids] of Object.entries(entid)) {
  if (!offline) env[`HUGGINGFACE_HUB_TEST_${ent}_ENTID`] = JSON.stringify(ids)
}

const [dir, ...cmd] = args
const r = spawnSync(cmd.join(' '), {
  cwd: path.resolve(__dirname, '..', dir),
  env,
  stdio: 'inherit',
  shell: true,
})
process.exit(r.status ?? 1)
