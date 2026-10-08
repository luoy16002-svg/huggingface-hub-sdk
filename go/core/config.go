package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "HuggingfaceHub",
			"slug": "huggingface-hub",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://huggingface.co",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"auth": map[string]any{},
				"collection": map[string]any{},
				"daily_paper": map[string]any{},
				"dataset": map[string]any{},
				"model": map[string]any{},
				"paper": map[string]any{},
				"profile": map[string]any{},
				"space": map[string]any{},
				"trending": map[string]any{},
			},
		},
		"entity": map[string]any{
			"auth": map[string]any{
				"fields": []any{},
				"name": "auth",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/whoami-v2",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "whoami-v2",
									},
								},
								"parts": []any{
									"api",
									"whoami-v2",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"collection": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "gating",
						"title": "Gating",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isUpvotedByUser",
						"title": "Is Upvoted By User",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "items",
						"title": "Items",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "lastUpdated",
						"title": "Last Updated",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "owner",
						"title": "Owner",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "position",
						"title": "Position",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "private",
						"title": "Private",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "resourceGroup",
						"title": "Resource Group",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "shareUrl",
						"title": "Share Url",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "theme",
						"title": "Theme",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "upvotes",
						"title": "Upvotes",
						"type": "`$NUMBER`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"slug": "slug",
					},
					"name": "id",
					"parts": []any{
						"namespace",
						"slug",
					},
					"sep": "/",
				},
				"name": "collection",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/collections",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "collections",
									},
								},
								"parts": []any{
									"api",
									"collections",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "expand",
											"orig": "expand",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "item",
											"orig": "item",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$NUMBER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "owner",
											"orig": "owner",
											"type": "`$ANY`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
											"example": "trending",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/collections/{namespace}/{slug}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "collections",
									},
									map[string]any{
										"var": "namespace",
									},
									map[string]any{
										"var": "slug",
									},
								},
								"parts": []any{
									"api",
									"collections",
									"{namespace}",
									"{slug}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "namespace",
											"orig": "namespace",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "slug",
											"orig": "slug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"namespace",
										"slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"daily_paper": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "isAuthorParticipating",
						"title": "Is Author Participating",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "mediaUrls",
						"title": "Media Urls",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "numComments",
						"title": "Num Comments",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "paper",
						"title": "Paper",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Paper data with metadata",
					},
					map[string]any{
						"name": "publishedAt",
						"title": "Published At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "submittedBy",
						"title": "Submitted By",
						"type": "`$OBJECT`",
						"req": true,
						"short": "User overview information",
					},
					map[string]any{
						"name": "summary",
						"title": "Summary",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "thumbnail",
						"title": "Thumbnail",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "daily_paper",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/daily_papers",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "daily_papers",
									},
								},
								"parts": []any{
									"api",
									"daily_papers",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "month",
											"orig": "month",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
											"example": "publishedAt",
										},
										map[string]any{
											"name": "submitter",
											"orig": "submitter",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "week",
											"orig": "week",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"dataset": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "author",
						"title": "Author",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cardData",
						"title": "Card Data",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "disabled",
						"title": "Disabled",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "downloads",
						"title": "Downloads",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "gated",
						"title": "Gated",
						"type": "`$ANY`",
						"short": "false, or 'auto' / 'manual' when access needs approval.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"op": map[string]any{
							"list": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
							"load": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "Repo id, namespace/name.",
					},
					map[string]any{
						"name": "lastModified",
						"title": "Last Modified",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "likes",
						"title": "Likes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "paperswithcode_id",
						"title": "Paperswithcode Id",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "private",
						"title": "Private",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "sha",
						"title": "Sha",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "siblings",
						"title": "Siblings",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "tags",
						"title": "Tags",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "trendingScore",
						"title": "Trending Score",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "usedStorage",
						"title": "Used Storage",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
					"parts": []any{
						"namespace",
						"repo",
					},
					"sep": "/",
				},
				"name": "dataset",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/datasets",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "datasets",
									},
								},
								"parts": []any{
									"api",
									"datasets",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "author",
											"orig": "author",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "direction",
											"orig": "direction",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter",
											"orig": "filter",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "full",
											"orig": "full",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/datasets/{namespace}/{repo}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "datasets",
									},
									map[string]any{
										"var": "namespace",
									},
									map[string]any{
										"var": "repo",
									},
								},
								"parts": []any{
									"api",
									"datasets",
									"{namespace}",
									"{repo}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "namespace",
											"orig": "namespace",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "repo",
											"orig": "repo",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"namespace",
										"repo",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"model": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "author",
						"title": "Author",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cardData",
						"title": "Card Data",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "config",
						"title": "Config",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "disabled",
						"title": "Disabled",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "downloads",
						"title": "Downloads",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "gated",
						"title": "Gated",
						"type": "`$ANY`",
						"short": "false, or 'auto' / 'manual' when access needs approval.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"op": map[string]any{
							"list": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
							"load": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "Repo id, namespace/name.",
					},
					map[string]any{
						"name": "lastModified",
						"title": "Last Modified",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "library_name",
						"title": "Library Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "likes",
						"title": "Likes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "modelId",
						"title": "Model Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pipeline_tag",
						"title": "Pipeline Tag",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "private",
						"title": "Private",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "safetensors",
						"title": "Safetensors",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "sha",
						"title": "Sha",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "siblings",
						"title": "Siblings",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "spaces",
						"title": "Spaces",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "tags",
						"title": "Tags",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "trendingScore",
						"title": "Trending Score",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "usedStorage",
						"title": "Used Storage",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
					"parts": []any{
						"namespace",
						"repo",
					},
					"sep": "/",
				},
				"name": "model",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/models",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "models",
									},
								},
								"parts": []any{
									"api",
									"models",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "author",
											"orig": "author",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "direction",
											"orig": "direction",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter",
											"orig": "filter",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "full",
											"orig": "full",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/models/{namespace}/{repo}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "models",
									},
									map[string]any{
										"var": "namespace",
									},
									map[string]any{
										"var": "repo",
									},
								},
								"parts": []any{
									"api",
									"models",
									"{namespace}",
									"{repo}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "namespace",
											"orig": "namespace",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "repo",
											"orig": "repo",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"namespace",
										"repo",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"paper": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ai_keywords",
						"title": "Ai Keywords",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "ai_summary",
						"title": "Ai Summary",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ai_summary_model",
						"title": "Ai Summary Model",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "authors",
						"title": "Authors",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "comments",
						"title": "Comments",
						"type": "`$ARRAY`",
						"short": "only available when field contains 'comments'",
					},
					map[string]any{
						"name": "discussionId",
						"title": "Discussion Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "githubRepo",
						"title": "Github Repo",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "githubStars",
						"title": "Github Stars",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "linkedDatasets",
						"title": "Linked Datasets",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "linkedModels",
						"title": "Linked Models",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "linkedSpaces",
						"title": "Linked Spaces",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "mediaUrls",
						"title": "Media Urls",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "numTotalDatasets",
						"title": "Num Total Datasets",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "numTotalModels",
						"title": "Num Total Models",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "numTotalSpaces",
						"title": "Num Total Spaces",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "organization",
						"title": "Organization",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "projectPage",
						"title": "Project Page",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "publishedAt",
						"title": "Published At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "submissionDeadline",
						"title": "Submission Deadline",
						"type": "`$STRING`",
						"short": "only available when field contains 'submissionDeadline'",
						"format": "date-time",
					},
					map[string]any{
						"name": "submittedOnDailyAt",
						"title": "Submitted On Daily At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "submittedOnDailyBy",
						"title": "Submitted On Daily By",
						"type": "`$OBJECT`",
						"req": true,
						"short": "User overview information",
					},
					map[string]any{
						"name": "summary",
						"title": "Summary",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "thumbnailUrl",
						"title": "Thumbnail Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "upvotes",
						"title": "Upvotes",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "withdrawnAt",
						"title": "Withdrawn At",
						"type": "`$STRING`",
						"format": "date-time",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "paper",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/papers",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "papers",
									},
								},
								"parts": []any{
									"api",
									"papers",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/papers/search",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "papers",
									},
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"api",
									"papers",
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"example": "",
										},
									},
								},
								"select": map[string]any{
									"$action": "search",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/papers/{paperId}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "papers",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"papers",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"paperId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "paperId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"profile": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "avatarUrl",
						"title": "Avatar Url",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "details",
						"title": "Details",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fullname",
						"title": "Fullname",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "hardwareItems",
						"title": "Hardware Items",
						"type": "`$ARRAY`",
						"short": "The user's hardware items, unless the user set them as private",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "A hex string of 24 characters representing an ObjectId.",
					},
					map[string]any{
						"name": "isFollowing",
						"title": "Is Following",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "isPro",
						"title": "Is Pro",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "numBuckets",
						"title": "Num Buckets",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "numDatasets",
						"title": "Num Datasets",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "numDiscussions",
						"title": "Num Discussions",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "numFollowers",
						"title": "Num Followers",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "numFollowing",
						"title": "Num Following",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "numFollowingOrgs",
						"title": "Num Following Orgs",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "numKernels",
						"title": "Num Kernels",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "numLikes",
						"title": "Num Likes",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "numModels",
						"title": "Num Models",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "numPapers",
						"title": "Num Papers",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "numSpaces",
						"title": "Num Spaces",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "numUpvotes",
						"title": "Num Upvotes",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "orgs",
						"title": "Orgs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "primaryOrgAvatarUrl",
						"title": "Primary Org Avatar Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reasonToFollow",
						"title": "Reason To Follow",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "serviceAccount",
						"title": "Service Account",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Set when the user is a service account",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "user",
						"title": "User",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "profile",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/users/{username}/overview",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "username",
									},
									map[string]any{
										"lit": "overview",
									},
								},
								"parts": []any{
									"api",
									"users",
									"{username}",
									"overview",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "username",
											"orig": "username",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"username",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"space": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "author",
						"title": "Author",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cardData",
						"title": "Card Data",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "disabled",
						"title": "Disabled",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "gated",
						"title": "Gated",
						"type": "`$ANY`",
						"short": "false, or 'auto' / 'manual' when access needs approval.",
					},
					map[string]any{
						"name": "host",
						"title": "Host",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"op": map[string]any{
							"list": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
							"load": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "Repo id, namespace/name.",
					},
					map[string]any{
						"name": "lastModified",
						"title": "Last Modified",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "likes",
						"title": "Likes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "models",
						"title": "Models",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "private",
						"title": "Private",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "runtime",
						"title": "Runtime",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "sdk",
						"title": "Sdk",
						"type": "`$STRING`",
						"short": "gradio, streamlit, docker or static.",
					},
					map[string]any{
						"name": "sha",
						"title": "Sha",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "siblings",
						"title": "Siblings",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "subdomain",
						"title": "Subdomain",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tags",
						"title": "Tags",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "trendingScore",
						"title": "Trending Score",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "usedStorage",
						"title": "Used Storage",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
					"parts": []any{
						"namespace",
						"repo",
					},
					"sep": "/",
				},
				"name": "space",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/spaces",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "spaces",
									},
								},
								"parts": []any{
									"api",
									"spaces",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "author",
											"orig": "author",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "direction",
											"orig": "direction",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter",
											"orig": "filter",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "full",
											"orig": "full",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/spaces/{namespace}/{repo}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "spaces",
									},
									map[string]any{
										"var": "namespace",
									},
									map[string]any{
										"var": "repo",
									},
								},
								"parts": []any{
									"api",
									"spaces",
									"{namespace}",
									"{repo}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "namespace",
											"orig": "namespace",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "repo",
											"orig": "repo",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"namespace",
										"repo",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"trending": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "recentlyTrending",
						"title": "Recently Trending",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"name": "trending",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/trending",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "trending",
									},
								},
								"parts": []any{
									"api",
									"trending",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.recentlyTrending`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "all",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
