import { HuggingfaceHubEntityBase } from '../HuggingfaceHubEntityBase';
import type { HuggingfaceHubSDK } from '../HuggingfaceHubSDK';
import type { Control } from '../types';
import type { DailyPaper, DailyPaperListMatch } from '../HuggingfaceHubTypes';
declare class DailyPaperEntity extends HuggingfaceHubEntityBase<DailyPaper> {
    constructor(client: HuggingfaceHubSDK, entopts: any);
    make(this: DailyPaperEntity): DailyPaperEntity;
    list(this: any, reqmatch?: DailyPaperListMatch, ctrl?: Control): Promise<DailyPaperEntity[]>;
}
export { DailyPaperEntity };
