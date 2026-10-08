import { HuggingfaceHubEntityBase } from '../HuggingfaceHubEntityBase';
import type { HuggingfaceHubSDK } from '../HuggingfaceHubSDK';
import type { Control } from '../types';
import type { Dataset, DatasetLoadMatch, DatasetListMatch } from '../HuggingfaceHubTypes';
declare class DatasetEntity extends HuggingfaceHubEntityBase<Dataset> {
    constructor(client: HuggingfaceHubSDK, entopts: any);
    make(this: DatasetEntity): DatasetEntity;
    load(this: any, reqmatch?: DatasetLoadMatch, ctrl?: Control): Promise<DatasetEntity>;
    list(this: any, reqmatch?: DatasetListMatch, ctrl?: Control): Promise<DatasetEntity[]>;
}
export { DatasetEntity };
