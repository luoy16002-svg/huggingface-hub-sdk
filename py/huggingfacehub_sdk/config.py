# HuggingfaceHub SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "HuggingfaceHub",
            "slug": "huggingface-hub",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
        },
        "options": {
            "base": "https://huggingface.co",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "auth": {},
                "collection": {},
                "daily_paper": {},
                "dataset": {},
                "model": {},
                "paper": {},
                "profile": {},
                "space": {},
                "trending": {},
            },
        },
        "entity": {
      "auth": {
        "fields": [],
        "name": "auth",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/whoami-v2",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "whoami-v2",
                  },
                ],
                "parts": [
                  "api",
                  "whoami-v2",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "collection": {
        "fields": [
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
          },
          {
            "name": "gating",
            "title": "Gating",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "isUpvotedByUser",
            "title": "Is Upvoted By User",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "items",
            "title": "Items",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "lastUpdated",
            "title": "Last Updated",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "owner",
            "title": "Owner",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "position",
            "title": "Position",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "private",
            "title": "Private",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "resourceGroup",
            "title": "Resource Group",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "shareUrl",
            "title": "Share Url",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "slug",
            "title": "Slug",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "theme",
            "title": "Theme",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "upvotes",
            "title": "Upvotes",
            "type": "`$NUMBER`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "slug": "slug",
          },
          "name": "id",
          "parts": [
            "namespace",
            "slug",
          ],
          "sep": "/",
        },
        "name": "collection",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/collections",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "collections",
                  },
                ],
                "parts": [
                  "api",
                  "collections",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "expand",
                      "orig": "expand",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "item",
                      "orig": "item",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 10,
                    },
                    {
                      "name": "owner",
                      "orig": "owner",
                      "type": "`$ANY`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "trending",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/collections/{namespace}/{slug}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "collections",
                  },
                  {
                    "var": "namespace",
                  },
                  {
                    "var": "slug",
                  },
                ],
                "parts": [
                  "api",
                  "collections",
                  "{namespace}",
                  "{slug}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "namespace",
                      "orig": "namespace",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "slug",
                      "orig": "slug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "namespace",
                    "slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "daily_paper": {
        "fields": [
          {
            "name": "isAuthorParticipating",
            "title": "Is Author Participating",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "mediaUrls",
            "title": "Media Urls",
            "type": "`$ARRAY`",
          },
          {
            "name": "numComments",
            "title": "Num Comments",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "paper",
            "title": "Paper",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Paper data with metadata",
          },
          {
            "name": "publishedAt",
            "title": "Published At",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "submittedBy",
            "title": "Submitted By",
            "type": "`$OBJECT`",
            "req": True,
            "short": "User overview information",
          },
          {
            "name": "summary",
            "title": "Summary",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "thumbnail",
            "title": "Thumbnail",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "daily_paper",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/daily_papers",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "daily_papers",
                  },
                ],
                "parts": [
                  "api",
                  "daily_papers",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "date",
                      "orig": "date",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 50,
                    },
                    {
                      "name": "month",
                      "orig": "month",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "p",
                      "orig": "p",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "publishedAt",
                    },
                    {
                      "name": "submitter",
                      "orig": "submitter",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "week",
                      "orig": "week",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "dataset": {
        "fields": [
          {
            "name": "author",
            "title": "Author",
            "type": "`$STRING`",
          },
          {
            "name": "cardData",
            "title": "Card Data",
            "type": "`$OBJECT`",
          },
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
          },
          {
            "name": "disabled",
            "title": "Disabled",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "downloads",
            "title": "Downloads",
            "type": "`$INTEGER`",
          },
          {
            "name": "gated",
            "title": "Gated",
            "type": "`$ANY`",
            "short": "false, or 'auto' / 'manual' when access needs approval.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "op": {
              "list": {
                "req": True,
                "type": "`$STRING`",
              },
              "load": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Repo id, namespace/name.",
          },
          {
            "name": "lastModified",
            "title": "Last Modified",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "likes",
            "title": "Likes",
            "type": "`$INTEGER`",
          },
          {
            "name": "paperswithcode_id",
            "title": "Paperswithcode Id",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
          },
          {
            "name": "private",
            "title": "Private",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "sha",
            "title": "Sha",
            "type": "`$STRING`",
          },
          {
            "name": "siblings",
            "title": "Siblings",
            "type": "`$ARRAY`",
          },
          {
            "name": "tags",
            "title": "Tags",
            "type": "`$ARRAY`",
          },
          {
            "name": "trendingScore",
            "title": "Trending Score",
            "type": "`$NUMBER`",
          },
          {
            "name": "usedStorage",
            "title": "Used Storage",
            "type": "`$INTEGER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
          "parts": [
            "namespace",
            "repo",
          ],
          "sep": "/",
        },
        "name": "dataset",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/datasets",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "datasets",
                  },
                ],
                "parts": [
                  "api",
                  "datasets",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "author",
                      "orig": "author",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "direction",
                      "orig": "direction",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "filter",
                      "orig": "filter",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "full",
                      "orig": "full",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/datasets/{namespace}/{repo}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "datasets",
                  },
                  {
                    "var": "namespace",
                  },
                  {
                    "var": "repo",
                  },
                ],
                "parts": [
                  "api",
                  "datasets",
                  "{namespace}",
                  "{repo}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "namespace",
                      "orig": "namespace",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "repo",
                      "orig": "repo",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "namespace",
                    "repo",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "model": {
        "fields": [
          {
            "name": "author",
            "title": "Author",
            "type": "`$STRING`",
          },
          {
            "name": "cardData",
            "title": "Card Data",
            "type": "`$OBJECT`",
          },
          {
            "name": "config",
            "title": "Config",
            "type": "`$OBJECT`",
          },
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "disabled",
            "title": "Disabled",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "downloads",
            "title": "Downloads",
            "type": "`$INTEGER`",
          },
          {
            "name": "gated",
            "title": "Gated",
            "type": "`$ANY`",
            "short": "false, or 'auto' / 'manual' when access needs approval.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "op": {
              "list": {
                "req": True,
                "type": "`$STRING`",
              },
              "load": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Repo id, namespace/name.",
          },
          {
            "name": "lastModified",
            "title": "Last Modified",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "library_name",
            "title": "Library Name",
            "type": "`$STRING`",
          },
          {
            "name": "likes",
            "title": "Likes",
            "type": "`$INTEGER`",
          },
          {
            "name": "modelId",
            "title": "Model Id",
            "type": "`$STRING`",
          },
          {
            "name": "pipeline_tag",
            "title": "Pipeline Tag",
            "type": "`$STRING`",
          },
          {
            "name": "private",
            "title": "Private",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "safetensors",
            "title": "Safetensors",
            "type": "`$OBJECT`",
          },
          {
            "name": "sha",
            "title": "Sha",
            "type": "`$STRING`",
          },
          {
            "name": "siblings",
            "title": "Siblings",
            "type": "`$ARRAY`",
          },
          {
            "name": "spaces",
            "title": "Spaces",
            "type": "`$ARRAY`",
          },
          {
            "name": "tags",
            "title": "Tags",
            "type": "`$ARRAY`",
          },
          {
            "name": "trendingScore",
            "title": "Trending Score",
            "type": "`$NUMBER`",
          },
          {
            "name": "usedStorage",
            "title": "Used Storage",
            "type": "`$INTEGER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
          "parts": [
            "namespace",
            "repo",
          ],
          "sep": "/",
        },
        "name": "model",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/models",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "models",
                  },
                ],
                "parts": [
                  "api",
                  "models",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "author",
                      "orig": "author",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "direction",
                      "orig": "direction",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "filter",
                      "orig": "filter",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "full",
                      "orig": "full",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/models/{namespace}/{repo}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "models",
                  },
                  {
                    "var": "namespace",
                  },
                  {
                    "var": "repo",
                  },
                ],
                "parts": [
                  "api",
                  "models",
                  "{namespace}",
                  "{repo}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "namespace",
                      "orig": "namespace",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "repo",
                      "orig": "repo",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "namespace",
                    "repo",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "paper": {
        "fields": [
          {
            "name": "ai_keywords",
            "title": "Ai Keywords",
            "type": "`$ARRAY`",
          },
          {
            "name": "ai_summary",
            "title": "Ai Summary",
            "type": "`$STRING`",
          },
          {
            "name": "ai_summary_model",
            "title": "Ai Summary Model",
            "type": "`$STRING`",
          },
          {
            "name": "authors",
            "title": "Authors",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "comments",
            "title": "Comments",
            "type": "`$ARRAY`",
            "short": "only available when field contains 'comments'",
          },
          {
            "name": "discussionId",
            "title": "Discussion Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "githubRepo",
            "title": "Github Repo",
            "type": "`$STRING`",
          },
          {
            "name": "githubStars",
            "title": "Github Stars",
            "type": "`$NUMBER`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "linkedDatasets",
            "title": "Linked Datasets",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "linkedModels",
            "title": "Linked Models",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "linkedSpaces",
            "title": "Linked Spaces",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "mediaUrls",
            "title": "Media Urls",
            "type": "`$ARRAY`",
          },
          {
            "name": "numTotalDatasets",
            "title": "Num Total Datasets",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "numTotalModels",
            "title": "Num Total Models",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "numTotalSpaces",
            "title": "Num Total Spaces",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "organization",
            "title": "Organization",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "projectPage",
            "title": "Project Page",
            "type": "`$STRING`",
          },
          {
            "name": "publishedAt",
            "title": "Published At",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "submissionDeadline",
            "title": "Submission Deadline",
            "type": "`$STRING`",
            "short": "only available when field contains 'submissionDeadline'",
            "format": "date-time",
          },
          {
            "name": "submittedOnDailyAt",
            "title": "Submitted On Daily At",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "submittedOnDailyBy",
            "title": "Submitted On Daily By",
            "type": "`$OBJECT`",
            "req": True,
            "short": "User overview information",
          },
          {
            "name": "summary",
            "title": "Summary",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "thumbnailUrl",
            "title": "Thumbnail Url",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "upvotes",
            "title": "Upvotes",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "withdrawnAt",
            "title": "Withdrawn At",
            "type": "`$STRING`",
            "format": "date-time",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "paper",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/papers",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "papers",
                  },
                ],
                "parts": [
                  "api",
                  "papers",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 50,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/papers/search",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "papers",
                  },
                  {
                    "lit": "search",
                  },
                ],
                "parts": [
                  "api",
                  "papers",
                  "search",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "",
                    },
                  ],
                },
                "select": {
                  "$action": "search",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/papers/{paperId}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "papers",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "api",
                  "papers",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "paperId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "paperId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "field",
                      "orig": "field",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "profile": {
        "fields": [
          {
            "name": "avatarUrl",
            "title": "Avatar Url",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "details",
            "title": "Details",
            "type": "`$STRING`",
          },
          {
            "name": "fullname",
            "title": "Fullname",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "hardwareItems",
            "title": "Hardware Items",
            "type": "`$ARRAY`",
            "short": "The user's hardware items, unless the user set them as private",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "A hex string of 24 characters representing an ObjectId.",
          },
          {
            "name": "isFollowing",
            "title": "Is Following",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "isPro",
            "title": "Is Pro",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "numBuckets",
            "title": "Num Buckets",
            "type": "`$NUMBER`",
          },
          {
            "name": "numDatasets",
            "title": "Num Datasets",
            "type": "`$NUMBER`",
          },
          {
            "name": "numDiscussions",
            "title": "Num Discussions",
            "type": "`$NUMBER`",
          },
          {
            "name": "numFollowers",
            "title": "Num Followers",
            "type": "`$NUMBER`",
          },
          {
            "name": "numFollowing",
            "title": "Num Following",
            "type": "`$NUMBER`",
          },
          {
            "name": "numFollowingOrgs",
            "title": "Num Following Orgs",
            "type": "`$NUMBER`",
          },
          {
            "name": "numKernels",
            "title": "Num Kernels",
            "type": "`$NUMBER`",
          },
          {
            "name": "numLikes",
            "title": "Num Likes",
            "type": "`$NUMBER`",
          },
          {
            "name": "numModels",
            "title": "Num Models",
            "type": "`$NUMBER`",
          },
          {
            "name": "numPapers",
            "title": "Num Papers",
            "type": "`$NUMBER`",
          },
          {
            "name": "numSpaces",
            "title": "Num Spaces",
            "type": "`$NUMBER`",
          },
          {
            "name": "numUpvotes",
            "title": "Num Upvotes",
            "type": "`$NUMBER`",
          },
          {
            "name": "orgs",
            "title": "Orgs",
            "type": "`$ARRAY`",
          },
          {
            "name": "primaryOrgAvatarUrl",
            "title": "Primary Org Avatar Url",
            "type": "`$STRING`",
          },
          {
            "name": "reasonToFollow",
            "title": "Reason To Follow",
            "type": "`$STRING`",
          },
          {
            "name": "serviceAccount",
            "title": "Service Account",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Set when the user is a service account",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "user",
            "title": "User",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "profile",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/users/{username}/overview",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "users",
                  },
                  {
                    "var": "username",
                  },
                  {
                    "lit": "overview",
                  },
                ],
                "parts": [
                  "api",
                  "users",
                  "{username}",
                  "overview",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "username",
                      "orig": "username",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "username",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "space": {
        "fields": [
          {
            "name": "author",
            "title": "Author",
            "type": "`$STRING`",
          },
          {
            "name": "cardData",
            "title": "Card Data",
            "type": "`$OBJECT`",
          },
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "disabled",
            "title": "Disabled",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "gated",
            "title": "Gated",
            "type": "`$ANY`",
            "short": "false, or 'auto' / 'manual' when access needs approval.",
          },
          {
            "name": "host",
            "title": "Host",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "op": {
              "list": {
                "req": True,
                "type": "`$STRING`",
              },
              "load": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Repo id, namespace/name.",
          },
          {
            "name": "lastModified",
            "title": "Last Modified",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "likes",
            "title": "Likes",
            "type": "`$INTEGER`",
          },
          {
            "name": "models",
            "title": "Models",
            "type": "`$ARRAY`",
          },
          {
            "name": "private",
            "title": "Private",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "runtime",
            "title": "Runtime",
            "type": "`$OBJECT`",
          },
          {
            "name": "sdk",
            "title": "Sdk",
            "type": "`$STRING`",
            "short": "gradio, streamlit, docker or static.",
          },
          {
            "name": "sha",
            "title": "Sha",
            "type": "`$STRING`",
          },
          {
            "name": "siblings",
            "title": "Siblings",
            "type": "`$ARRAY`",
          },
          {
            "name": "subdomain",
            "title": "Subdomain",
            "type": "`$STRING`",
          },
          {
            "name": "tags",
            "title": "Tags",
            "type": "`$ARRAY`",
          },
          {
            "name": "trendingScore",
            "title": "Trending Score",
            "type": "`$NUMBER`",
          },
          {
            "name": "usedStorage",
            "title": "Used Storage",
            "type": "`$INTEGER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
          "parts": [
            "namespace",
            "repo",
          ],
          "sep": "/",
        },
        "name": "space",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/spaces",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "spaces",
                  },
                ],
                "parts": [
                  "api",
                  "spaces",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "author",
                      "orig": "author",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "direction",
                      "orig": "direction",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "filter",
                      "orig": "filter",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "full",
                      "orig": "full",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/spaces/{namespace}/{repo}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "spaces",
                  },
                  {
                    "var": "namespace",
                  },
                  {
                    "var": "repo",
                  },
                ],
                "parts": [
                  "api",
                  "spaces",
                  "{namespace}",
                  "{repo}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "namespace",
                      "orig": "namespace",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "repo",
                      "orig": "repo",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "namespace",
                    "repo",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "trending": {
        "fields": [
          {
            "name": "recentlyTrending",
            "title": "Recently Trending",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "name": "trending",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/trending",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "trending",
                  },
                ],
                "parts": [
                  "api",
                  "trending",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.recentlyTrending`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 10,
                    },
                    {
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "all",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
