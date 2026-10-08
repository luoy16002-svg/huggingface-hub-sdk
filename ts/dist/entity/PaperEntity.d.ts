import { HuggingfaceHubEntityBase } from '../HuggingfaceHubEntityBase';
import type { HuggingfaceHubSDK } from '../HuggingfaceHubSDK';
import type { Control } from '../types';
import type { Paper, PaperLoadMatch, PaperListMatch } from '../HuggingfaceHubTypes';
declare class PaperEntity extends HuggingfaceHubEntityBase<Paper> {
    constructor(client: HuggingfaceHubSDK, entopts: any);
    make(this: PaperEntity): PaperEntity;
    load(this: any, reqmatch?: PaperLoadMatch, ctrl?: Control): Promise<PaperEntity>;
    list(this: any, reqmatch?: PaperListMatch, ctrl?: Control): Promise<PaperEntity[]>;
}
export { PaperEntity };
