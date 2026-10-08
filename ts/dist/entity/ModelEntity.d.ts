import { HuggingfaceHubEntityBase } from '../HuggingfaceHubEntityBase';
import type { HuggingfaceHubSDK } from '../HuggingfaceHubSDK';
import type { Control } from '../types';
import type { Model, ModelLoadMatch, ModelListMatch } from '../HuggingfaceHubTypes';
declare class ModelEntity extends HuggingfaceHubEntityBase<Model> {
    constructor(client: HuggingfaceHubSDK, entopts: any);
    make(this: ModelEntity): ModelEntity;
    load(this: any, reqmatch?: ModelLoadMatch, ctrl?: Control): Promise<ModelEntity>;
    list(this: any, reqmatch?: ModelListMatch, ctrl?: Control): Promise<ModelEntity[]>;
}
export { ModelEntity };
