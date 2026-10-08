
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { HuggingfaceHubSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = HuggingfaceHubSDK.test()
    equal(testsdk instanceof HuggingfaceHubSDK, true,
      'HuggingfaceHubSDK.test() must return a client synchronously')
  })

})
