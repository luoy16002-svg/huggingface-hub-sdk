# HuggingfaceHub SDK utility: make_context

from huggingfacehub_sdk.core.context import HuggingfaceHubContext


def make_context_util(ctxmap, basectx):
    return HuggingfaceHubContext(ctxmap, basectx)
