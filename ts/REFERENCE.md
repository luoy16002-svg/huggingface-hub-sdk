# HuggingfaceHub TypeScript SDK Reference

Complete API reference for the HuggingfaceHub TypeScript SDK.


## HuggingfaceHubSDK

### Constructor

```ts
new HuggingfaceHubSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `HuggingfaceHubSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = HuggingfaceHubSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `HuggingfaceHubSDK` instance in test mode.


### Instance Methods

#### `Auth(data?: object)`

Create a new `Auth` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AuthEntity` instance.

#### `Collection(data?: object)`

Create a new `Collection` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CollectionEntity` instance.

#### `DailyPaper(data?: object)`

Create a new `DailyPaper` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DailyPaperEntity` instance.

#### `Dataset(data?: object)`

Create a new `Dataset` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DatasetEntity` instance.

#### `Model(data?: object)`

Create a new `Model` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ModelEntity` instance.

#### `Paper(data?: object)`

Create a new `Paper` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PaperEntity` instance.

#### `Profile(data?: object)`

Create a new `Profile` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProfileEntity` instance.

#### `Space(data?: object)`

Create a new `Space` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SpaceEntity` instance.

#### `Trending(data?: object)`

Create a new `Trending` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TrendingEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `HuggingfaceHubSDK.test()`.

**Returns:** `HuggingfaceHubSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## AuthEntity

```ts
const auth = client.Auth()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Auth().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AuthEntity` instance with the same client and
options.

#### `client()`

Return the parent `HuggingfaceHubSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CollectionEntity

```ts
const collection = client.Collection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `gating` | `any` | Yes |  |
| `id` | `string` | No |  |
| `isUpvotedByUser` | `boolean` | Yes |  |
| `items` | `any[]` | Yes |  |
| `lastUpdated` | `string` | Yes |  |
| `owner` | `any` | Yes |  |
| `position` | `number` | Yes |  |
| `private` | `boolean` | Yes |  |
| `resourceGroup` | `Record<string, any>` | Yes |  |
| `shareUrl` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `theme` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `upvotes` | `number` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Collection().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Collection().load({ namespace: 'namespace', slug: 'slug' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CollectionEntity` instance with the same client and
options.

#### `client()`

Return the parent `HuggingfaceHubSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DailyPaperEntity

```ts
const daily_paper = client.DailyPaper()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `isAuthorParticipating` | `boolean` | Yes |  |
| `mediaUrls` | `any[]` | No |  |
| `numComments` | `number` | Yes |  |
| `paper` | `Record<string, any>` | Yes | Paper data with metadata |
| `publishedAt` | `string` | Yes |  |
| `submittedBy` | `Record<string, any>` | Yes | User overview information |
| `summary` | `string` | Yes |  |
| `thumbnail` | `string` | Yes |  |
| `title` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.DailyPaper().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DailyPaperEntity` instance with the same client and
options.

#### `client()`

Return the parent `HuggingfaceHubSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DatasetEntity

```ts
const dataset = client.Dataset()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `string` | No |  |
| `cardData` | `Record<string, any>` | No |  |
| `createdAt` | `string` | No |  |
| `description` | `string` | No |  |
| `disabled` | `boolean` | No |  |
| `downloads` | `number` | No |  |
| `gated` | `any` | No | false, or 'auto' / 'manual' when access needs approval. |
| `id` | `string` | No | Repo id, namespace/name. |
| `lastModified` | `string` | No |  |
| `likes` | `number` | No |  |
| `paperswithcode_id` | `string | null` | No |  |
| `private` | `boolean` | No |  |
| `sha` | `string` | No |  |
| `siblings` | `any[]` | No |  |
| `tags` | `any[]` | No |  |
| `trendingScore` | `number` | No |  |
| `usedStorage` | `number` | No |  |

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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Dataset().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Dataset().load({ namespace: 'namespace', repo: 'repo' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DatasetEntity` instance with the same client and
options.

#### `client()`

