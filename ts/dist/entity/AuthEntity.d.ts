import { HuggingfaceHubEntityBase } from '../HuggingfaceHubEntityBase';
import type { HuggingfaceHubSDK } from '../HuggingfaceHubSDK';
import type { Control } from '../types';
import type { Auth, AuthLoadMatch } from '../HuggingfaceHubTypes';
declare class AuthEntity extends HuggingfaceHubEntityBase<Auth> {
    constructor(client: HuggingfaceHubSDK, entopts: any);
    make(this: AuthEntity): AuthEntity;
    load(this: any, reqmatch?: AuthLoadMatch, ctrl?: Control): Promise<AuthEntity>;
}
export { AuthEntity };
