import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "auth",
    "accessor": "Auth",
    "op": "load",
    "method": "GET",
    "path": "/api/whoami-v2",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "auth": {
        "type": "x",
        "accessToken": {
          "displayName": "x",
          "role": "read",
          "fineGrained": {
            "scoped": [
              {}
            ],
            "global": [
              "discussion.write"
            ],
            "canReadGatedRepos": true
          },
          "createdAt": "2026-01-01T00:00:00Z"
        },
        "expiresAt": "2026-01-01T00:00:00Z",
        "resource": {
          "sub": "x"
        }
      },
      "type": "x",
      "id": "x",
      "name": "x",
      "fullname": "x",
      "email": "x",
      "canPay": true,
      "billingMode": "prepaid",
      "avatarUrl": "x",
      "periodEnd": 1,
      "emailVerified": true,
      "isPro": true,
      "orgs": [
        {
          "type": "x",
          "id": "x",
          "name": "x",
          "fullname": "x",
          "email": "x",
          "canPay": true,
          "spendLimitReached": true,
          "billingMode": "prepaid",
          "avatarUrl": "x",
          "periodEnd": 1,
          "plan": "team",
          "roleInOrg": "admin",
          "securityRestrictions": [
            "mfa"
          ],
          "resourceGroups": [
            {
              "id": "x",
              "name": "x",
              "role": "admin"
            }
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "collection",
    "accessor": "Collection",
    "op": "list",
    "method": "GET",
    "path": "/api/collections",
    "args": [],
    "select": {
      "cursor": "v1",
      "expand": "v1",
      "item": "v1",
      "limit": 10,
      "owner": "v1",
      "q": "v1",
      "sort": "trending"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "item",
      "owner",
      "q",
      "sort",
      "cursor",
      "expand",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "expand",
        "wire": "expand"
      },
      {
        "name": "item",
        "wire": "item"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "owner",
        "wire": "owner"
      },
      {
        "name": "q",
        "wire": "q"
      },
      {
        "name": "sort",
        "wire": "sort"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "slug": "x",
        "title": "x",
        "description": "x",
        "lastUpdated": "2026-01-01T00:00:00Z",
        "gating": true,
        "owner": {
          "_id": "x",
          "avatarUrl": "x",
          "fullname": "x",
          "name": "x",
          "isHf": true,
          "isHfAdmin": true,
          "isMod": true,
          "followerCount": 1,
          "type": "x",
          "plan": "team",
          "isUserFollowing": true
        },
        "theme": "orange",
        "private": true,
        "upvotes": 1,
        "isUpvotedByUser": true,
        "resourceGroup": {
          "id": "x",
          "name": "x",
          "numUsers": 1
        },
        "items": [
          {
            "_id": "x",
            "note": {},
            "gallery": [],
            "position": 1,
            "author": "x",
            "id": "x",
            "isLikedByUser": true,
            "likes": 1,
            "datasetsServerInfo": {},
            "private": true,
            "repoType": "x",
            "downloads": 1,
            "lastModified": "2026-01-01T00:00:00Z",
            "resourceGroup": {},
            "isBenchmark": true,
            "isTraces": true,
            "isEnvironment": true,
            "type": "x"
          }
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "collection",
    "accessor": "Collection",
    "op": "load",
    "method": "GET",
    "path": "/api/collections/{namespace}/{slug}",
    "args": [
      {
        "name": "namespace",
        "wire": "namespace",
        "value": "p1"
      },
      {
        "name": "slug",
        "wire": "slug",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "slug": "x",
      "title": "x",
      "description": "x",
      "lastUpdated": "2026-01-01T00:00:00Z",
      "gating": true,
      "owner": {
        "_id": "x",
        "avatarUrl": "x",
        "fullname": "x",
        "name": "x",
        "isHf": true,
        "isHfAdmin": true,
        "isMod": true,
        "followerCount": 1,
        "type": "x",
        "plan": "team",
        "isUserFollowing": true
      },
      "position": 1,
      "theme": "orange",
      "private": true,
      "upvotes": 1,
      "shareUrl": "x",
      "isUpvotedByUser": true,
      "resourceGroup": {
        "id": "x",
        "name": "x",
        "numUsers": 1
      },
      "items": [
        {
          "_id": "x",
          "note": {
            "html": "x",
            "text": "x"
          },
          "gallery": [
            "x"
          ],
          "position": 1,
          "author": "x",
          "id": "x",
          "isLikedByUser": true,
          "likes": 1,
          "datasetsServerInfo": {
            "viewer": "preview",
            "numRows": 1,
            "libraries": [
              "mlcroissant"
            ],
            "formats": [
              "json"
            ],
            "modalities": [
              "3d"
            ]
          },
          "private": true,
          "repoType": "x",
          "downloads": 1,
          "gated": true,
          "lastModified": "2026-01-01T00:00:00Z",
          "resourceGroup": {
            "id": "x",
            "name": "x",
            "numUsers": 1
          },
          "isBenchmark": true,
          "isTraces": true,
          "isEnvironment": true,
          "type": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "daily_paper",
    "accessor": "DailyPaper",
    "op": "list",
    "method": "GET",
    "path": "/api/daily_papers",
    "args": [],
    "select": {
      "date": "v1",
      "limit": 50,
      "month": "v1",
      "p": 0,
      "sort": "publishedAt",
      "submitter": "v1",
      "week": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "p",
      "limit",
      "date",
      "week",
      "month",
      "submitter",
      "sort"
    ],
    "queryArgs": [
      {
        "name": "date",
        "wire": "date"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "month",
        "wire": "month"
      },
      {
        "name": "p",
        "wire": "p"
      },
      {
        "name": "sort",
        "wire": "sort"
      },
      {
        "name": "submitter",
        "wire": "submitter"
      },
      {
        "name": "week",
        "wire": "week"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "paper": {
          "id": "x",
          "authors": [
            {
              "_id": "x",
              "name": "x",
              "status": "x",
              "statusLastChangedAt": "2026-01-01T00:00:00Z",
              "user": {
                "_id": "x",
                "avatarUrl": "x",
                "fullname": "x",
                "isPro": true,
                "name": "x",
                "type": "x",
                "user": "x",
                "isHf": true,
                "isHfAdmin": true,
                "isMod": true,
                "followerCount": 1
              },
              "hidden": true
            }
          ],
          "mediaUrls": [
            "x"
          ],
          "publishedAt": "2026-01-01T00:00:00Z",
          "submittedOnDailyAt": "2026-01-01T00:00:00Z",
          "title": "x",
          "submittedOnDailyBy": {
            "_id": "x",
            "avatarUrl": "x",
            "fullname": "x",
            "isPro": true,
            "name": "x",
            "type": "x",
            "user": "x",
            "isHf": true,
            "isHfAdmin": true,
            "isMod": true,
            "followerCount": 1
          },
          "summary": "x",
          "upvotes": 1,
          "withdrawnAt": "2026-01-01T00:00:00Z",
          "discussionId": "x",
          "projectPage": "x",
          "githubRepo": "x",
          "ai_summary": "x",
          "ai_keywords": [
            "x"
          ],
          "ai_summary_model": "x",
          "githubStars": 1
        },
        "publishedAt": "2026-01-01T00:00:00Z",
        "title": "x",
        "summary": "x",
        "mediaUrls": [
          "x"
        ],
        "thumbnail": "x",
        "numComments": 1,
        "submittedBy": {
          "_id": "x",
          "avatarUrl": "x",
          "fullname": "x",
          "isPro": true,
          "name": "x",
          "type": "x",
          "user": "x",
          "isHf": true,
          "isHfAdmin": true,
          "isMod": true,
          "followerCount": 1
        },
        "isAuthorParticipating": true
      }
    ],
    "idField": "id"
  },
  {
    "entity": "dataset",
    "accessor": "Dataset",
    "op": "list",
    "method": "GET",
    "path": "/api/datasets",
    "args": [],
    "select": {
      "author": "v1",
      "direction": "v1",
      "filter": "v1",
      "full": "v1",
      "limit": "v1",
      "search": "v1",
      "sort": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "search",
      "author",
      "filter",
      "sort",
      "direction",
      "limit",
      "full"
    ],
    "queryArgs": [
      {
        "name": "author",
        "wire": "author"
      },
      {
        "name": "direction",
        "wire": "direction"
      },
      {
        "name": "filter",
        "wire": "filter"
      },
      {
        "name": "full",
        "wire": "full"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "search",
        "wire": "search"
      },
      {
        "name": "sort",
        "wire": "sort"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "_id": "x",
        "id": "x",
        "author": "x",
        "sha": "x",
        "createdAt": "2026-01-01T00:00:00Z",
        "lastModified": "2026-01-01T00:00:00Z",
        "private": true,
        "disabled": true,
        "likes": 1,
        "trendingScore": 1,
        "tags": [
          "x"
        ],
        "cardData": {},
        "siblings": [
          {
            "rfilename": "x"
          }
        ],
        "usedStorage": 1,
        "description": "x",
        "downloads": 1,
        "paperswithcode_id": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "dataset",
    "accessor": "Dataset",
    "op": "load",
    "method": "GET",
    "path": "/api/datasets/{namespace}/{repo}",
    "args": [
      {
        "name": "namespace",
        "wire": "namespace",
        "value": "p1"
      },
      {
        "name": "repo",
        "wire": "repo",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "_id": "x",
      "id": "x",
      "author": "x",
      "sha": "x",
      "createdAt": "2026-01-01T00:00:00Z",
      "lastModified": "2026-01-01T00:00:00Z",
      "private": true,
      "disabled": true,
      "likes": 1,
      "trendingScore": 1,
      "tags": [
        "x"
      ],
      "cardData": {},
      "siblings": [
        {
          "rfilename": "x"
        }
      ],
      "usedStorage": 1,
      "description": "x",
      "downloads": 1,
      "paperswithcode_id": "x"
    },
    "idField": "id"
  },
  {
    "entity": "model",
    "accessor": "Model",
    "op": "list",
    "method": "GET",
    "path": "/api/models",
    "args": [],
    "select": {
      "author": "v1",
      "direction": "v1",
      "filter": "v1",
      "full": "v1",
      "limit": "v1",
      "search": "v1",
      "sort": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "search",
      "author",
      "filter",
      "sort",
      "direction",
      "limit",
      "full"
    ],
    "queryArgs": [
      {
        "name": "author",
        "wire": "author"
      },
      {
        "name": "direction",
        "wire": "direction"
      },
      {
        "name": "filter",
        "wire": "filter"
      },
      {
        "name": "full",
        "wire": "full"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "search",
        "wire": "search"
      },
      {
        "name": "sort",
        "wire": "sort"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "_id": "x",
        "id": "x",
        "author": "x",
        "sha": "x",
        "createdAt": "2026-01-01T00:00:00Z",
        "lastModified": "2026-01-01T00:00:00Z",
        "private": true,
        "disabled": true,
        "likes": 1,
        "trendingScore": 1,
        "tags": [
          "x"
        ],
        "cardData": {},
        "siblings": [
          {
            "rfilename": "x"
          }
        ],
        "usedStorage": 1,
        "modelId": "x",
        "downloads": 1,
        "pipeline_tag": "x",
        "library_name": "x",
        "config": {},
        "safetensors": {},
        "spaces": [
          "x"
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "model",
    "accessor": "Model",
    "op": "load",
    "method": "GET",
    "path": "/api/models/{namespace}/{repo}",
    "args": [
      {
        "name": "namespace",
        "wire": "namespace",
        "value": "p1"
      },
      {
        "name": "repo",
        "wire": "repo",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "_id": "x",
      "id": "x",
      "author": "x",
      "sha": "x",
      "createdAt": "2026-01-01T00:00:00Z",
      "lastModified": "2026-01-01T00:00:00Z",
      "private": true,
      "disabled": true,
      "likes": 1,
      "trendingScore": 1,
      "tags": [
        "x"
      ],
      "cardData": {},
      "siblings": [
        {
          "rfilename": "x"
        }
      ],
      "usedStorage": 1,
      "modelId": "x",
      "downloads": 1,
      "pipeline_tag": "x",
      "library_name": "x",
      "config": {},
      "safetensors": {},
      "spaces": [
        "x"
      ]
    },
    "idField": "id"
  },
  {
    "entity": "paper",
    "accessor": "Paper",
    "op": "list",
    "method": "GET",
    "path": "/api/papers",
    "args": [],
    "select": {
      "cursor": "v1",
      "limit": 50
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "cursor",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "id": "x",
        "title": "x",
        "upvotes": 1,
        "publishedAt": "2026-01-01T00:00:00Z",
        "thumbnailUrl": "x",
        "authors": [
          {
            "_id": "x",
            "name": "x",
            "status": "x",
            "statusLastChangedAt": "2026-01-01T00:00:00Z",
            "user": {
              "_id": "x",
              "avatarUrl": "x",
              "fullname": "x",
              "isPro": true,
              "name": "x",
              "type": "x",
              "user": "x",
              "isHf": true,
              "isHfAdmin": true,
              "isMod": true,
              "followerCount": 1
            },
            "hidden": true
          }
        ],
        "summary": "x",
        "projectPage": "x",
        "githubRepo": "x",
        "ai_summary": "x",
        "organization": {
          "_id": "x",
          "name": "x",
          "fullname": "x",
          "avatar": "x"
        }
      }
    ],
    "idField": "id"
  },
  {
    "entity": "paper",
    "accessor": "Paper",
    "op": "list",
    "method": "GET",
    "path": "/api/papers/search",
    "action": "search",
    "args": [],
    "select": {
      "limit": "v1",
      "q": ""
    },
    "headers": [],
    "cookies": [],
    "query": [
      "q",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "q",
        "wire": "q"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "paper",
    "accessor": "Paper",
    "op": "load",
    "method": "GET",
    "path": "/api/papers/{paperId}",
    "args": [
      {
        "name": "id",
        "wire": "paperId",
        "value": "p1"
      }
    ],
    "select": {
      "field": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "field"
    ],
    "queryArgs": [
      {
        "name": "field",
        "wire": "field"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "authors": [
        {
          "_id": "x",
          "name": "x",
          "status": "x",
          "statusLastChangedAt": "2026-01-01T00:00:00Z",
          "user": {
            "_id": "x",
            "avatarUrl": "x",
            "fullname": "x",
            "isPro": true,
            "name": "x",
            "type": "x",
            "user": "x",
            "isHf": true,
            "isHfAdmin": true,
            "isMod": true,
            "followerCount": 1
          },
          "hidden": true
        }
      ],
      "mediaUrls": [
        "x"
      ],
      "publishedAt": "2026-01-01T00:00:00Z",
      "submittedOnDailyAt": "2026-01-01T00:00:00Z",
      "title": "x",
      "submittedOnDailyBy": {
        "_id": "x",
        "avatarUrl": "x",
        "fullname": "x",
        "isPro": true,
        "name": "x",
        "type": "x",
        "user": "x",
        "isHf": true,
        "isHfAdmin": true,
        "isMod": true,
        "followerCount": 1
      },
      "summary": "x",
      "upvotes": 1,
      "withdrawnAt": "2026-01-01T00:00:00Z",
      "discussionId": "x",
      "projectPage": "x",
      "githubRepo": "x",
      "ai_summary": "x",
      "ai_keywords": [
        "x"
      ],
      "ai_summary_model": "x",
      "githubStars": 1,
      "submissionDeadline": "2026-01-01T00:00:00Z",
      "linkedModels": [
        {
          "author": "x",
          "downloads": 1,
          "id": "x",
          "availableInferenceProviders": [
            {
              "provider": "baseten",
              "providerStatus": "live",
              "modelStatus": "live",
              "providerId": "x",
              "task": "text-classification",
              "adapterType": "x",
              "adapterWeightsPath": "x",
              "features": {
                "toolCalling": true
              },
              "isCheapestPricingOutput": true,
              "isFastestThroughput": true,
              "isModelAuthor": true,
              "tokensPerSecond": 1,
              "pricingOutput": 1,
              "freeUntil": "2026-01-01T00:00:00Z"
            }
          ],
          "isLikedByUser": true,
          "lastModified": "2026-01-01T00:00:00Z",
          "likes": 1,
          "pipeline_tag": "x",
          "private": true,
          "repoType": "x",
          "gated": true,
          "resourceGroup": {
            "id": "x",
            "name": "x",
            "numUsers": 1
          },
          "numParameters": 1,
          "authorData": {
            "_id": "x",
            "avatarUrl": "x",
            "fullname": "x",
            "name": "x",
            "isHf": true,
            "isHfAdmin": true,
            "isMod": true,
            "followerCount": 1,
            "type": "x",
            "plan": "team",
            "isUserFollowing": true
          },
          "widgetOutputUrls": [
            "x"
          ],
          "isPreRelease": true
        }
      ],
      "numTotalModels": 1,
      "linkedDatasets": [
        {
          "author": "x",
          "id": "x",
          "isLikedByUser": true,
          "likes": 1,
          "datasetsServerInfo": {
            "viewer": "preview",
            "numRows": 1,
            "libraries": [
              "mlcroissant"
            ],
            "formats": [
              "json"
            ],
            "modalities": [
              "3d"
            ]
          },
          "private": true,
          "repoType": "x",
          "downloads": 1,
          "gated": true,
          "lastModified": "2026-01-01T00:00:00Z",
          "resourceGroup": {
            "id": "x",
            "name": "x",
            "numUsers": 1
          },
          "isBenchmark": true,
          "isTraces": true,
          "isEnvironment": true
        }
      ],
      "numTotalDatasets": 1,
      "linkedSpaces": [
        {
          "id": "x",
          "emoji": "x",
          "running": true,
          "shortDescription": "x",
          "featured": true
        }
      ],
      "numTotalSpaces": 1,
      "comments": [
        {
          "id": "x",
          "createdAt": "2026-01-01T00:00:00Z",
          "author": {
            "isOwner": true,
            "isOrgMember": true,
            "isBlockedByMe": true,
            "oauthApp": {
              "imageUrl": "x",
              "imageData": {},
              "url": "x",
              "name": "x"
            },
            "_id": "x",
            "avatarUrl": "x",
            "fullname": "x",
            "name": "x",
            "isHf": true,
            "isHfAdmin": true,
            "isMod": true,
            "followerCount": 1,
            "type": "x",
            "plan": "team",
            "isUserFollowing": true
          },
          "type": "x",
          "data": {
            "edited": true,
            "hidden": true,
            "hiddenBy": "x",
            "hiddenReason": "Spam",
            "latest": {
              "raw": "x",
              "html": "x",
              "updatedAt": "2026-01-01T00:00:00Z",
              "author": {}
            },
            "numEdits": 1,
            "editors": [
              "x"
            ],
            "editorAvatarUrls": [
              "x"
            ],
            "reactions": [
              {
                "reaction": "🔥",
                "users": [],
                "count": 1
              }
            ],
            "identifiedLanguage": {
              "language": "x",
              "probability": 1
            },
            "relatedEventId": "x",
            "isReport": true,
            "parentCommentId": "x"
          }
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "profile",
    "accessor": "Profile",
    "op": "load",
    "method": "GET",
    "path": "/api/users/{username}/overview",
    "args": [
      {
        "name": "username",
        "wire": "username",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "_id": "x",
      "orgs": [
        {
          "id": "x",
          "name": "x",
          "fullname": "x",
          "avatarUrl": "x"
        }
      ],
      "avatarUrl": "x",
      "fullname": "x",
      "isPro": true,
      "user": "x",
      "numModels": 1,
      "numDatasets": 1,
      "numSpaces": 1,
      "numBuckets": 1,
      "numKernels": 1,
      "numDiscussions": 1,
      "numPapers": 1,
      "numUpvotes": 1,
      "numLikes": 1,
      "numFollowers": 1,
      "numFollowing": 1,
      "numFollowingOrgs": 1,
      "details": "x",
      "isFollowing": true,
      "reasonToFollow": "x",
      "primaryOrgAvatarUrl": "x",
      "serviceAccount": {
        "id": "x",
        "org": "x",
        "orgAvatarUrl": "x",
        "description": "x"
      },
      "type": "x",
      "createdAt": "2026-01-01T00:00:00Z",
      "hardwareItems": [
        {
          "sku": [],
          "mem": 1,
          "num": 1,
          "isPrimary": true
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "space",
    "accessor": "Space",
    "op": "list",
    "method": "GET",
    "path": "/api/spaces",
    "args": [],
    "select": {
      "author": "v1",
      "direction": "v1",
      "filter": "v1",
      "full": "v1",
      "limit": "v1",
      "search": "v1",
      "sort": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "search",
      "author",
      "filter",
      "sort",
      "direction",
      "limit",
      "full"
    ],
    "queryArgs": [
      {
        "name": "author",
        "wire": "author"
      },
      {
        "name": "direction",
        "wire": "direction"
      },
      {
        "name": "filter",
        "wire": "filter"
      },
      {
        "name": "full",
        "wire": "full"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "search",
        "wire": "search"
      },
      {
        "name": "sort",
        "wire": "sort"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "_id": "x",
        "id": "x",
        "author": "x",
        "sha": "x",
        "createdAt": "2026-01-01T00:00:00Z",
        "lastModified": "2026-01-01T00:00:00Z",
        "private": true,
        "disabled": true,
        "likes": 1,
        "trendingScore": 1,
        "tags": [
          "x"
        ],
        "cardData": {},
        "siblings": [
          {
            "rfilename": "x"
          }
        ],
        "usedStorage": 1,
        "sdk": "x",
        "subdomain": "x",
        "host": "x",
        "runtime": {},
        "models": [
          "x"
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "space",
    "accessor": "Space",
    "op": "load",
    "method": "GET",
    "path": "/api/spaces/{namespace}/{repo}",
    "args": [
      {
        "name": "namespace",
        "wire": "namespace",
        "value": "p1"
      },
      {
        "name": "repo",
        "wire": "repo",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "_id": "x",
      "id": "x",
      "author": "x",
      "sha": "x",
      "createdAt": "2026-01-01T00:00:00Z",
      "lastModified": "2026-01-01T00:00:00Z",
      "private": true,
      "disabled": true,
      "likes": 1,
      "trendingScore": 1,
      "tags": [
        "x"
      ],
      "cardData": {},
      "siblings": [
        {
          "rfilename": "x"
        }
      ],
      "usedStorage": 1,
      "sdk": "x",
      "subdomain": "x",
      "host": "x",
      "runtime": {},
      "models": [
        "x"
      ]
    },
    "idField": "id"
  },
  {
    "entity": "trending",
    "accessor": "Trending",
    "op": "list",
    "method": "GET",
    "path": "/api/trending",
    "args": [],
    "select": {
      "limit": 10,
      "type": "all"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "type",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "type",
        "wire": "type"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "recentlyTrending": [
        {
          "repoType": "x",
          "repoData": {
            "author": "x",
            "id": "x",
            "isLikedByUser": true,
            "likes": 1,
            "datasetsServerInfo": {
              "viewer": "preview",
              "numRows": 1,
              "libraries": [],
              "formats": [],
              "modalities": []
            },
            "private": true,
            "repoType": "x",
            "downloads": 1,
            "gated": true,
            "lastModified": "2026-01-01T00:00:00Z",
            "resourceGroup": {
              "id": "x",
              "name": "x",
              "numUsers": 1
            },
            "isBenchmark": true,
            "isTraces": true,
            "isEnvironment": true
          }
        }
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
