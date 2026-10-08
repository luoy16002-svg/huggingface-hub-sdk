# HuggingfaceHub Golang SDK

Search and read models, datasets, Spaces, papers and collections on the Hugging Face Hub.

The Golang SDK for the HuggingfaceHub API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Auth(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `py`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/luoy16002-svg/huggingface-hub-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/luoy16002-svg/huggingface-hub-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/luoy16002-svg/huggingface-hub-sdk/go=../huggingface-hub-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/luoy16002-svg/huggingface-hub-sdk/go"
)

func main() {
    client := sdk.NewHuggingfaceHubSDK(map[string]any{
        "apikey": os.Getenv("HUGGINGFACE_HUB_APIKEY"),
    })

    // Load a single auth — the value is the loaded record.
    auth, err := client.Auth(nil).Load(nil, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(auth)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
datasets, err := client.Dataset(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = datasets
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

dataset, err := client.Dataset(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(dataset) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewHuggingfaceHubSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewHuggingfaceHubSDK

```go
func NewHuggingfaceHubSDK(options map[string]any) *HuggingfaceHubSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *HuggingfaceHubSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### HuggingfaceHubSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Auth` | `(data map[string]any) HuggingfaceHubEntity` | Create an Auth entity instance. |
| `Collection` | `(data map[string]any) HuggingfaceHubEntity` | Create a Collection entity instance. |
| `DailyPaper` | `(data map[string]any) HuggingfaceHubEntity` | Create a DailyPaper entity instance. |
| `Dataset` | `(data map[string]any) HuggingfaceHubEntity` | Create a Dataset entity instance. |
| `Model` | `(data map[string]any) HuggingfaceHubEntity` | Create a Model entity instance. |
| `Paper` | `(data map[string]any) HuggingfaceHubEntity` | Create a Paper entity instance. |
| `Profile` | `(data map[string]any) HuggingfaceHubEntity` | Create a Profile entity instance. |
| `Space` | `(data map[string]any) HuggingfaceHubEntity` | Create a Space entity instance. |
| `Trending` | `(data map[string]any) HuggingfaceHubEntity` | Create a Trending entity instance. |

### Entity interface (HuggingfaceHubEntity)

All entities implement the `HuggingfaceHubEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    auth, err := client.Auth(nil).Load(nil, nil)
    if err != nil { /* handle */ }
    // auth is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Auth

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/whoami-v2`

#### Collection

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"gating"` |  |
| `"id"` |  |
| `"isUpvotedByUser"` |  |
| `"items"` |  |
| `"lastUpdated"` |  |
| `"owner"` |  |
| `"position"` |  |
| `"private"` |  |
| `"resourceGroup"` |  |
| `"shareUrl"` |  |
| `"slug"` |  |
| `"theme"` |  |
| `"title"` |  |
| `"upvotes"` |  |

Operations: List, Load.

API path: `/api/collections`

#### DailyPaper

| Field | Description |
| --- | --- |
| `"isAuthorParticipating"` |  |
| `"mediaUrls"` |  |
| `"numComments"` |  |
| `"paper"` | Paper data with metadata |
| `"publishedAt"` |  |
| `"submittedBy"` | User overview information |
| `"summary"` |  |
| `"thumbnail"` |  |
| `"title"` |  |

Operations: List.

API path: `/api/daily_papers`

#### Dataset

| Field | Description |
| --- | --- |
| `"author"` |  |
| `"cardData"` |  |
| `"createdAt"` |  |
| `"description"` |  |
| `"disabled"` |  |
| `"downloads"` |  |
| `"gated"` | false, or 'auto' / 'manual' when access needs approval. |
| `"id"` | Repo id, namespace/name. |
| `"lastModified"` |  |
| `"likes"` |  |
| `"paperswithcode_id"` |  |
| `"private"` |  |
| `"sha"` |  |
| `"siblings"` |  |
| `"tags"` |  |
| `"trendingScore"` |  |
| `"usedStorage"` |  |

Operations: List, Load.

API path: `/api/datasets`

#### Model

| Field | Description |
| --- | --- |
| `"author"` |  |
| `"cardData"` |  |
| `"config"` |  |
| `"createdAt"` |  |
| `"disabled"` |  |
| `"downloads"` |  |
| `"gated"` | false, or 'auto' / 'manual' when access needs approval. |
| `"id"` | Repo id, namespace/name. |
| `"lastModified"` |  |
| `"library_name"` |  |
| `"likes"` |  |
| `"modelId"` |  |
| `"pipeline_tag"` |  |
| `"private"` |  |
| `"safetensors"` |  |
| `"sha"` |  |
| `"siblings"` |  |
| `"spaces"` |  |
| `"tags"` |  |
| `"trendingScore"` |  |
| `"usedStorage"` |  |

Operations: List, Load.

API path: `/api/models`

#### Paper

| Field | Description |
| --- | --- |
| `"ai_keywords"` |  |
| `"ai_summary"` |  |
| `"ai_summary_model"` |  |
| `"authors"` |  |
| `"comments"` | only available when field contains 'comments' |
| `"discussionId"` |  |
| `"githubRepo"` |  |
| `"githubStars"` |  |
| `"id"` |  |
| `"linkedDatasets"` |  |
| `"linkedModels"` |  |
| `"linkedSpaces"` |  |
| `"mediaUrls"` |  |
| `"numTotalDatasets"` |  |
| `"numTotalModels"` |  |
| `"numTotalSpaces"` |  |
| `"organization"` |  |
| `"projectPage"` |  |
| `"publishedAt"` |  |
| `"submissionDeadline"` | only available when field contains 'submissionDeadline' |
| `"submittedOnDailyAt"` |  |
| `"submittedOnDailyBy"` | User overview information |
| `"summary"` |  |
| `"thumbnailUrl"` |  |
| `"title"` |  |
| `"upvotes"` |  |
| `"withdrawnAt"` |  |

Operations: List, Load.

API path: `/api/papers`

#### Profile

| Field | Description |
| --- | --- |
| `"avatarUrl"` |  |
| `"createdAt"` |  |
| `"details"` |  |
| `"fullname"` |  |
| `"hardwareItems"` | The user's hardware items, unless the user set them as private |
| `"id"` | A hex string of 24 characters representing an ObjectId. |
| `"isFollowing"` |  |
| `"isPro"` |  |
| `"numBuckets"` |  |
| `"numDatasets"` |  |
| `"numDiscussions"` |  |
| `"numFollowers"` |  |
| `"numFollowing"` |  |
| `"numFollowingOrgs"` |  |
| `"numKernels"` |  |
| `"numLikes"` |  |
| `"numModels"` |  |
| `"numPapers"` |  |
| `"numSpaces"` |  |
| `"numUpvotes"` |  |
| `"orgs"` |  |
| `"primaryOrgAvatarUrl"` |  |
| `"reasonToFollow"` |  |
| `"serviceAccount"` | Set when the user is a service account |
| `"type"` |  |
| `"user"` |  |

Operations: Load.

API path: `/api/users/{username}/overview`

#### Space

| Field | Description |
| --- | --- |
| `"author"` |  |
| `"cardData"` |  |
| `"createdAt"` |  |
| `"disabled"` |  |
| `"gated"` | false, or 'auto' / 'manual' when access needs approval. |
| `"host"` |  |
| `"id"` | Repo id, namespace/name. |
| `"lastModified"` |  |
| `"likes"` |  |
| `"models"` |  |
| `"private"` |  |
| `"runtime"` |  |
| `"sdk"` | gradio, streamlit, docker or static. |
| `"sha"` |  |
| `"siblings"` |  |
| `"subdomain"` |  |
| `"tags"` |  |
| `"trendingScore"` |  |
| `"usedStorage"` |  |

Operations: List, Load.

API path: `/api/spaces`

#### Trending

| Field | Description |
| --- | --- |
| `"recentlyTrending"` |  |

Operations: List.

API path: `/api/trending`



## Entities


### Auth

Create an instance: `auth := client.Auth(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
auth, err := client.Auth(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(auth) // the loaded record
```


### Collection

Create an instance: `collection := client.Collection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `gating` | `any` |  |
| `id` | `string` |  |
| `isUpvotedByUser` | `bool` |  |
| `items` | `[]any` |  |
| `lastUpdated` | `string` |  |
| `owner` | `any` |  |
| `position` | `float64` |  |
| `private` | `bool` |  |
| `resourceGroup` | `map[string]any` |  |
| `shareUrl` | `string` |  |
| `slug` | `string` |  |
| `theme` | `string` |  |
| `title` | `string` |  |
| `upvotes` | `float64` |  |

#### Example: Load

```go
collection, err := client.Collection(nil).Load(map[string]any{"namespace": "namespace", "slug": "slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(collection) // the loaded record
```

#### Example: List

```go
collections, err := client.Collection(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(collections) // the array of records
```


### DailyPaper

Create an instance: `dailyPaper := client.DailyPaper(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `isAuthorParticipating` | `bool` |  |
| `mediaUrls` | `[]any` |  |
| `numComments` | `float64` |  |
| `paper` | `map[string]any` | Paper data with metadata |
| `publishedAt` | `string` |  |
| `submittedBy` | `map[string]any` | User overview information |
| `summary` | `string` |  |
| `thumbnail` | `string` |  |
| `title` | `string` |  |

#### Example: List

```go
dailyPapers, err := client.DailyPaper(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(dailyPapers) // the array of records
```


### Dataset

Create an instance: `dataset := client.Dataset(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `string` |  |
| `cardData` | `map[string]any` |  |
| `createdAt` | `string` |  |
| `description` | `string` |  |
| `disabled` | `bool` |  |
| `downloads` | `int` |  |
| `gated` | `any` | false, or 'auto' / 'manual' when access needs approval. |
| `id` | `string` | Repo id, namespace/name. |
| `lastModified` | `string` |  |
| `likes` | `int` |  |
| `paperswithcode_id` | `any` |  |
| `private` | `bool` |  |
| `sha` | `string` |  |
| `siblings` | `[]any` |  |
| `tags` | `[]any` |  |
| `trendingScore` | `float64` |  |
| `usedStorage` | `int` |  |

#### Example: Load

```go
dataset, err := client.Dataset(nil).Load(map[string]any{"namespace": "namespace", "repo": "repo"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(dataset) // the loaded record
```

#### Example: List

```go
datasets, err := client.Dataset(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(datasets) // the array of records
```


### Model

Create an instance: `model := client.Model(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `string` |  |
| `cardData` | `map[string]any` |  |
| `config` | `map[string]any` |  |
| `createdAt` | `string` |  |
| `disabled` | `bool` |  |
| `downloads` | `int` |  |
| `gated` | `any` | false, or 'auto' / 'manual' when access needs approval. |
| `id` | `string` | Repo id, namespace/name. |
| `lastModified` | `string` |  |
| `library_name` | `string` |  |
| `likes` | `int` |  |
| `modelId` | `string` |  |
| `pipeline_tag` | `string` |  |
| `private` | `bool` |  |
| `safetensors` | `map[string]any` |  |
| `sha` | `string` |  |
| `siblings` | `[]any` |  |
| `spaces` | `[]any` |  |
| `tags` | `[]any` |  |
| `trendingScore` | `float64` |  |
| `usedStorage` | `int` |  |

#### Example: Load

```go
model, err := client.Model(nil).Load(map[string]any{"namespace": "namespace", "repo": "repo"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(model) // the loaded record
```

#### Example: List

```go
models, err := client.Model(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(models) // the array of records
```


### Paper

Create an instance: `paper := client.Paper(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ai_keywords` | `[]any` |  |
| `ai_summary` | `string` |  |
| `ai_summary_model` | `string` |  |
| `authors` | `[]any` |  |
| `comments` | `[]any` | only available when field contains 'comments' |
| `discussionId` | `string` |  |
| `githubRepo` | `string` |  |
| `githubStars` | `float64` |  |
| `id` | `string` |  |
| `linkedDatasets` | `[]any` |  |
| `linkedModels` | `[]any` |  |
| `linkedSpaces` | `[]any` |  |
| `mediaUrls` | `[]any` |  |
| `numTotalDatasets` | `float64` |  |
| `numTotalModels` | `float64` |  |
| `numTotalSpaces` | `float64` |  |
| `organization` | `map[string]any` |  |
| `projectPage` | `string` |  |
| `publishedAt` | `string` |  |
| `submissionDeadline` | `string` | only available when field contains 'submissionDeadline' |
| `submittedOnDailyAt` | `string` |  |
| `submittedOnDailyBy` | `map[string]any` | User overview information |
| `summary` | `string` |  |
| `thumbnailUrl` | `string` |  |
| `title` | `string` |  |
| `upvotes` | `float64` |  |
| `withdrawnAt` | `string` |  |

#### Example: Load

```go
paper, err := client.Paper(nil).Load(map[string]any{"id": "paper_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(paper) // the loaded record
```

#### Example: List

```go
papers, err := client.Paper(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(papers) // the array of records
```


### Profile

Create an instance: `profile := client.Profile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatarUrl` | `string` |  |
| `createdAt` | `string` |  |
| `details` | `string` |  |
| `fullname` | `string` |  |
| `hardwareItems` | `[]any` | The user's hardware items, unless the user set them as private |
| `id` | `string` | A hex string of 24 characters representing an ObjectId. |
| `isFollowing` | `bool` |  |
| `isPro` | `bool` |  |
| `numBuckets` | `float64` |  |
| `numDatasets` | `float64` |  |
| `numDiscussions` | `float64` |  |
| `numFollowers` | `float64` |  |
| `numFollowing` | `float64` |  |
| `numFollowingOrgs` | `float64` |  |
| `numKernels` | `float64` |  |
| `numLikes` | `float64` |  |
| `numModels` | `float64` |  |
| `numPapers` | `float64` |  |
| `numSpaces` | `float64` |  |
| `numUpvotes` | `float64` |  |
| `orgs` | `[]any` |  |
| `primaryOrgAvatarUrl` | `string` |  |
| `reasonToFollow` | `string` |  |
| `serviceAccount` | `map[string]any` | Set when the user is a service account |
| `type` | `string` |  |
| `user` | `string` |  |

#### Example: Load

```go
profile, err := client.Profile(nil).Load(map[string]any{"username": "username"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(profile) // the loaded record
```


### Space

Create an instance: `space := client.Space(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `string` |  |
| `cardData` | `map[string]any` |  |
| `createdAt` | `string` |  |
| `disabled` | `bool` |  |
| `gated` | `any` | false, or 'auto' / 'manual' when access needs approval. |
| `host` | `string` |  |
| `id` | `string` | Repo id, namespace/name. |
| `lastModified` | `string` |  |
| `likes` | `int` |  |
| `models` | `[]any` |  |
| `private` | `bool` |  |
| `runtime` | `map[string]any` |  |
| `sdk` | `string` | gradio, streamlit, docker or static. |
| `sha` | `string` |  |
| `siblings` | `[]any` |  |
| `subdomain` | `string` |  |
| `tags` | `[]any` |  |
| `trendingScore` | `float64` |  |
| `usedStorage` | `int` |  |

#### Example: Load

```go
space, err := client.Space(nil).Load(map[string]any{"namespace": "namespace", "repo": "repo"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(space) // the loaded record
```

#### Example: List

```go
spaces, err := client.Space(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(spaces) // the array of records
```


### Trending

Create an instance: `trending := client.Trending(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `recentlyTrending` | `[]any` |  |

#### Example: List

```go
trendings, err := client.Trending(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(trendings) // the array of records
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/luoy16002-svg/huggingface-hub-sdk/go/
├── huggingface-hub.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/luoy16002-svg/huggingface-hub-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
dataset := client.Dataset(nil)
dataset.List(nil, nil)

// dataset.Data() now returns the dataset data from the last list
// dataset.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
