

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


describe('ProfileEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HUGGINGFACE_HUB_TEST_LIVE=TRUE.
  afterEach(liveDelay('HUGGINGFACE_HUB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HuggingfaceHubSDK.test()
    const ent = testsdk.Profile()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HuggingfaceHubSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Profile().load({"username":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HUGGINGFACE_HUB_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'profile.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"avatarUrl":{"a":true,"h":"Avatar Url","n":"avatarUrl","r":true,"t":"`$STRING`","key$":"avatarUrl","index$":0},"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":true,"t":"`$STRING`","key$":"createdAt","index$":1},"details":{"a":true,"h":"Details","n":"details","r":false,"t":"`$STRING`","key$":"details","index$":2},"fullname":{"a":true,"h":"Fullname","n":"fullname","r":true,"t":"`$STRING`","key$":"fullname","index$":3},"hardwareItems":{"a":true,"h":"Hardware Items","n":"hardwareItems","r":false,"sh":"The user's hardware items, unless the user set them as private","t":"`$ARRAY`","key$":"hardwareItems","index$":4},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"A hex string of 24 characters representing an ObjectId.","t":"`$STRING`","key$":"id","index$":5},"isFollowing":{"a":true,"h":"Is Following","n":"isFollowing","r":false,"t":"`$BOOLEAN`","key$":"isFollowing","index$":6},"isPro":{"a":true,"h":"Is Pro","n":"isPro","r":true,"t":"`$BOOLEAN`","key$":"isPro","index$":7},"numBuckets":{"a":true,"h":"Num Buckets","n":"numBuckets","r":false,"t":"`$NUMBER`","key$":"numBuckets","index$":8},"numDatasets":{"a":true,"h":"Num Datasets","n":"numDatasets","r":false,"t":"`$NUMBER`","key$":"numDatasets","index$":9},"numDiscussions":{"a":true,"h":"Num Discussions","n":"numDiscussions","r":false,"t":"`$NUMBER`","key$":"numDiscussions","index$":10},"numFollowers":{"a":true,"h":"Num Followers","n":"numFollowers","r":false,"t":"`$NUMBER`","key$":"numFollowers","index$":11},"numFollowing":{"a":true,"h":"Num Following","n":"numFollowing","r":false,"t":"`$NUMBER`","key$":"numFollowing","index$":12},"numFollowingOrgs":{"a":true,"h":"Num Following Orgs","n":"numFollowingOrgs","r":false,"t":"`$NUMBER`","key$":"numFollowingOrgs","index$":13},"numKernels":{"a":true,"h":"Num Kernels","n":"numKernels","r":false,"t":"`$NUMBER`","key$":"numKernels","index$":14},"numLikes":{"a":true,"h":"Num Likes","n":"numLikes","r":false,"t":"`$NUMBER`","key$":"numLikes","index$":15},"numModels":{"a":true,"h":"Num Models","n":"numModels","r":false,"t":"`$NUMBER`","key$":"numModels","index$":16},"numPapers":{"a":true,"h":"Num Papers","n":"numPapers","r":false,"t":"`$NUMBER`","key$":"numPapers","index$":17},"numSpaces":{"a":true,"h":"Num Spaces","n":"numSpaces","r":false,"t":"`$NUMBER`","key$":"numSpaces","index$":18},"numUpvotes":{"a":true,"h":"Num Upvotes","n":"numUpvotes","r":false,"t":"`$NUMBER`","key$":"numUpvotes","index$":19},"orgs":{"a":true,"h":"Orgs","n":"orgs","r":false,"t":"`$ARRAY`","key$":"orgs","index$":20},"primaryOrgAvatarUrl":{"a":true,"h":"Primary Org Avatar Url","n":"primaryOrgAvatarUrl","r":false,"t":"`$STRING`","key$":"primaryOrgAvatarUrl","index$":21},"reasonToFollow":{"a":true,"h":"Reason To Follow","n":"reasonToFollow","r":false,"t":"`$STRING`","key$":"reasonToFollow","index$":22},"serviceAccount":{"a":true,"h":"Service Account","n":"serviceAccount","r":true,"sh":"Set when the user is a service account","t":"`$OBJECT`","key$":"serviceAccount","index$":23},"type":{"a":true,"h":"Type","n":"type","r":true,"t":"`$STRING`","key$":"type","index$":24},"user":{"a":true,"h":"User","n":"user","r":true,"t":"`$STRING`","key$":"user","index$":25}},"id":{"field":"id","name":"id"},"name":"profile","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/users/{username}/overview","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"username","or":"username","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/users/{username}/overview","q":{"exist":["username"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"users"},{"var":"username"},{"lit":"overview"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"profile","name__orig":"profile","Name":"Profile","name_":"profile","name-":"profile","NAME":"PROFILE","index$":6}, {"active":true,"entity":"profile","key$":"BasicProfileFlow","kind":"basic","name":"BasicProfileFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"profile_ref01","srcdatavar":"profile_ref01_data","suffix":"_dt0"},"m":{"id":"profile01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-profile_ref01"}}],"unreachable":true}]}, 'Profile', {"GET /api/users/{username}/overview":{"protocol":"http","parameters":[{"name":"username","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let profile_ref01_data = Object.values(setup.data.existing.profile)[0] as any

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
      '../../../../.sdk/test/entity/profile/ProfileTestData.json')

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
    ['profile01','profile02','profile03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HUGGINGFACE_HUB_TEST_PROFILE_ENTID': idmap,
    'HUGGINGFACE_HUB_TEST_LIVE': 'FALSE',
    'HUGGINGFACE_HUB_TEST_EXPLAIN': 'FALSE',
    'HUGGINGFACE_HUB_APIKEY': '',
  })

  idmap = env['HUGGINGFACE_HUB_TEST_PROFILE_ENTID']

  const live = 'TRUE' === env.HUGGINGFACE_HUB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HUGGINGFACE_HUB_TEST_PROFILE_ENTID']
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
  
