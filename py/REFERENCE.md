# HuggingfaceHub Python SDK Reference

Complete API reference for the HuggingfaceHub Python SDK.


## HuggingfaceHubSDK

### Constructor

```python
from huggingfacehub_sdk import HuggingfaceHubSDK

client = HuggingfaceHubSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `HuggingfaceHubSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = HuggingfaceHubSDK.test()
```


### Instance Methods

#### `Auth(data=None)`

Create a new `AuthEntity` instance. Pass `None` for no initial data.

#### `Collection(data=None)`

Create a new `CollectionEntity` instance. Pass `None` for no initial data.

#### `DailyPaper(data=None)`

Create a new `DailyPaperEntity` instance. Pass `None` for no initial data.

#### `Dataset(data=None)`

Create a new `DatasetEntity` instance. Pass `None` for no initial data.

#### `Model(data=None)`

Create a new `ModelEntity` instance. Pass `None` for no initial data.

#### `Paper(data=None)`

Create a new `PaperEntity` instance. Pass `None` for no initial data.

#### `Profile(data=None)`

Create a new `ProfileEntity` instance. Pass `None` for no initial data.

#### `Space(data=None)`

Create a new `SpaceEntity` instance. Pass `None` for no initial data.

#### `Trending(data=None)`

Create a new `TrendingEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AuthEntity

