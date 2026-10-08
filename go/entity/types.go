// Typed models for the HuggingfaceHub SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/luoy16002-svg/huggingface-hub-sdk/go/core"
)

// Auth is the typed data model for the auth entity.
type Auth struct {
}

// AuthLoadMatch is the typed request payload for Auth.LoadTyped.
type AuthLoadMatch struct {
}

// Collection is the typed data model for the collection entity.
type Collection struct {
}

// CollectionLoadMatch is the typed request payload for Collection.LoadTyped.
type CollectionLoadMatch struct {
	Namespace string `json:"namespace"`
	Slug string `json:"slug"`
}

// CollectionListMatch is the typed request payload for Collection.ListTyped.
type CollectionListMatch struct {
	Cursor *string `json:"cursor,omitempty"`
	Expand *string `json:"expand,omitempty"`
	Item *any `json:"item,omitempty"`
	Limit *float64 `json:"limit,omitempty"`
	Owner *any `json:"owner,omitempty"`
	Q *string `json:"q,omitempty"`
	Sort *string `json:"sort,omitempty"`
}

// DailyPaper is the typed data model for the daily_paper entity.
type DailyPaper struct {
}

// DailyPaperListMatch is the typed request payload for DailyPaper.ListTyped.
type DailyPaperListMatch struct {
	Date *string `json:"date,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Month *string `json:"month,omitempty"`
	P *int `json:"p,omitempty"`
	Sort *string `json:"sort,omitempty"`
	Submitter *string `json:"submitter,omitempty"`
	Week *string `json:"week,omitempty"`
}

// Dataset is the typed data model for the dataset entity.
type Dataset struct {
}

// DatasetLoadMatch is the typed request payload for Dataset.LoadTyped.
type DatasetLoadMatch struct {
	Namespace string `json:"namespace"`
	Repo string `json:"repo"`
}

// DatasetListMatch is the typed request payload for Dataset.ListTyped.
type DatasetListMatch struct {
	Author *string `json:"author,omitempty"`
	Direction *int `json:"direction,omitempty"`
	Filter *string `json:"filter,omitempty"`
	Full *bool `json:"full,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Search *string `json:"search,omitempty"`
	Sort *string `json:"sort,omitempty"`
}

// Model is the typed data model for the model entity.
type Model struct {
}

// ModelLoadMatch is the typed request payload for Model.LoadTyped.
type ModelLoadMatch struct {
	Namespace string `json:"namespace"`
	Repo string `json:"repo"`
}

// ModelListMatch is the typed request payload for Model.ListTyped.
type ModelListMatch struct {
	Author *string `json:"author,omitempty"`
	Direction *int `json:"direction,omitempty"`
	Filter *string `json:"filter,omitempty"`
	Full *bool `json:"full,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Search *string `json:"search,omitempty"`
	Sort *string `json:"sort,omitempty"`
}

// Paper is the typed data model for the paper entity.
type Paper struct {
}

// PaperLoadMatch is the typed request payload for Paper.LoadTyped.
type PaperLoadMatch struct {
	Id string `json:"id"`
	Field *any `json:"field,omitempty"`
}

// PaperListMatch is the typed request payload for Paper.ListTyped.
type PaperListMatch struct {
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// Profile is the typed data model for the profile entity.
type Profile struct {
}

// ProfileLoadMatch is the typed request payload for Profile.LoadTyped.
type ProfileLoadMatch struct {
	Username string `json:"username"`
}

// Space is the typed data model for the space entity.
type Space struct {
}

// SpaceLoadMatch is the typed request payload for Space.LoadTyped.
type SpaceLoadMatch struct {
	Namespace string `json:"namespace"`
	Repo string `json:"repo"`
}

// SpaceListMatch is the typed request payload for Space.ListTyped.
type SpaceListMatch struct {
	Author *string `json:"author,omitempty"`
	Direction *int `json:"direction,omitempty"`
	Filter *string `json:"filter,omitempty"`
	Full *bool `json:"full,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Search *string `json:"search,omitempty"`
	Sort *string `json:"sort,omitempty"`
}

// Trending is the typed data model for the trending entity.
type Trending struct {
}

// TrendingListMatch is the typed request payload for Trending.ListTyped.
type TrendingListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Type *string `json:"type,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
