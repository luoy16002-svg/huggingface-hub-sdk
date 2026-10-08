// Typed models for the HuggingfaceHub SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Auth {
}

export interface AuthLoadMatch {
}

export interface Collection {
  description?: string
  gating: any
  id?: string
  isUpvotedByUser: boolean
  items: any[]
  lastUpdated: string
  owner: any
  position: number
  private: boolean
  resourceGroup: Record<string, any>
  shareUrl: string
  slug: string
  theme: string
  title: string
  upvotes: number
}

export interface CollectionLoadMatch {
  namespace: string
  slug: string
}

export interface CollectionListMatch {
  cursor?: string
  expand?: string
  item?: any
  limit?: number
  owner?: any
  q?: string
  sort?: string
}

export interface DailyPaper {
  isAuthorParticipating: boolean
  mediaUrls?: any[]
  numComments: number
  paper: Record<string, any>
  publishedAt: string
  submittedBy: Record<string, any>
  summary: string
  thumbnail: string
  title: string
}

export interface DailyPaperListMatch {
  date?: string
  limit?: number
  month?: string
  p?: number
  sort?: string
  submitter?: string
  week?: string
}

export interface Dataset {
  author?: string
  cardData?: Record<string, any>
  createdAt?: string
  description?: string
  disabled?: boolean
  downloads?: number
  gated?: any
  id?: string
  lastModified?: string
  likes?: number
  paperswithcode_id?: string | null
  private?: boolean
  sha?: string
  siblings?: any[]
  tags?: any[]
  trendingScore?: number
  usedStorage?: number
}

export interface DatasetLoadMatch {
  namespace: string
  repo: string
}

export interface DatasetListMatch {
  author?: string
  direction?: number
  filter?: string
  full?: boolean
  limit?: number
  search?: string
  sort?: string
}

export interface Model {
  author?: string
  cardData?: Record<string, any>
  config?: Record<string, any>
  createdAt?: string
  disabled?: boolean
  downloads?: number
  gated?: any
  id?: string
  lastModified?: string
  library_name?: string
  likes?: number
  modelId?: string
  pipeline_tag?: string
  private?: boolean
  safetensors?: Record<string, any>
  sha?: string
  siblings?: any[]
  spaces?: any[]
  tags?: any[]
  trendingScore?: number
  usedStorage?: number
}

export interface ModelLoadMatch {
  namespace: string
  repo: string
}

export interface ModelListMatch {
  author?: string
  direction?: number
  filter?: string
  full?: boolean
  limit?: number
  search?: string
  sort?: string
}

export interface Paper {
  ai_keywords?: any[]
  ai_summary?: string
  ai_summary_model?: string
  authors: any[]
  comments?: any[]
  discussionId: string
  githubRepo?: string
  githubStars?: number
  id: string
  linkedDatasets: any[]
  linkedModels: any[]
  linkedSpaces: any[]
  mediaUrls?: any[]
  numTotalDatasets: number
  numTotalModels: number
  numTotalSpaces: number
  organization: Record<string, any>
  projectPage?: string
  publishedAt: string
  submissionDeadline?: string
  submittedOnDailyAt?: string
  submittedOnDailyBy: Record<string, any>
  summary: string
  thumbnailUrl?: string
  title: string
  upvotes: number
  withdrawnAt?: string
}

export interface PaperLoadMatch {
  id: string
  field?: any
}

export interface PaperListMatch {
  cursor?: string
  limit?: number

  // Selects a custom action instead of the plain list:
  //   'search'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Profile {
  avatarUrl: string
  createdAt: string
  details?: string
  fullname: string
  hardwareItems?: any[]
  id: string
  isFollowing?: boolean
  isPro: boolean
  numBuckets?: number
  numDatasets?: number
  numDiscussions?: number
  numFollowers?: number
  numFollowing?: number
  numFollowingOrgs?: number
  numKernels?: number
  numLikes?: number
  numModels?: number
  numPapers?: number
  numSpaces?: number
  numUpvotes?: number
  orgs?: any[]
  primaryOrgAvatarUrl?: string
  reasonToFollow?: string
  serviceAccount: Record<string, any>
  type: string
  user: string
}

export interface ProfileLoadMatch {
  username: string
}

export interface Space {
  author?: string
  cardData?: Record<string, any>
  createdAt?: string
  disabled?: boolean
  gated?: any
  host?: string
  id?: string
  lastModified?: string
  likes?: number
  models?: any[]
  private?: boolean
  runtime?: Record<string, any>
  sdk?: string
  sha?: string
  siblings?: any[]
  subdomain?: string
  tags?: any[]
  trendingScore?: number
  usedStorage?: number
}

export interface SpaceLoadMatch {
  namespace: string
  repo: string
}

export interface SpaceListMatch {
  author?: string
  direction?: number
  filter?: string
  full?: boolean
  limit?: number
  search?: string
  sort?: string
}

export interface Trending {
  recentlyTrending: any[]
}

export interface TrendingListMatch {
  limit?: number
  type?: string
}