```python
auth = client.Auth()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Auth().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AuthEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CollectionEntity

```python
collection = client.Collection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | No |  |
| `gating` | `Any` | Yes |  |
| `id` | `str` | No |  |
| `isUpvotedByUser` | `bool` | Yes |  |
| `items` | `list` | Yes |  |
| `lastUpdated` | `str` | Yes |  |
| `owner` | `Any` | Yes |  |
| `position` | `float` | Yes |  |
| `private` | `bool` | Yes |  |
| `resourceGroup` | `dict` | Yes |  |
| `shareUrl` | `str` | Yes |  |
| `slug` | `str` | Yes |  |
| `theme` | `str` | Yes |  |
| `title` | `str` | Yes |  |
| `upvotes` | `float` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Collection().list()
for collection in results:
    print(collection)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Collection().load({"namespace": "namespace", "slug": "slug"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CollectionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DailyPaperEntity

```python
daily_paper = client.DailyPaper()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `isAuthorParticipating` | `bool` | Yes |  |
| `mediaUrls` | `list` | No |  |
| `numComments` | `float` | Yes |  |
| `paper` | `dict` | Yes | Paper data with metadata |
| `publishedAt` | `str` | Yes |  |
| `submittedBy` | `dict` | Yes | User overview information |
| `summary` | `str` | Yes |  |
| `thumbnail` | `str` | Yes |  |
| `title` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.DailyPaper().list()
for daily_paper in results:
    print(daily_paper)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DailyPaperEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DatasetEntity

```python
dataset = client.Dataset()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `str` | No |  |
| `cardData` | `dict` | No |  |
| `createdAt` | `str` | No |  |
| `description` | `str` | No |  |
| `disabled` | `bool` | No |  |
| `downloads` | `int` | No |  |
| `gated` | `Any` | No | false, or 'auto' / 'manual' when access needs approval. |
| `id` | `str` | No | Repo id, namespace/name. |
| `lastModified` | `str` | No |  |
| `likes` | `int` | No |  |
| `paperswithcode_id` | `str | None` | No |  |
| `private` | `bool` | No |  |
| `sha` | `str` | No |  |
| `siblings` | `list` | No |  |
| `tags` | `list` | No |  |
| `trendingScore` | `float` | No |  |
| `usedStorage` | `int` | No |  |

### Field Usage by Operation

| Field | load | list |
| --- | --- | --- |
| `author` | - | - |
| `cardData` | - | - |
| `createdAt` | - | - |
| `description` | - | - |
| `disabled` | - | - |
| `downloads` | - | - |
| `gated` | - | - |
| `id` | Yes | Yes |
| `lastModified` | - | - |
| `likes` | - | - |
| `paperswithcode_id` | - | - |
| `private` | - | - |
| `sha` | - | - |
| `siblings` | - | - |
| `tags` | - | - |
| `trendingScore` | - | - |
| `usedStorage` | - | - |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Dataset().list()
for dataset in results:
    print(dataset)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Dataset().load({"namespace": "namespace", "repo": "repo"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DatasetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ModelEntity

```python
model = client.Model()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `str` | No |  |
| `cardData` | `dict` | No |  |
| `config` | `dict` | No |  |
| `createdAt` | `str` | No |  |
| `disabled` | `bool` | No |  |
| `downloads` | `int` | No |  |
| `gated` | `Any` | No | false, or 'auto' / 'manual' when access needs approval. |
| `id` | `str` | No | Repo id, namespace/name. |
| `lastModified` | `str` | No |  |
| `library_name` | `str` | No |  |
| `likes` | `int` | No |  |
| `modelId` | `str` | No |  |
| `pipeline_tag` | `str` | No |  |
| `private` | `bool` | No |  |
| `safetensors` | `dict` | No |  |
| `sha` | `str` | No |  |
| `siblings` | `list` | No |  |
| `spaces` | `list` | No |  |
| `tags` | `list` | No |  |
| `trendingScore` | `float` | No |  |
| `usedStorage` | `int` | No |  |

### Field Usage by Operation

| Field | load | list |
| --- | --- | --- |
| `author` | - | - |
| `cardData` | - | - |
| `config` | - | - |
| `createdAt` | - | - |
| `disabled` | - | - |
| `downloads` | - | - |
| `gated` | - | - |
| `id` | Yes | Yes |
| `lastModified` | - | - |
| `library_name` | - | - |
| `likes` | - | - |
| `modelId` | - | - |
| `pipeline_tag` | - | - |
| `private` | - | - |
| `safetensors` | - | - |
| `sha` | - | - |
| `siblings` | - | - |
| `spaces` | - | - |
| `tags` | - | - |
| `trendingScore` | - | - |
| `usedStorage` | - | - |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Model().list()
for model in results:
    print(model)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Model().load({"namespace": "namespace", "repo": "repo"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ModelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PaperEntity

```python
paper = client.Paper()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ai_keywords` | `list` | No |  |
| `ai_summary` | `str` | No |  |
| `ai_summary_model` | `str` | No |  |
| `authors` | `list` | Yes |  |
| `comments` | `list` | No | only available when field contains 'comments' |
| `discussionId` | `str` | Yes |  |
| `githubRepo` | `str` | No |  |
| `githubStars` | `float` | No |  |
| `id` | `str` | Yes |  |
| `linkedDatasets` | `list` | Yes |  |
| `linkedModels` | `list` | Yes |  |
| `linkedSpaces` | `list` | Yes |  |
| `mediaUrls` | `list` | No |  |
| `numTotalDatasets` | `float` | Yes |  |
| `numTotalModels` | `float` | Yes |  |
| `numTotalSpaces` | `float` | Yes |  |
| `organization` | `dict` | Yes |  |
| `projectPage` | `str` | No |  |
| `publishedAt` | `str` | Yes |  |
| `submissionDeadline` | `str` | No | only available when field contains 'submissionDeadline' |
| `submittedOnDailyAt` | `str` | No |  |
| `submittedOnDailyBy` | `dict` | Yes | User overview information |
| `summary` | `str` | Yes |  |
| `thumbnailUrl` | `str` | No |  |
| `title` | `str` | Yes |  |
| `upvotes` | `float` | Yes |  |
| `withdrawnAt` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Paper().list()
for paper in results:
    print(paper)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Paper().load({"id": "paper_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaperEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProfileEntity

```python
profile = client.Profile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatarUrl` | `str` | Yes |  |
| `createdAt` | `str` | Yes |  |
| `details` | `str` | No |  |
| `fullname` | `str` | Yes |  |
| `hardwareItems` | `list` | No | The user's hardware items, unless the user set them as private |
| `id` | `str` | Yes | A hex string of 24 characters representing an ObjectId. |
| `isFollowing` | `bool` | No |  |
| `isPro` | `bool` | Yes |  |
| `numBuckets` | `float` | No |  |
| `numDatasets` | `float` | No |  |
| `numDiscussions` | `float` | No |  |
| `numFollowers` | `float` | No |  |
| `numFollowing` | `float` | No |  |
| `numFollowingOrgs` | `float` | No |  |
| `numKernels` | `float` | No |  |
| `numLikes` | `float` | No |  |
| `numModels` | `float` | No |  |
| `numPapers` | `float` | No |  |
| `numSpaces` | `float` | No |  |
| `numUpvotes` | `float` | No |  |
| `orgs` | `list` | No |  |
| `primaryOrgAvatarUrl` | `str` | No |  |
| `reasonToFollow` | `str` | No |  |
| `serviceAccount` | `dict` | Yes | Set when the user is a service account |
| `type` | `str` | Yes |  |
| `user` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Profile().load({"username": "username"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProfileEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SpaceEntity

```python
space = client.Space()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `str` | No |  |
| `cardData` | `dict` | No |  |
| `createdAt` | `str` | No |  |
| `disabled` | `bool` | No |  |
| `gated` | `Any` | No | false, or 'auto' / 'manual' when access needs approval. |
| `host` | `str` | No |  |
| `id` | `str` | No | Repo id, namespace/name. |
| `lastModified` | `str` | No |  |
| `likes` | `int` | No |  |
| `models` | `list` | No |  |
| `private` | `bool` | No |  |
| `runtime` | `dict` | No |  |
| `sdk` | `str` | No | gradio, streamlit, docker or static. |
| `sha` | `str` | No |  |
| `siblings` | `list` | No |  |
| `subdomain` | `str` | No |  |
| `tags` | `list` | No |  |
| `trendingScore` | `float` | No |  |
| `usedStorage` | `int` | No |  |

### Field Usage by Operation

| Field | load | list |
| --- | --- | --- |
| `author` | - | - |
| `cardData` | - | - |
| `createdAt` | - | - |
| `disabled` | - | - |
| `gated` | - | - |
| `host` | - | - |
| `id` | Yes | Yes |
| `lastModified` | - | - |
| `likes` | - | - |
| `models` | - | - |
| `private` | - | - |
| `runtime` | - | - |
| `sdk` | - | - |
| `sha` | - | - |
| `siblings` | - | - |
| `subdomain` | - | - |
| `tags` | - | - |
| `trendingScore` | - | - |
| `usedStorage` | - | - |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Space().list()
for space in results:
    print(space)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Space().load({"namespace": "namespace", "repo": "repo"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SpaceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TrendingEntity

```python
trending = client.Trending()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `recentlyTrending` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Trending().list()
for trending in results:
    print(trending)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TrendingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```python
client = HuggingfaceHubSDK({
    "feature": {
        "test": {"active": True},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

