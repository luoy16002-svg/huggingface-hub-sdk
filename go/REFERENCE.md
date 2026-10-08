# HuggingfaceHub Golang SDK Reference

Complete API reference for the HuggingfaceHub Golang SDK.


## HuggingfaceHubSDK

### Constructor

```go
func NewHuggingfaceHubSDK(options map[string]any) *HuggingfaceHubSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *HuggingfaceHubSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *HuggingfaceHubSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Auth(data map[string]any) HuggingfaceHubEntity`

Create a new `Auth` entity instance. Pass `nil` for no initial data.

#### `Collection(data map[string]any) HuggingfaceHubEntity`

Create a new `Collection` entity instance. Pass `nil` for no initial data.

#### `DailyPaper(data map[string]any) HuggingfaceHubEntity`

Create a new `DailyPaper` entity instance. Pass `nil` for no initial data.

#### `Dataset(data map[string]any) HuggingfaceHubEntity`

Create a new `Dataset` entity instance. Pass `nil` for no initial data.

#### `Model(data map[string]any) HuggingfaceHubEntity`

Create a new `Model` entity instance. Pass `nil` for no initial data.

#### `Paper(data map[string]any) HuggingfaceHubEntity`

Create a new `Paper` entity instance. Pass `nil` for no initial data.

#### `Profile(data map[string]any) HuggingfaceHubEntity`

Create a new `Profile` entity instance. Pass `nil` for no initial data.

#### `Space(data map[string]any) HuggingfaceHubEntity`

Create a new `Space` entity instance. Pass `nil` for no initial data.

#### `Trending(data map[string]any) HuggingfaceHubEntity`

Create a new `Trending` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AuthEntity

