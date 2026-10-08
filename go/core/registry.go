package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAuthEntityFunc func(client *HuggingfaceHubSDK, entopts map[string]any) HuggingfaceHubEntity

var NewCollectionEntityFunc func(client *HuggingfaceHubSDK, entopts map[string]any) HuggingfaceHubEntity

var NewDailyPaperEntityFunc func(client *HuggingfaceHubSDK, entopts map[string]any) HuggingfaceHubEntity

var NewDatasetEntityFunc func(client *HuggingfaceHubSDK, entopts map[string]any) HuggingfaceHubEntity

var NewModelEntityFunc func(client *HuggingfaceHubSDK, entopts map[string]any) HuggingfaceHubEntity

var NewPaperEntityFunc func(client *HuggingfaceHubSDK, entopts map[string]any) HuggingfaceHubEntity

var NewProfileEntityFunc func(client *HuggingfaceHubSDK, entopts map[string]any) HuggingfaceHubEntity

var NewSpaceEntityFunc func(client *HuggingfaceHubSDK, entopts map[string]any) HuggingfaceHubEntity

var NewTrendingEntityFunc func(client *HuggingfaceHubSDK, entopts map[string]any) HuggingfaceHubEntity

