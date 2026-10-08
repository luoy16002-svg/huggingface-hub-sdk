package voxgighuggingfacehubsdk

import (
	"github.com/luoy16002-svg/huggingface-hub-sdk/go/core"
	"github.com/luoy16002-svg/huggingface-hub-sdk/go/entity"
	"github.com/luoy16002-svg/huggingface-hub-sdk/go/feature"
	_ "github.com/luoy16002-svg/huggingface-hub-sdk/go/utility"
)

// Type aliases preserve external API.
type HuggingfaceHubSDK = core.HuggingfaceHubSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type HuggingfaceHubEntity = core.HuggingfaceHubEntity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type HuggingfaceHubError = core.HuggingfaceHubError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAuthEntityFunc = func(client *core.HuggingfaceHubSDK, entopts map[string]any) core.HuggingfaceHubEntity {
		return entity.NewAuthEntity(client, entopts)
	}
	core.NewCollectionEntityFunc = func(client *core.HuggingfaceHubSDK, entopts map[string]any) core.HuggingfaceHubEntity {
		return entity.NewCollectionEntity(client, entopts)
	}
	core.NewDailyPaperEntityFunc = func(client *core.HuggingfaceHubSDK, entopts map[string]any) core.HuggingfaceHubEntity {
		return entity.NewDailyPaperEntity(client, entopts)
	}
	core.NewDatasetEntityFunc = func(client *core.HuggingfaceHubSDK, entopts map[string]any) core.HuggingfaceHubEntity {
		return entity.NewDatasetEntity(client, entopts)
	}
	core.NewModelEntityFunc = func(client *core.HuggingfaceHubSDK, entopts map[string]any) core.HuggingfaceHubEntity {
		return entity.NewModelEntity(client, entopts)
	}
	core.NewPaperEntityFunc = func(client *core.HuggingfaceHubSDK, entopts map[string]any) core.HuggingfaceHubEntity {
		return entity.NewPaperEntity(client, entopts)
	}
	core.NewProfileEntityFunc = func(client *core.HuggingfaceHubSDK, entopts map[string]any) core.HuggingfaceHubEntity {
		return entity.NewProfileEntity(client, entopts)
	}
	core.NewSpaceEntityFunc = func(client *core.HuggingfaceHubSDK, entopts map[string]any) core.HuggingfaceHubEntity {
		return entity.NewSpaceEntity(client, entopts)
	}
	core.NewTrendingEntityFunc = func(client *core.HuggingfaceHubSDK, entopts map[string]any) core.HuggingfaceHubEntity {
		return entity.NewTrendingEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewHuggingfaceHubSDK = core.NewHuggingfaceHubSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewHuggingfaceHubSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *HuggingfaceHubSDK  { return NewHuggingfaceHubSDK(nil) }
func Test() *HuggingfaceHubSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