```go
auth := client.Auth(nil)
fmt.Println(auth.GetName()) // "auth"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Auth(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AuthEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CollectionEntity

```go
collection := client.Collection(nil)
fmt.Println(collection.GetName()) // "collection"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `gating` | `any` | Yes |  |
| `id` | `string` | No |  |
| `isUpvotedByUser` | `bool` | Yes |  |
| `items` | `[]any` | Yes |  |
| `lastUpdated` | `string` | Yes |  |
| `owner` | `any` | Yes |  |
| `position` | `float64` | Yes |  |
| `private` | `bool` | Yes |  |
| `resourceGroup` | `map[string]any` | Yes |  |
| `shareUrl` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `theme` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `upvotes` | `float64` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Collection(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Collection(nil).Load(map[string]any{"namespace": "namespace", "slug": "slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CollectionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DailyPaperEntity

```go
dailyPaper := client.DailyPaper(nil)
fmt.Println(dailyPaper.GetName()) // "daily_paper"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `isAuthorParticipating` | `bool` | Yes |  |
| `mediaUrls` | `[]any` | No |  |
| `numComments` | `float64` | Yes |  |
| `paper` | `map[string]any` | Yes | Paper data with metadata |
| `publishedAt` | `string` | Yes |  |
| `submittedBy` | `map[string]any` | Yes | User overview information |
| `summary` | `string` | Yes |  |
| `thumbnail` | `string` | Yes |  |
| `title` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.DailyPaper(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DailyPaperEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DatasetEntity

```go
dataset := client.Dataset(nil)
fmt.Println(dataset.GetName()) // "dataset"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `string` | No |  |
| `cardData` | `map[string]any` | No |  |
| `createdAt` | `string` | No |  |
| `description` | `string` | No |  |
| `disabled` | `bool` | No |  |
| `downloads` | `int` | No |  |
| `gated` | `any` | No | false, or 'auto' / 'manual' when access needs approval. |
| `id` | `string` | No | Repo id, namespace/name. |
| `lastModified` | `string` | No |  |
| `likes` | `int` | No |  |
| `paperswithcode_id` | `any` | No |  |
| `private` | `bool` | No |  |
| `sha` | `string` | No |  |
| `siblings` | `[]any` | No |  |
| `tags` | `[]any` | No |  |
| `trendingScore` | `float64` | No |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Dataset(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Dataset(nil).Load(map[string]any{"namespace": "namespace", "repo": "repo"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DatasetEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ModelEntity

```go
model := client.Model(nil)
fmt.Println(model.GetName()) // "model"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `string` | No |  |
| `cardData` | `map[string]any` | No |  |
| `config` | `map[string]any` | No |  |
| `createdAt` | `string` | No |  |
| `disabled` | `bool` | No |  |
| `downloads` | `int` | No |  |
| `gated` | `any` | No | false, or 'auto' / 'manual' when access needs approval. |
| `id` | `string` | No | Repo id, namespace/name. |
| `lastModified` | `string` | No |  |
| `library_name` | `string` | No |  |
| `likes` | `int` | No |  |
| `modelId` | `string` | No |  |
| `pipeline_tag` | `string` | No |  |
| `private` | `bool` | No |  |
| `safetensors` | `map[string]any` | No |  |
| `sha` | `string` | No |  |
| `siblings` | `[]any` | No |  |
| `spaces` | `[]any` | No |  |
| `tags` | `[]any` | No |  |
| `trendingScore` | `float64` | No |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Model(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Model(nil).Load(map[string]any{"namespace": "namespace", "repo": "repo"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ModelEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PaperEntity

```go
paper := client.Paper(nil)
fmt.Println(paper.GetName()) // "paper"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ai_keywords` | `[]any` | No |  |
| `ai_summary` | `string` | No |  |
| `ai_summary_model` | `string` | No |  |
| `authors` | `[]any` | Yes |  |
| `comments` | `[]any` | No | only available when field contains 'comments' |
| `discussionId` | `string` | Yes |  |
| `githubRepo` | `string` | No |  |
| `githubStars` | `float64` | No |  |
| `id` | `string` | Yes |  |
| `linkedDatasets` | `[]any` | Yes |  |
| `linkedModels` | `[]any` | Yes |  |
| `linkedSpaces` | `[]any` | Yes |  |
| `mediaUrls` | `[]any` | No |  |
| `numTotalDatasets` | `float64` | Yes |  |
| `numTotalModels` | `float64` | Yes |  |
| `numTotalSpaces` | `float64` | Yes |  |
| `organization` | `map[string]any` | Yes |  |
| `projectPage` | `string` | No |  |
| `publishedAt` | `string` | Yes |  |
| `submissionDeadline` | `string` | No | only available when field contains 'submissionDeadline' |
| `submittedOnDailyAt` | `string` | No |  |
| `submittedOnDailyBy` | `map[string]any` | Yes | User overview information |
| `summary` | `string` | Yes |  |
| `thumbnailUrl` | `string` | No |  |
| `title` | `string` | Yes |  |
| `upvotes` | `float64` | Yes |  |
| `withdrawnAt` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Paper(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Paper(nil).Load(map[string]any{"id": "paper_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PaperEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProfileEntity

```go
profile := client.Profile(nil)
fmt.Println(profile.GetName()) // "profile"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatarUrl` | `string` | Yes |  |
| `createdAt` | `string` | Yes |  |
| `details` | `string` | No |  |
| `fullname` | `string` | Yes |  |
| `hardwareItems` | `[]any` | No | The user's hardware items, unless the user set them as private |
| `id` | `string` | Yes | A hex string of 24 characters representing an ObjectId. |
| `isFollowing` | `bool` | No |  |
| `isPro` | `bool` | Yes |  |
| `numBuckets` | `float64` | No |  |
| `numDatasets` | `float64` | No |  |
| `numDiscussions` | `float64` | No |  |
| `numFollowers` | `float64` | No |  |
| `numFollowing` | `float64` | No |  |
| `numFollowingOrgs` | `float64` | No |  |
| `numKernels` | `float64` | No |  |
| `numLikes` | `float64` | No |  |
| `numModels` | `float64` | No |  |
| `numPapers` | `float64` | No |  |
| `numSpaces` | `float64` | No |  |
| `numUpvotes` | `float64` | No |  |
| `orgs` | `[]any` | No |  |
| `primaryOrgAvatarUrl` | `string` | No |  |
| `reasonToFollow` | `string` | No |  |
| `serviceAccount` | `map[string]any` | Yes | Set when the user is a service account |
| `type` | `string` | Yes |  |
| `user` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Profile(nil).Load(map[string]any{"username": "username"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProfileEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SpaceEntity

```go
space := client.Space(nil)
fmt.Println(space.GetName()) // "space"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `string` | No |  |
| `cardData` | `map[string]any` | No |  |
| `createdAt` | `string` | No |  |
| `disabled` | `bool` | No |  |
| `gated` | `any` | No | false, or 'auto' / 'manual' when access needs approval. |
| `host` | `string` | No |  |
| `id` | `string` | No | Repo id, namespace/name. |
| `lastModified` | `string` | No |  |
| `likes` | `int` | No |  |
| `models` | `[]any` | No |  |
| `private` | `bool` | No |  |
| `runtime` | `map[string]any` | No |  |
| `sdk` | `string` | No | gradio, streamlit, docker or static. |
| `sha` | `string` | No |  |
| `siblings` | `[]any` | No |  |
| `subdomain` | `string` | No |  |
| `tags` | `[]any` | No |  |
| `trendingScore` | `float64` | No |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Space(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Space(nil).Load(map[string]any{"namespace": "namespace", "repo": "repo"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SpaceEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## TrendingEntity

```go
trending := client.Trending(nil)
fmt.Println(trending.GetName()) // "trending"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `recentlyTrending` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Trending(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TrendingEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```go
client := sdk.NewHuggingfaceHubSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
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

