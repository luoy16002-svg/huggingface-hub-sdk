# HuggingfaceHub TypeScript SDK

Search and read models, datasets, Spaces, papers and collections on the Hugging Face Hub.

The TypeScript SDK for the HuggingfaceHub API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Auth()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `py` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/luoy16002-svg/huggingface-hub-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/luoy16002-svg/huggingface-hub-sdk
npm install ./huggingface-hub-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { HuggingfaceHubSDK } from '@voxgig-sdk/huggingface-hub-sdk'

const client = new HuggingfaceHubSDK({
  apikey: process.env.HUGGINGFACE_HUB_APIKEY,
})
```

### 3. Load an auth

`load()` returns the entity directly and throws on failure:

```ts
try {
  const auth = await client.Auth().load()
  console.log(auth)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const datasets = await client.Dataset().list()
  console.log(datasets)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = HuggingfaceHubSDK.test()

const dataset = await client.Dataset().list()
// dataset is the entity, populated with mock response data
// — call dataset.data() for the record itself
console.log(dataset)
```

You can also use the instance method:

```ts
const client = new HuggingfaceHubSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Dataset()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new HuggingfaceHubSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### HuggingfaceHubSDK

#### Constructor

```ts
new HuggingfaceHubSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Auth(data?)` | `AuthEntity` | Create an Auth entity instance. |
| `Collection(data?)` | `CollectionEntity` | Create a Collection entity instance. |
| `DailyPaper(data?)` | `DailyPaperEntity` | Create a DailyPaper entity instance. |
| `Dataset(data?)` | `DatasetEntity` | Create a Dataset entity instance. |
| `Model(data?)` | `ModelEntity` | Create a Model entity instance. |
| `Paper(data?)` | `PaperEntity` | Create a Paper entity instance. |
| `Profile(data?)` | `ProfileEntity` | Create a Profile entity instance. |
| `Space(data?)` | `SpaceEntity` | Create a Space entity instance. |
| `Trending(data?)` | `TrendingEntity` | Create a Trending entity instance. |
| `tester(testopts?, sdkopts?)` | `HuggingfaceHubSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `HuggingfaceHubSDK.test(testopts?, sdkopts?)` | `HuggingfaceHubSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): HuggingfaceHubSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Auth

| Field | Description |
| --- | --- |

Operations: load.

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

Operations: list, load.

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

Operations: list.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: load.

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

Operations: list, load.

API path: `/api/spaces`

#### Trending

| Field | Description |
| --- | --- |
| `recentlyTrending` |  |

Operations: list.

API path: `/api/trending`



## Entities


### Auth

Create an instance: `const auth = client.Auth()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const auth = await client.Auth().load()
```


### Collection

Create an instance: `const collection = client.Collection()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `gating` | `any` |  |
| `id` | `string` |  |
| `isUpvotedByUser` | `boolean` |  |
| `items` | `any[]` |  |
| `lastUpdated` | `string` |  |
| `owner` | `any` |  |
| `position` | `number` |  |
| `private` | `boolean` |  |
| `resourceGroup` | `Record<string, any>` |  |
| `shareUrl` | `string` |  |
| `slug` | `string` |  |
| `theme` | `string` |  |
| `title` | `string` |  |
| `upvotes` | `number` |  |

#### Example: Load

```ts
const collection = await client.Collection().load({ namespace: 'namespace', slug: 'slug' })
```

#### Example: List

```ts
const collections = await client.Collection().list()
```


### DailyPaper

Create an instance: `const daily_paper = client.DailyPaper()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `isAuthorParticipating` | `boolean` |  |
| `mediaUrls` | `any[]` |  |
| `numComments` | `number` |  |
| `paper` | `Record<string, any>` | Paper data with metadata |
| `publishedAt` | `string` |  |
| `submittedBy` | `Record<string, any>` | User overview information |
| `summary` | `string` |  |
| `thumbnail` | `string` |  |
| `title` | `string` |  |

#### Example: List

```ts
const daily_papers = await client.DailyPaper().list()
```


### Dataset

Create an instance: `const dataset = client.Dataset()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `string` |  |
| `cardData` | `Record<string, any>` |  |
| `createdAt` | `string` |  |
| `description` | `string` |  |
| `disabled` | `boolean` |  |
| `downloads` | `number` |  |
| `gated` | `any` | false, or 'auto' / 'manual' when access needs approval. |
| `id` | `string` | Repo id, namespace/name. |
| `lastModified` | `string` |  |
| `likes` | `number` |  |
| `paperswithcode_id` | `string | null` |  |
| `private` | `boolean` |  |
| `sha` | `string` |  |
| `siblings` | `any[]` |  |
| `tags` | `any[]` |  |
| `trendingScore` | `number` |  |
| `usedStorage` | `number` |  |

#### Example: Load

```ts
const dataset = await client.Dataset().load({ namespace: 'namespace', repo: 'repo' })
```

#### Example: List

```ts
const datasets = await client.Dataset().list()
```


### Model

Create an instance: `const model = client.Model()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `string` |  |
| `cardData` | `Record<string, any>` |  |
| `config` | `Record<string, any>` |  |
| `createdAt` | `string` |  |
| `disabled` | `boolean` |  |
| `downloads` | `number` |  |
| `gated` | `any` | false, or 'auto' / 'manual' when access needs approval. |
| `id` | `string` | Repo id, namespace/name. |
| `lastModified` | `string` |  |
| `library_name` | `string` |  |
| `likes` | `number` |  |
| `modelId` | `string` |  |
| `pipeline_tag` | `string` |  |
| `private` | `boolean` |  |
| `safetensors` | `Record<string, any>` |  |
| `sha` | `string` |  |
| `siblings` | `any[]` |  |
| `spaces` | `any[]` |  |
| `tags` | `any[]` |  |
| `trendingScore` | `number` |  |
| `usedStorage` | `number` |  |

