# HuggingfaceHub SDK exists test

import pytest
from huggingfacehub_sdk import HuggingfaceHubSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = HuggingfaceHubSDK.test(None, None)
        assert testsdk is not None
