import { HuggingfaceHubEntityBase } from '../HuggingfaceHubEntityBase';
import type { HuggingfaceHubSDK } from '../HuggingfaceHubSDK';
import type { Control } from '../types';
import type { Collection, CollectionLoadMatch, CollectionListMatch } from '../HuggingfaceHubTypes';
declare class CollectionEntity extends HuggingfaceHubEntityBase<Collection> {
    constructor(client: HuggingfaceHubSDK, entopts: any);
    make(this: CollectionEntity): CollectionEntity;
    load(this: any, reqmatch?: CollectionLoadMatch, ctrl?: Control): Promise<CollectionEntity>;
    list(this: any, reqmatch?: CollectionListMatch, ctrl?: Control): Promise<CollectionEntity[]>;
}
export { CollectionEntity };
