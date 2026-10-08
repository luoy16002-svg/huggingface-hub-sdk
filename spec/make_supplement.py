"""Write spec/supplement.json: the Hub endpoints the published OpenAPI file leaves out.

The list and info endpoints for models, datasets and Spaces are documented at
https://huggingface.co/docs/hub/api but are missing from https://huggingface.co/.well-known/openapi.json.
Field lists below were checked against live responses on 2026-10-08.
"""
import json
from pathlib import Path


def q(name, desc, typ="string", **extra):
    s = {"type": typ}
    s.update(extra)
    return {"name": name, "in": "query", "required": False, "description": desc, "schema": s}


def p(name, desc):
    return {"name": name, "in": "path", "required": True, "description": desc, "schema": {"type": "string"}}


common_list = [
    q("search", "Filter by a substring of the repo id."),
    q("author", "Filter by owner (user or organisation)."),
    q("filter", "Filter by tag, for example a library, task or language tag."),
    q("sort", "Property to sort by, for example downloads, likes, trendingScore, createdAt or lastModified."),
    q("direction", "Sort direction; -1 for descending.", "integer"),
    q("limit", "Maximum number of results.", "integer", minimum=1),
    q("full", "Return the full record for each result.", "boolean"),
]

base_props = {
    "_id": {"type": "string"},
    "id": {"type": "string", "description": "Repo id, namespace/name."},
    "author": {"type": "string"},
    "sha": {"type": "string"},
    "createdAt": {"type": "string", "format": "date-time"},
    "lastModified": {"type": "string", "format": "date-time"},
    "private": {"type": "boolean"},
    "disabled": {"type": "boolean"},
    "gated": {"description": "false, or 'auto' / 'manual' when access needs approval."},
    "likes": {"type": "integer"},
    "trendingScore": {"type": "number"},
    "tags": {"type": "array", "items": {"type": "string"}},
    "cardData": {"type": "object", "additionalProperties": True},
    "siblings": {"type": "array", "items": {"type": "object", "properties": {"rfilename": {"type": "string"}}}},
    "usedStorage": {"type": "integer"},
}


def schema(extra, desc):
    props = dict(base_props)
    props.update(extra)
    return {"type": "object", "description": desc, "properties": props, "required": ["id"]}


comps = {
    "Model": schema({
        "modelId": {"type": "string"},
        "downloads": {"type": "integer"},
        "pipeline_tag": {"type": "string"},
        "library_name": {"type": "string"},
        "config": {"type": "object", "additionalProperties": True},
        "safetensors": {"type": "object", "additionalProperties": True},
        "spaces": {"type": "array", "items": {"type": "string"}},
    }, "A model repository on the Hub."),
    "Dataset": schema({
        "description": {"type": "string"},
        "downloads": {"type": "integer"},
        "paperswithcode_id": {"type": ["string", "null"]},
    }, "A dataset repository on the Hub."),
    "Space": schema({
        "sdk": {"type": "string", "description": "gradio, streamlit, docker or static."},
        "subdomain": {"type": "string"},
        "host": {"type": "string"},
        "runtime": {"type": "object", "additionalProperties": True},
        "models": {"type": "array", "items": {"type": "string"}},
    }, "A Space (hosted app) on the Hub."),
}

paths = {}
for kind, name in [("models", "Model"), ("datasets", "Dataset"), ("spaces", "Space")]:
    ref = {"$ref": f"#/components/schemas/{name}"}
    paths[f"/api/{kind}"] = {"get": {
        "tags": [kind],
        "summary": f"List {kind}",
        "description": f"Search and list {kind} on the Hub. Documented at https://huggingface.co/docs/hub/api.",
        "parameters": common_list,
        "responses": {"200": {"description": f"Matching {kind}.",
                              "content": {"application/json": {"schema": {"type": "array", "items": ref}}}}},
    }}
    paths["/api/" + kind + "/{namespace}/{repo}"] = {"get": {
        "tags": [kind],
        "summary": f"Get {name.lower()} info",
        "description": f"Information about one {name.lower()} repository. Documented at https://huggingface.co/docs/hub/api.",
        "parameters": [p("namespace", "Owner (user or organisation)."), p("repo", "Repository name.")],
        "responses": {
            "200": {"description": f"The {name.lower()}.", "content": {"application/json": {"schema": ref}}},
            "404": {"description": "Not found, or private without access."},
        },
    }}

out = Path(__file__).parent / "supplement.json"
out.write_text(json.dumps({"paths": paths, "components": {"schemas": comps}}, indent=2) + "\n", encoding="utf-8")
print(f"{out.name}: {len(paths)} paths")
