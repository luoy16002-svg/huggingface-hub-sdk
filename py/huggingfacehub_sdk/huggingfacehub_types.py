# Typed models for the HuggingfaceHub SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Auth(TypedDict):
    pass


class AuthLoadMatch(TypedDict):
    pass


class CollectionRequired(TypedDict):
    gating: Any
    isUpvotedByUser: bool
    items: list
    lastUpdated: str
    owner: Any
    position: float
    private: bool
    resourceGroup: dict
    shareUrl: str
    slug: str
    theme: str
    title: str
    upvotes: float


class Collection(CollectionRequired, total=False):
    description: str
    id: str


class CollectionLoadMatch(TypedDict):
    namespace: str
    slug: str


class CollectionListMatch(TypedDict, total=False):
    cursor: str
    expand: str
    item: Any
    limit: float
    owner: Any
    q: str
    sort: str


class DailyPaperRequired(TypedDict):
    isAuthorParticipating: bool
    numComments: float
    paper: dict
    publishedAt: str
    submittedBy: dict
    summary: str
    thumbnail: str
    title: str


class DailyPaper(DailyPaperRequired, total=False):
    mediaUrls: list


class DailyPaperListMatch(TypedDict, total=False):
    date: str
    limit: int
    month: str
    p: int
    sort: str
    submitter: str
    week: str


class Dataset(TypedDict, total=False):
    author: str
    cardData: dict
    createdAt: str
    description: str
    disabled: bool
    downloads: int
    gated: Any
    id: str
    lastModified: str
    likes: int
    paperswithcode_id: str | None
    private: bool
    sha: str
    siblings: list
    tags: list
    trendingScore: float
    usedStorage: int


class DatasetLoadMatch(TypedDict):
    namespace: str
    repo: str


class DatasetListMatch(TypedDict, total=False):
    author: str
    direction: int
    filter: str
    full: bool
    limit: int
    search: str
    sort: str


class Model(TypedDict, total=False):
    author: str
    cardData: dict
    config: dict
    createdAt: str
    disabled: bool
    downloads: int
    gated: Any
    id: str
    lastModified: str
    library_name: str
    likes: int
    modelId: str
    pipeline_tag: str
    private: bool
    safetensors: dict
    sha: str
    siblings: list
    spaces: list
    tags: list
    trendingScore: float
    usedStorage: int


class ModelLoadMatch(TypedDict):
    namespace: str
    repo: str


class ModelListMatch(TypedDict, total=False):
    author: str
    direction: int
    filter: str
    full: bool
    limit: int
    search: str
    sort: str


class PaperRequired(TypedDict):
    authors: list
    discussionId: str
    id: str
    linkedDatasets: list
    linkedModels: list
    linkedSpaces: list
    numTotalDatasets: float
    numTotalModels: float
    numTotalSpaces: float
    organization: dict
    publishedAt: str
    submittedOnDailyBy: dict
    summary: str
    title: str
    upvotes: float


class Paper(PaperRequired, total=False):
    ai_keywords: list
    ai_summary: str
    ai_summary_model: str
    comments: list
    githubRepo: str
    githubStars: float
    mediaUrls: list
    projectPage: str
    submissionDeadline: str
    submittedOnDailyAt: str
    thumbnailUrl: str
    withdrawnAt: str


class PaperLoadMatchRequired(TypedDict):
    id: str


class PaperLoadMatch(PaperLoadMatchRequired, total=False):
    field: Any


class PaperListMatch(TypedDict, total=False):
    cursor: str
    limit: int


class ProfileRequired(TypedDict):
    avatarUrl: str
    createdAt: str
    fullname: str
    id: str
    isPro: bool
    serviceAccount: dict
    type: str
    user: str


class Profile(ProfileRequired, total=False):
    details: str
    hardwareItems: list
    isFollowing: bool
    numBuckets: float
    numDatasets: float
    numDiscussions: float
    numFollowers: float
    numFollowing: float
    numFollowingOrgs: float
    numKernels: float
    numLikes: float
    numModels: float
    numPapers: float
    numSpaces: float
    numUpvotes: float
    orgs: list
    primaryOrgAvatarUrl: str
    reasonToFollow: str


class ProfileLoadMatch(TypedDict):
    username: str


class Space(TypedDict, total=False):
    author: str
    cardData: dict
    createdAt: str
    disabled: bool
    gated: Any
    host: str
    id: str
    lastModified: str
    likes: int
    models: list
    private: bool
    runtime: dict
    sdk: str
    sha: str
    siblings: list
    subdomain: str
    tags: list
    trendingScore: float
    usedStorage: int


class SpaceLoadMatch(TypedDict):
    namespace: str
    repo: str


class SpaceListMatch(TypedDict, total=False):
    author: str
    direction: int
    filter: str
    full: bool
    limit: int
    search: str
    sort: str


class Trending(TypedDict):
    recentlyTrending: list


class TrendingListMatch(TypedDict, total=False):
    limit: int
    type: str