Return the parent `HuggingfaceHubSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ModelEntity

```ts
const model = client.Model()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `string` | No |  |
| `cardData` | `Record<string, any>` | No |  |
| `config` | `Record<string, any>` | No |  |
| `createdAt` | `string` | No |  |
| `disabled` | `boolean` | No |  |
| `downloads` | `number` | No |  |
| `gated` | `any` | No | false, or 'auto' / 'manual' when access needs approval. |
| `id` | `string` | No | Repo id, namespace/name. |
| `lastModified` | `string` | No |  |
| `library_name` | `string` | No |  |
| `likes` | `number` | No |  |
| `modelId` | `string` | No |  |
| `pipeline_tag` | `string` | No |  |
| `private` | `boolean` | No |  |
| `safetensors` | `Record<string, any>` | No |  |
| `sha` | `string` | No |  |
| `siblings` | `any[]` | No |  |
| `spaces` | `any[]` | No |  |
| `tags` | `any[]` | No |  |
| `trendingScore` | `number` | No |  |
| `usedStorage` | `number` | No |  |

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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Model().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Model().load({ namespace: 'namespace', repo: 'repo' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ModelEntity` instance with the same client and
options.

#### `client()`

Return the parent `HuggingfaceHubSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PaperEntity

```ts
const paper = client.Paper()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ai_keywords` | `any[]` | No |  |
| `ai_summary` | `string` | No |  |
| `ai_summary_model` | `string` | No |  |
| `authors` | `any[]` | Yes |  |
| `comments` | `any[]` | No | only available when field contains 'comments' |
| `discussionId` | `string` | Yes |  |
| `githubRepo` | `string` | No |  |
| `githubStars` | `number` | No |  |
| `id` | `string` | Yes |  |
| `linkedDatasets` | `any[]` | Yes |  |
| `linkedModels` | `any[]` | Yes |  |
| `linkedSpaces` | `any[]` | Yes |  |
| `mediaUrls` | `any[]` | No |  |
| `numTotalDatasets` | `number` | Yes |  |
| `numTotalModels` | `number` | Yes |  |
| `numTotalSpaces` | `number` | Yes |  |
| `organization` | `Record<string, any>` | Yes |  |
| `projectPage` | `string` | No |  |
| `publishedAt` | `string` | Yes |  |
| `submissionDeadline` | `string` | No | only available when field contains 'submissionDeadline' |
| `submittedOnDailyAt` | `string` | No |  |
| `submittedOnDailyBy` | `Record<string, any>` | Yes | User overview information |
| `summary` | `string` | Yes |  |
| `thumbnailUrl` | `string` | No |  |
| `title` | `string` | Yes |  |
| `upvotes` | `number` | Yes |  |
| `withdrawnAt` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `search` | `/api/papers/search` | `client.Paper().list({ $action: 'search', ... })` |

An action returns that action's OWN response, which is not necessarily a
Paper record — check the API definition for its shape.

```ts
const result = await client.Paper().list({
  $action: 'search',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Paper().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Paper().load({ id: 'paper_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PaperEntity` instance with the same client and
options.

#### `client()`

Return the parent `HuggingfaceHubSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProfileEntity

```ts
const profile = client.Profile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatarUrl` | `string` | Yes |  |
| `createdAt` | `string` | Yes |  |
| `details` | `string` | No |  |
| `fullname` | `string` | Yes |  |
| `hardwareItems` | `any[]` | No | The user's hardware items, unless the user set them as private |
| `id` | `string` | Yes | A hex string of 24 characters representing an ObjectId. |
| `isFollowing` | `boolean` | No |  |
| `isPro` | `boolean` | Yes |  |
| `numBuckets` | `number` | No |  |
| `numDatasets` | `number` | No |  |
| `numDiscussions` | `number` | No |  |
| `numFollowers` | `number` | No |  |
| `numFollowing` | `number` | No |  |
| `numFollowingOrgs` | `number` | No |  |
| `numKernels` | `number` | No |  |
| `numLikes` | `number` | No |  |
| `numModels` | `number` | No |  |
| `numPapers` | `number` | No |  |
| `numSpaces` | `number` | No |  |
| `numUpvotes` | `number` | No |  |
| `orgs` | `any[]` | No |  |
| `primaryOrgAvatarUrl` | `string` | No |  |
| `reasonToFollow` | `string` | No |  |
| `serviceAccount` | `Record<string, any>` | Yes | Set when the user is a service account |
| `type` | `string` | Yes |  |
| `user` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Profile().load({ username: 'username' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProfileEntity` instance with the same client and
options.

#### `client()`

Return the parent `HuggingfaceHubSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SpaceEntity

```ts
const space = client.Space()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `string` | No |  |
| `cardData` | `Record<string, any>` | No |  |
| `createdAt` | `string` | No |  |
| `disabled` | `boolean` | No |  |
| `gated` | `any` | No | false, or 'auto' / 'manual' when access needs approval. |
| `host` | `string` | No |  |
| `id` | `string` | No | Repo id, namespace/name. |
| `lastModified` | `string` | No |  |
| `likes` | `number` | No |  |
| `models` | `any[]` | No |  |
| `private` | `boolean` | No |  |
| `runtime` | `Record<string, any>` | No |  |
| `sdk` | `string` | No | gradio, streamlit, docker or static. |
| `sha` | `string` | No |  |
| `siblings` | `any[]` | No |  |
| `subdomain` | `string` | No |  |
| `tags` | `any[]` | No |  |
| `trendingScore` | `number` | No |  |
| `usedStorage` | `number` | No |  |

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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Space().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Space().load({ namespace: 'namespace', repo: 'repo' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SpaceEntity` instance with the same client and
options.

#### `client()`

Return the parent `HuggingfaceHubSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TrendingEntity

```ts
const trending = client.Trending()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `recentlyTrending` | `any[]` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Trending().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TrendingEntity` instance with the same client and
options.

#### `client()`

Return the parent `HuggingfaceHubSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new HuggingfaceHubSDK({
  feature: {
    test: { active: true },
  }
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

