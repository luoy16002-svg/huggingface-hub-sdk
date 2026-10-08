# Hugging Face Hub API

A focused slice of the Hugging Face Hub API: models, datasets, Spaces, papers, collections and users (read operations). Cut from https://huggingface.co/.well-known/openapi.json; the model, dataset and Space list/info endpoints come from spec/supplement.json because the published file does not include them.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 9 entities and 15 HTTP routes. There are 3 SDK targets.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Auth

Results: Auth information.

SDK operations: `load`.

### Collection

Results: The collection data.

SDK operations: `list`, `load`.

Key fields to recognise:

- `description`: Free-text description of the bucket / container image
- `id`: A hex string of 24 characters representing an ObjectId.

### DailyPaper

Results: List of daily papers.

SDK operations: `list`.

Key fields to recognise:

- `paper`: Paper data with metadata
- `submittedBy`: User overview information

### Dataset

Results: Matching datasets.; The dataset.

SDK operations: `list`, `load`.

Key fields to recognise:

- `gated`: false, or &#39;auto&#39; / &#39;manual&#39; when access needs approval.
- `id`: Repo id, namespace/name.

### Model

Results: Matching models.; The model.

SDK operations: `list`, `load`.

Key fields to recognise:

- `gated`: false, or &#39;auto&#39; / &#39;manual&#39; when access needs approval.
- `id`: Repo id, namespace/name.

### Paper

Results: List of papers; Paper data.

SDK operations: `list`, `load`.

Key fields to recognise:

- `comments`: only available when field contains &#39;comments&#39;
- `id`: A hex string of 24 characters representing an ObjectId.
- `submissionDeadline`: only available when field contains &#39;submissionDeadline&#39;
- `submittedOnDailyBy`: User overview information

### Profile

Results: User overview data including their organizations, stats, and creation date.

SDK operations: `load`.

Key fields to recognise:

- `hardwareItems`: The user&#39;s hardware items, unless the user set them as private
- `id`: A hex string of 24 characters representing an ObjectId.
- `serviceAccount`: Set when the user is a service account

### Space

Results: Matching spaces.; The space.

SDK operations: `list`, `load`.

Key fields to recognise:

- `gated`: false, or &#39;auto&#39; / &#39;manual&#39; when access needs approval.
- `id`: Repo id, namespace/name.
- `sdk`: gradio, streamlit, docker or static.

### Trending

Results: Trending repos.

SDK operations: `list`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Auth | `load` | `GET /api/whoami-v2` | Required |
| Collection | `list` | `GET /api/collections` | Required |
| Collection | `load` | `GET /api/collections/{namespace}/{slug}` | Required |
| DailyPaper | `list` | `GET /api/daily_papers` | Required |
| Dataset | `list` | `GET /api/datasets` | Required |
| Dataset | `load` | `GET /api/datasets/{namespace}/{repo}` | Required |
| Model | `list` | `GET /api/models` | Required |
| Model | `load` | `GET /api/models/{namespace}/{repo}` | Required |
| Paper | `list` | `GET /api/papers` | Required |
| Paper | `list` | `GET /api/papers/search` | Required |
| Paper | `load` | `GET /api/papers/{paperId}` | Required |
| Profile | `load` | `GET /api/users/{username}/overview` | Required |
| Space | `list` | `GET /api/spaces` | Required |
| Space | `load` | `GET /api/spaces/{namespace}/{repo}` | Required |
| Trending | `list` | `GET /api/trending` | Required |

## Connect to the API

- Hub: `https://huggingface.co`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Python | `py/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `test`: In-memory mock transport for testing without a live server

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

