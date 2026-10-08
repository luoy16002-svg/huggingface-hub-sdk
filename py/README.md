# HuggingfaceHub Python SDK

Search and read models, datasets, Spaces, papers and collections on the Hugging Face Hub.

The Python SDK for the HuggingfaceHub API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Auth()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Tags](https://github.com/luoy16002-svg/huggingface-hub-sdk/tags)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from huggingfacehub_sdk import HuggingfaceHubSDK

client = HuggingfaceHubSDK({
    "apikey": os.environ.get("HUGGINGFACE_HUB_APIKEY"),
})
```

### 3. Load an auth

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    auth = client.Auth().load()
    print(auth)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    datasets = client.Dataset().list()
    print(datasets)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = HuggingfaceHubSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
dataset = client.Dataset().list()
# dataset contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = HuggingfaceHubSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
HUGGINGFACE_HUB_TEST_LIVE=TRUE
HUGGINGFACE_HUB_APIKEY=<your-key>
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### HuggingfaceHubSDK

```python
from huggingfacehub_sdk import HuggingfaceHubSDK

client = HuggingfaceHubSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = HuggingfaceHubSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### HuggingfaceHubSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Auth` | `(data) -> AuthEntity` | Create an Auth entity instance. |
| `Collection` | `(data) -> CollectionEntity` | Create a Collection entity instance. |
| `DailyPaper` | `(data) -> DailyPaperEntity` | Create a DailyPaper entity instance. |
| `Dataset` | `(data) -> DatasetEntity` | Create a Dataset entity instance. |
| `Model` | `(data) -> ModelEntity` | Create a Model entity instance. |
| `Paper` | `(data) -> PaperEntity` | Create a Paper entity instance. |
| `Profile` | `(data) -> ProfileEntity` | Create a Profile entity instance. |
| `Space` | `(data) -> SpaceEntity` | Create a Space entity instance. |
| `Trending` | `(data) -> TrendingEntity` | Create a Trending entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### Auth

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/whoami-v2`

#### Collection

| Field | Description |
| --- | --- |
| `description` |  |
| `gating` |  |
| `id` |  |
| `isUpvotedByUser` |  |
| `items` |  |
| `lastUpdated` |  |
| `owner` |  |
| `position` |  |
| `private` |  |
| `resourceGroup` |  |
| `shareUrl` |  |
| `slug` |  |
| `theme` |  |
| `title` |  |
| `upvotes` |  |

Operations: List, Load.

API path: `/api/collections`

#### DailyPaper

| Field | Description |
| --- | --- |
| `isAuthorParticipating` |  |
| `mediaUrls` |  |
| `numComments` |  |
| `paper` | Paper data with metadata |
| `publishedAt` |  |
| `submittedBy` | User overview information |
| `summary` |  |
| `thumbnail` |  |
| `title` |  |

Operations: List.

API path: `/api/daily_papers`

#### Dataset

| Field | Description |
| --- | --- |
| `author` |  |
| `cardData` |  |
| `createdAt` |  |
| `description` |  |
| `disabled` |  |
| `downloads` |  |
| `gated` | false, or 'auto' / 'manual' when access needs approval. |
| `id` | Repo id, namespace/name. |
| `lastModified` |  |
| `likes` |  |
| `paperswithcode_id` |  |
| `private` |  |
| `sha` |  |
| `siblings` |  |
| `tags` |  |
| `trendingScore` |  |
| `usedStorage` |  |

Operations: List, Load.

API path: `/api/datasets`

#### Model

| Field | Description |
| --- | --- |
| `author` |  |
| `cardData` |  |
| `config` |  |
| `createdAt` |  |
| `disabled` |  |
| `downloads` |  |
| `gated` | false, or 'auto' / 'manual' when access needs approval. |
| `id` | Repo id, namespace/name. |
| `lastModified` |  |
| `library_name` |  |
| `likes` |  |
| `modelId` |  |
| `pipeline_tag` |  |
| `private` |  |
| `safetensors` |  |
| `sha` |  |
| `siblings` |  |
| `spaces` |  |
| `tags` |  |
| `trendingScore` |  |
| `usedStorage` |  |

Operations: List, Load.

API path: `/api/models`

#### Paper

| Field | Description |
| --- | --- |
| `ai_keywords` |  |
| `ai_summary` |  |
| `ai_summary_model` |  |
| `authors` |  |
| `comments` | only available when field contains 'comments' |
| `discussionId` |  |
| `githubRepo` |  |
| `githubStars` |  |
| `id` |  |
| `linkedDatasets` |  |
| `linkedModels` |  |
| `linkedSpaces` |  |
| `mediaUrls` |  |
| `numTotalDatasets` |  |
| `numTotalModels` |  |
| `numTotalSpaces` |  |
| `organization` |  |
| `projectPage` |  |
| `publishedAt` |  |
| `submissionDeadline` | only available when field contains 'submissionDeadline' |
| `submittedOnDailyAt` |  |
| `submittedOnDailyBy` | User overview information |
| `summary` |  |
| `thumbnailUrl` |  |
| `title` |  |
| `upvotes` |  |
| `withdrawnAt` |  |

Operations: List, Load.

API path: `/api/papers`

#### Profile

| Field | Description |
| --- | --- |
| `avatarUrl` |  |
| `createdAt` |  |
| `details` |  |
| `fullname` |  |
| `hardwareItems` | The user's hardware items, unless the user set them as private |
| `id` | A hex string of 24 characters representing an ObjectId. |
| `isFollowing` |  |
| `isPro` |  |
| `numBuckets` |  |
| `numDatasets` |  |
| `numDiscussions` |  |
| `numFollowers` |  |
| `numFollowing` |  |
| `numFollowingOrgs` |  |
| `numKernels` |  |
| `numLikes` |  |
| `numModels` |  |
| `numPapers` |  |
| `numSpaces` |  |
| `numUpvotes` |  |
| `orgs` |  |
| `primaryOrgAvatarUrl` |  |
| `reasonToFollow` |  |
| `serviceAccount` | Set when the user is a service account |
| `type` |  |
| `user` |  |

Operations: Load.

API path: `/api/users/{username}/overview`

#### Space

| Field | Description |
| --- | --- |
| `author` |  |
| `cardData` |  |
| `createdAt` |  |
| `disabled` |  |
| `gated` | false, or 'auto' / 'manual' when access needs approval. |
| `host` |  |
| `id` | Repo id, namespace/name. |
| `lastModified` |  |
| `likes` |  |
| `models` |  |
| `private` |  |
| `runtime` |  |
| `sdk` | gradio, streamlit, docker or static. |
| `sha` |  |
| `siblings` |  |
| `subdomain` |  |
| `tags` |  |
| `trendingScore` |  |
| `usedStorage` |  |

Operations: List, Load.

API path: `/api/spaces`

#### Trending

| Field | Description |
| --- | --- |
| `recentlyTrending` |  |

Operations: List.

API path: `/api/trending`



## Entities


### Auth

Create an instance: `auth = client.Auth()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
auth = client.Auth().load()
```


### Collection

Create an instance: `collection = client.Collection()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` |  |
| `gating` | `Any` |  |
| `id` | `str` |  |
| `isUpvotedByUser` | `bool` |  |
| `items` | `list` |  |
| `lastUpdated` | `str` |  |
| `owner` | `Any` |  |
| `position` | `float` |  |
| `private` | `bool` |  |
| `resourceGroup` | `dict` |  |
| `shareUrl` | `str` |  |
| `slug` | `str` |  |
| `theme` | `str` |  |
| `title` | `str` |  |
| `upvotes` | `float` |  |

#### Example: Load

```python
collection = client.Collection().load({"namespace": "namespace", "slug": "slug"})
```

#### Example: List

```python
collections = client.Collection().list()
```


### DailyPaper

Create an instance: `daily_paper = client.DailyPaper()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `isAuthorParticipating` | `bool` |  |
| `mediaUrls` | `list` |  |
| `numComments` | `float` |  |
| `paper` | `dict` | Paper data with metadata |
| `publishedAt` | `str` |  |
| `submittedBy` | `dict` | User overview information |
| `summary` | `str` |  |
| `thumbnail` | `str` |  |
| `title` | `str` |  |

#### Example: List

```python
daily_papers = client.DailyPaper().list()
```


### Dataset

Create an instance: `dataset = client.Dataset()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `str` |  |
| `cardData` | `dict` |  |
| `createdAt` | `str` |  |
| `description` | `str` |  |
| `disabled` | `bool` |  |
| `downloads` | `int` |  |
| `gated` | `Any` | false, or 'auto' / 'manual' when access needs approval. |
| `id` | `str` | Repo id, namespace/name. |
| `lastModified` | `str` |  |
| `likes` | `int` |  |
| `paperswithcode_id` | `str | None` |  |
| `private` | `bool` |  |
| `sha` | `str` |  |
| `siblings` | `list` |  |
| `tags` | `list` |  |
| `trendingScore` | `float` |  |
| `usedStorage` | `int` |  |

#### Example: Load

```python
dataset = client.Dataset().load({"namespace": "namespace", "repo": "repo"})
```

#### Example: List

```python
datasets = client.Dataset().list()
```


### Model

Create an instance: `model = client.Model()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `str` |  |
| `cardData` | `dict` |  |
| `config` | `dict` |  |
| `createdAt` | `str` |  |
| `disabled` | `bool` |  |
| `downloads` | `int` |  |
| `gated` | `Any` | false, or 'auto' / 'manual' when access needs approval. |
| `id` | `str` | Repo id, namespace/name. |
| `lastModified` | `str` |  |
| `library_name` | `str` |  |
| `likes` | `int` |  |
| `modelId` | `str` |  |
| `pipeline_tag` | `str` |  |
| `private` | `bool` |  |
| `safetensors` | `dict` |  |
| `sha` | `str` |  |
| `siblings` | `list` |  |
| `spaces` | `list` |  |
| `tags` | `list` |  |
| `trendingScore` | `float` |  |
| `usedStorage` | `int` |  |

#### Example: Load

```python
model = client.Model().load({"namespace": "namespace", "repo": "repo"})
```

#### Example: List

```python
models = client.Model().list()
```


### Paper

Create an instance: `paper = client.Paper()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ai_keywords` | `list` |  |
| `ai_summary` | `str` |  |
| `ai_summary_model` | `str` |  |
| `authors` | `list` |  |
| `comments` | `list` | only available when field contains 'comments' |
| `discussionId` | `str` |  |
| `githubRepo` | `str` |  |
| `githubStars` | `float` |  |
| `id` | `str` |  |
| `linkedDatasets` | `list` |  |
| `linkedModels` | `list` |  |
| `linkedSpaces` | `list` |  |
| `mediaUrls` | `list` |  |
| `numTotalDatasets` | `float` |  |
| `numTotalModels` | `float` |  |
| `numTotalSpaces` | `float` |  |
| `organization` | `dict` |  |
| `projectPage` | `str` |  |
| `publishedAt` | `str` |  |
| `submissionDeadline` | `str` | only available when field contains 'submissionDeadline' |
| `submittedOnDailyAt` | `str` |  |
| `submittedOnDailyBy` | `dict` | User overview information |
| `summary` | `str` |  |
| `thumbnailUrl` | `str` |  |
| `title` | `str` |  |
| `upvotes` | `float` |  |
| `withdrawnAt` | `str` |  |

#### Example: Load

```python
paper = client.Paper().load({"id": "paper_id"})
```

#### Example: List

```python
papers = client.Paper().list()
```


### Profile

Create an instance: `profile = client.Profile()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatarUrl` | `str` |  |
| `createdAt` | `str` |  |
| `details` | `str` |  |
| `fullname` | `str` |  |
| `hardwareItems` | `list` | The user's hardware items, unless the user set them as private |
| `id` | `str` | A hex string of 24 characters representing an ObjectId. |
| `isFollowing` | `bool` |  |
| `isPro` | `bool` |  |
| `numBuckets` | `float` |  |
| `numDatasets` | `float` |  |
| `numDiscussions` | `float` |  |
| `numFollowers` | `float` |  |
| `numFollowing` | `float` |  |
| `numFollowingOrgs` | `float` |  |
| `numKernels` | `float` |  |
| `numLikes` | `float` |  |
| `numModels` | `float` |  |
| `numPapers` | `float` |  |
| `numSpaces` | `float` |  |
| `numUpvotes` | `float` |  |
| `orgs` | `list` |  |
| `primaryOrgAvatarUrl` | `str` |  |
| `reasonToFollow` | `str` |  |
| `serviceAccount` | `dict` | Set when the user is a service account |
| `type` | `str` |  |
| `user` | `str` |  |

#### Example: Load

```python
profile = client.Profile().load({"username": "username"})
```


### Space

Create an instance: `space = client.Space()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `str` |  |
| `cardData` | `dict` |  |
| `createdAt` | `str` |  |
| `disabled` | `bool` |  |
| `gated` | `Any` | false, or 'auto' / 'manual' when access needs approval. |
| `host` | `str` |  |
| `id` | `str` | Repo id, namespace/name. |
| `lastModified` | `str` |  |
| `likes` | `int` |  |
| `models` | `list` |  |
| `private` | `bool` |  |
| `runtime` | `dict` |  |
| `sdk` | `str` | gradio, streamlit, docker or static. |
| `sha` | `str` |  |
| `siblings` | `list` |  |
| `subdomain` | `str` |  |
| `tags` | `list` |  |
| `trendingScore` | `float` |  |
| `usedStorage` | `int` |  |

#### Example: Load

```python
space = client.Space().load({"namespace": "namespace", "repo": "repo"})
```

#### Example: List

```python
spaces = client.Space().list()
```


### Trending

Create an instance: `trending = client.Trending()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `recentlyTrending` | `list` |  |

#### Example: List

```python
trendings = client.Trending().list()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | Test transport |

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Open types

3 fields are carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes them with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `collection` | `items` | 6 | 9 levels |
| `collection` | `gating` | 3 | 2 levels |
| `trending` | `recentlyTrending` | 3 | 11 levels |

These values round-trip unchanged — read them, modify them, send them back. If
the API adds a `discriminator` to the definition, regenerating will type them.
Every other field is typed normally.

## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── huggingfacehub_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`huggingfacehub_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
dataset = client.Dataset()
dataset.list()

# dataset.data_get() now returns the dataset data from the last list
# dataset.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
