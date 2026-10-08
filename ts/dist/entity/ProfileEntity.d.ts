import { HuggingfaceHubEntityBase } from '../HuggingfaceHubEntityBase';
import type { HuggingfaceHubSDK } from '../HuggingfaceHubSDK';
import type { Control } from '../types';
import type { Profile, ProfileLoadMatch } from '../HuggingfaceHubTypes';
declare class ProfileEntity extends HuggingfaceHubEntityBase<Profile> {
    constructor(client: HuggingfaceHubSDK, entopts: any);
    make(this: ProfileEntity): ProfileEntity;
    load(this: any, reqmatch?: ProfileLoadMatch, ctrl?: Control): Promise<ProfileEntity>;
}
export { ProfileEntity };