#### Example: Load

```ts
const model = await client.Model().load({ namespace: 'namespace', repo: 'repo' })
```

#### Example: List

```ts
const models = await client.Model().list()
```


### Paper

Create an instance: `const paper = client.Paper()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ai_keywords` | `any[]` |  |
| `ai_summary` | `string` |  |
| `ai_summary_model` | `string` |  |
| `authors` | `any[]` |  |
| `comments` | `any[]` | only available when field contains 'comments' |
| `discussionId` | `string` |  |
| `githubRepo` | `string` |  |
| `githubStars` | `number` |  |
| `id` | `string` |  |
| `linkedDatasets` | `any[]` |  |
| `linkedModels` | `any[]` |  |
| `linkedSpaces` | `any[]` |  |
| `mediaUrls` | `any[]` |  |
| `numTotalDatasets` | `number` |  |
| `numTotalModels` | `number` |  |
| `numTotalSpaces` | `number` |  |
| `organization` | `Record<string, any>` |  |
| `projectPage` | `string` |  |
| `publishedAt` | `string` |  |
| `submissionDeadline` | `string` | only available when field contains 'submissionDeadline' |
| `submittedOnDailyAt` | `string` |  |
| `submittedOnDailyBy` | `Record<string, any>` | User overview information |
| `summary` | `string` |  |
| `thumbnailUrl` | `string` |  |
| `title` | `string` |  |
| `upvotes` | `number` |  |
| `withdrawnAt` | `string` |  |

#### Example: Load

```ts
const paper = await client.Paper().load({ id: 'paper_id' })
```

#### Example: List

```ts
const papers = await client.Paper().list()
```


### Profile

Create an instance: `const profile = client.Profile()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatarUrl` | `string` |  |
| `createdAt` | `string` |  |
| `details` | `string` |  |
| `fullname` | `string` |  |
| `hardwareItems` | `any[]` | The user's hardware items, unless the user set them as private |
| `id` | `string` | A hex string of 24 characters representing an ObjectId. |
| `isFollowing` | `boolean` |  |
| `isPro` | `boolean` |  |
| `numBuckets` | `number` |  |
| `numDatasets` | `number` |  |
| `numDiscussions` | `number` |  |
| `numFollowers` | `number` |  |
| `numFollowing` | `number` |  |
| `numFollowingOrgs` | `number` |  |
| `numKernels` | `number` |  |
| `numLikes` | `number` |  |
| `numModels` | `number` |  |
| `numPapers` | `number` |  |
| `numSpaces` | `number` |  |
| `numUpvotes` | `number` |  |
| `orgs` | `any[]` |  |
| `primaryOrgAvatarUrl` | `string` |  |
| `reasonToFollow` | `string` |  |
| `serviceAccount` | `Record<string, any>` | Set when the user is a service account |
| `type` | `string` |  |
| `user` | `string` |  |

#### Example: Load

```ts
const profile = await client.Profile().load({ username: 'username' })
```


### Space

Create an instance: `const space = client.Space()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `string` |  |
| `cardData` | `Record<string, any>` |  |
| `createdAt` | `string` |  |
| `disabled` | `boolean` |  |
| `gated` | `any` | false, or 'auto' / 'manual' when access needs approval. |
| `host` | `string` |  |
| `id` | `string` | Repo id, namespace/name. |
| `lastModified` | `string` |  |
| `likes` | `number` |  |
| `models` | `any[]` |  |
| `private` | `boolean` |  |
| `runtime` | `Record<string, any>` |  |
| `sdk` | `string` | gradio, streamlit, docker or static. |
| `sha` | `string` |  |
| `siblings` | `any[]` |  |
| `subdomain` | `string` |  |
| `tags` | `any[]` |  |
| `trendingScore` | `number` |  |
| `usedStorage` | `number` |  |

#### Example: Load

```ts
const space = await client.Space().load({ namespace: 'namespace', repo: 'repo' })
```

#### Example: List

```ts
const spaces = await client.Space().list()
```


### Trending

Create an instance: `const trending = client.Trending()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `recentlyTrending` | `any[]` |  |

#### Example: List

```ts
const trendings = await client.Trending().list()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
huggingface-hub/
├── src/
│   ├── HuggingfaceHubSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { HuggingfaceHubSDK } from '@voxgig-sdk/huggingface-hub-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const dataset = client.Dataset()
await dataset.list()

// dataset.data() now returns the dataset data from the last `list`
// dataset.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
