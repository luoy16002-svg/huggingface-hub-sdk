import { HuggingfaceHubEntityBase } from '../HuggingfaceHubEntityBase';
import type { HuggingfaceHubSDK } from '../HuggingfaceHubSDK';
import type { Control } from '../types';
import type { Trending, TrendingListMatch } from '../HuggingfaceHubTypes';
declare class TrendingEntity extends HuggingfaceHubEntityBase<Trending> {
    constructor(client: HuggingfaceHubSDK, entopts: any);
    make(this: TrendingEntity): TrendingEntity;
    list(this: any, reqmatch?: TrendingListMatch, ctrl?: Control): Promise<TrendingEntity[]>;
}
export { TrendingEntity };
