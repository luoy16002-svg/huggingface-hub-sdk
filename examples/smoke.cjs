// Live smoke test of the generated TypeScript SDK against https://huggingface.co.
// Public read endpoints only, so no API key is needed. Run: node examples/smoke.cjs
const { HuggingfaceHubSDK } = require('../ts/dist/HuggingfaceHubSDK.js')

const client = new HuggingfaceHubSDK({ apikey: process.env.HUGGINGFACE_HUB_APIKEY })

const checks = []
async function check(name, fn) {
  try {
    const detail = await fn()
    checks.push([name, 'ok', detail])
  } catch (err) {
    checks.push([name, err?.known ? 'KNOWN' : 'FAIL', String(err?.message ?? err).split('\n')[0]])
  }
}

function must(cond, msg) {
  if (!cond) throw new Error(msg)
}

async function main() {
  await check('Model.list search=bert limit=3', async () => {
    const list = await client.Model().list({ search: 'bert', limit: 3 })
    must(Array.isArray(list) && list.length === 3, `expected 3 models, got ${list?.length}`)
    const ids = list.map((m) => m.data().id)
    must(ids.every((id) => /bert/i.test(id)), `unexpected ids ${ids}`)
    return ids.join(', ')
  })

  await check('Model.load namespace+repo', async () => {
    const m = await client.Model().load({ namespace: 'openai-community', repo: 'gpt2' })
    const d = m.data()
    must(d.id === 'openai-community/gpt2', `got id ${d.id}`)
    return `${d.id} pipeline=${d.pipeline_tag} downloads=${d.downloads}`
  })

  // KNOWN GAP (see REPORT.md): the guide declares the composite id, but the runtime does not split
  // id into namespace and repo, so this call is refused. Reported as KNOWN until the generator handles it.
  await check('Model.load id="namespace/repo"', async () => {
    try {
      const d = (await client.Model().load({ id: 'openai-community/gpt2' })).data()
      return `now works: ${d.id}`
    } catch (err) {
      const e = new Error(String(err?.message ?? err))
      e.known = true
      throw e
    }
  })

  await check('Dataset.list author=openai', async () => {
    const list = await client.Dataset().list({ author: 'openai', limit: 2 })
    must(list.length > 0 && list.every((x) => x.data().id.startsWith('openai/')), 'wrong author')
    return list.map((x) => x.data().id).join(', ')
  })

  await check('Dataset.load openai/gsm8k', async () => {
    const d = (await client.Dataset().load({ namespace: 'openai', repo: 'gsm8k' })).data()
    must(d.id === 'openai/gsm8k', `got id ${d.id}`)
    return `${d.id} downloads=${d.downloads}`
  })

  await check('Space.load openai/whisper', async () => {
    const d = (await client.Space().load({ namespace: 'openai', repo: 'whisper' })).data()
    must(d.id === 'openai/whisper', `got id ${d.id}`)
    return `${d.id} sdk=${d.sdk}`
  })

  await check('Paper.load 1706.03762', async () => {
    const d = (await client.Paper().load({ id: '1706.03762' })).data()
    must(/attention/i.test(d.title), `got title ${d.title}`)
    return d.title
  })

  await check('Paper.list $action=search q=diffusion', async () => {
    const list = await client.Paper().list({ $action: 'search', q: 'diffusion', limit: 2 })
    must(list.length > 0, 'no results')
    return list.map((x) => x.data().paper?.id ?? x.data().title).join(', ')
  })

  await check('DailyPaper.list limit=2', async () => {
    const list = await client.DailyPaper().list({ limit: 2 })
    must(list.length > 0, 'no daily papers')
    return list.map((x) => x.data().title).join(' | ').slice(0, 90)
  })

  await check('Trending.list', async () => {
    const list = await client.Trending().list({ limit: 3 })
    must(list.length > 0, 'no trending repos')
    return list.map((x) => `${x.data().repoType}:${x.data().repoData?.id}`).join(', ')
  })

  await check('Collection.list limit=1', async () => {
    const list = await client.Collection().list({ limit: 1 })
    must(list.length === 1, `got ${list.length}`)
    return list[0].data().slug
  })

  await check('Profile.load julien-c', async () => {
    const d = (await client.Profile().load({ username: 'julien-c' })).data()
    must(d.user === 'julien-c', `got ${d.user}`)
    return `${d.fullname} models=${d.numModels}`
  })

  await check('Auth.load without a token is rejected', async () => {
    if (process.env.HUGGINGFACE_HUB_APIKEY) return 'skipped: a token is set'
    try {
      await client.Auth().load()
    } catch (err) {
      return 'rejected: ' + String(err?.message ?? err).split('\n')[0].slice(0, 80)
    }
    throw new Error('expected a 401 without a token')
  })

  await check('Model.load of a missing repo is rejected', async () => {
    try {
      await client.Model().load({ namespace: 'no-such-user-kai', repo: 'no-such-model' })
    } catch (err) {
      return 'rejected: ' + String(err?.message ?? err).split('\n')[0].slice(0, 80)
    }
    throw new Error('expected an error for a missing repo')
  })

  for (const [name, state, detail] of checks) {
    console.log(`${state.padEnd(5)}  ${name}  ->  ${detail}`)
  }
  const passed = checks.filter((c) => c[1] === 'ok').length
  const known = checks.filter((c) => c[1] === 'KNOWN').length
  const failed = checks.length - passed - known
  console.log(`\n${passed}/${checks.length} checks passed, ${known} known gap, ${failed} failed`)
  process.exit(failed ? 1 : 0)
}

main()
