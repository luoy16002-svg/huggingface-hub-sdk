

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { HuggingfaceHubSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('CollectionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HUGGINGFACE_HUB_TEST_LIVE=TRUE.
  afterEach(liveDelay('HUGGINGFACE_HUB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HuggingfaceHubSDK.test()
    const ent = testsdk.Collection()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('collection hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of HuggingfaceHubSDK.test(offline).Collection().stream('list')) { }
    }, /offline/)

    for await (const _item of HuggingfaceHubSDK.test(offline).Collection()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = HuggingfaceHubSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Collection().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of HuggingfaceHubSDK.test().Collection().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new HuggingfaceHubSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Collection().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Collection().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HuggingfaceHubSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Collection().list({"cursor":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HUGGINGFACE_HUB_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'collection.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":0},"gating":{"a":true,"h":"Gating","n":"gating","r":true,"t":"`$ANY`","union":{"branches":3,"count":2,"depth":2},"key$":"gating","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"isUpvotedByUser":{"a":true,"h":"Is Upvoted By User","n":"isUpvotedByUser","r":true,"t":"`$BOOLEAN`","key$":"isUpvotedByUser","index$":3},"items":{"a":true,"h":"Items","n":"items","r":true,"t":"`$ARRAY`","union":{"branches":6,"count":8,"depth":9},"key$":"items","index$":4},"lastUpdated":{"a":true,"fo":"date-time","h":"Last Updated","n":"lastUpdated","r":true,"t":"`$STRING`","key$":"lastUpdated","index$":5},"owner":{"a":true,"h":"Owner","n":"owner","r":true,"t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"owner","index$":6},"position":{"a":true,"h":"Position","n":"position","r":true,"t":"`$NUMBER`","key$":"position","index$":7},"private":{"a":true,"h":"Private","n":"private","r":true,"t":"`$BOOLEAN`","key$":"private","index$":8},"resourceGroup":{"a":true,"h":"Resource Group","n":"resourceGroup","r":true,"t":"`$OBJECT`","key$":"resourceGroup","index$":9},"shareUrl":{"a":true,"h":"Share Url","n":"shareUrl","r":true,"t":"`$STRING`","key$":"shareUrl","index$":10},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":11},"theme":{"a":true,"h":"Theme","n":"theme","r":true,"t":"`$STRING`","key$":"theme","index$":12},"title":{"a":true,"h":"Title","n":"title","r":true,"t":"`$STRING`","key$":"title","index$":13},"upvotes":{"a":true,"h":"Upvotes","n":"upvotes","r":true,"t":"`$NUMBER`","key$":"upvotes","index$":14}},"id":{"field":"id","from":{"slug":"slug"},"name":"id","parts":["namespace","slug"],"sep":"/"},"name":"collection","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/collections","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"expand","or":"expand","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"item","or":"item","r":false,"t":"`$ANY`","index$":2},{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$NUMBER`","index$":3},{"a":true,"k":"query","n":"owner","or":"owner","r":false,"t":"`$ANY`","index$":4},{"a":true,"k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":5},{"a":true,"ex":"trending","k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/api/collections","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"collections"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/collections/{namespace}/{slug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"namespace","or":"namespace","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/collections/{namespace}/{slug}","q":{"exist":["namespace","slug"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"collections"},{"var":"namespace"},{"var":"slug"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"collection","name__orig":"collection","Name":"Collection","name_":"collection","name-":"collection","NAME":"COLLECTION","index$":1}, {"active":true,"entity":"collection","key$":"BasicCollectionFlow","kind":"basic","name":"BasicCollectionFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"collection_ref01"}}],"index$":0},{"a":false,"d":{},"i":{"ref":"collection_ref01","srcdatavar":"collection_ref01_data","suffix":"_dt0"},"m":{"id":"collection01","namespace":"namespace01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-collection_ref01"}}],"unreachable":true}]}, 'Collection', {"GET /api/collections":{"protocol":"http","parameters":[{"name":"item","in":"query","schema":{"anyOf":[{"type":"array","items":{"type":"string","pattern":"^spaces|models|datasets|papers\\/.*"}},{"type":"string","pattern":"^spaces|models|datasets|papers\\/.*"}]},"required":false,"index$":0},{"name":"owner","in":"query","schema":{"anyOf":[{"type":"array","items":{"type":"string"}},{"type":"string"},{"type":"object","propertyNames":{"type":"string"},"additionalProperties":{"type":"string"}}]},"required":false,"index$":1},{"name":"q","in":"query","schema":{"type":"string"},"required":false,"index$":2},{"name":"sort","in":"query","schema":{"default":"trending","type":"string","enum":["upvotes","lastModified","trending"]},"required":false,"index$":3},{"name":"cursor","in":"query","schema":{"type":"string"},"required":false,"index$":4},{"name":"expand","in":"query","schema":{"type":"string"},"required":false,"index$":5},{"name":"limit","in":"query","schema":{"default":10,"type":"number","minimum":1,"maximum":10000},"required":false,"index$":6}]},"GET /api/collections/{namespace}/{slug}":{"protocol":"http","parameters":[{"name":"namespace","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"slug","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let collection_ref01_data = Object.values(setup.data.existing.collection)[0] as any

    // LIST
    const collection_ref01_ent = client.Collection()
    const collection_ref01_match: any = {}

    const collection_ref01_list = (await collection_ref01_ent.list(collection_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/collection/CollectionTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = HuggingfaceHubSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['collection01','collection02','collection03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HUGGINGFACE_HUB_TEST_COLLECTION_ENTID': idmap,
    'HUGGINGFACE_HUB_TEST_LIVE': 'FALSE',
    'HUGGINGFACE_HUB_TEST_EXPLAIN': 'FALSE',
    'HUGGINGFACE_HUB_APIKEY': '',
  })

  idmap = env['HUGGINGFACE_HUB_TEST_COLLECTION_ENTID']

  const live = 'TRUE' === env.HUGGINGFACE_HUB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HUGGINGFACE_HUB_TEST_COLLECTION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new HuggingfaceHubSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.HUGGINGFACE_HUB_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.HUGGINGFACE_HUB_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
