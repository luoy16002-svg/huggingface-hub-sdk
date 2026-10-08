import { HuggingfaceHubEntityBase } from '../HuggingfaceHubEntityBase';
import type { HuggingfaceHubSDK } from '../HuggingfaceHubSDK';
import type { Control } from '../types';
import type { Space, SpaceLoadMatch, SpaceListMatch } from '../HuggingfaceHubTypes';
declare class SpaceEntity extends HuggingfaceHubEntityBase<Space> {
    constructor(client: HuggingfaceHubSDK, entopts: any);
    make(this: SpaceEntity): SpaceEntity;
    load(this: any, reqmatch?: SpaceLoadMatch, ctrl?: Control): Promise<SpaceEntity>;
    list(this: any, reqmatch?: SpaceListMatch, ctrl?: Control): Promise<SpaceEntity[]>;
}
export { SpaceEntity };
