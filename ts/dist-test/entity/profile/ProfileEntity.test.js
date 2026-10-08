"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ProfileEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HUGGINGFACE_HUB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HUGGINGFACE_HUB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HuggingfaceHubSDK.test();
        const ent = testsdk.Profile();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HuggingfaceHubSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Profile().load({ "username": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HUGGINGFACE_HUB_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'profile.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "avatarUrl": { "a": true, "h": "Avatar Url", "n": "avatarUrl", "r": true, "t": "`$STRING`", "key$": "avatarUrl", "index$": 0 }, "createdAt": { "a": true, "fo": "date-time", "h": "Created At", "n": "createdAt", "r": true, "t": "`$STRING`", "key$": "createdAt", "index$": 1 }, "details": { "a": true, "h": "Details", "n": "details", "r": false, "t": "`$STRING`", "key$": "details", "index$": 2 }, "fullname": { "a": true, "h": "Fullname", "n": "fullname", "r": true, "t": "`$STRING`", "key$": "fullname", "index$": 3 }, "hardwareItems": { "a": true, "h": "Hardware Items", "n": "hardwareItems", "r": false, "sh": "The user's hardware items, unless the user set them as private", "t": "`$ARRAY`", "key$": "hardwareItems", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "A hex string of 24 characters representing an ObjectId.", "t": "`$STRING`", "key$": "id", "index$": 5 }, "isFollowing": { "a": true, "h": "Is Following", "n": "isFollowing", "r": false, "t": "`$BOOLEAN`", "key$": "isFollowing", "index$": 6 }, "isPro": { "a": true, "h": "Is Pro", "n": "isPro", "r": true, "t": "`$BOOLEAN`", "key$": "isPro", "index$": 7 }, "numBuckets": { "a": true, "h": "Num Buckets", "n": "numBuckets", "r": false, "t": "`$NUMBER`", "key$": "numBuckets", "index$": 8 }, "numDatasets": { "a": true, "h": "Num Datasets", "n": "numDatasets", "r": false, "t": "`$NUMBER`", "key$": "numDatasets", "index$": 9 }, "numDiscussions": { "a": true, "h": "Num Discussions", "n": "numDiscussions", "r": false, "t": "`$NUMBER`", "key$": "numDiscussions", "index$": 10 }, "numFollowers": { "a": true, "h": "Num Followers", "n": "numFollowers", "r": false, "t": "`$NUMBER`", "key$": "numFollowers", "index$": 11 }, "numFollowing": { "a": true, "h": "Num Following", "n": "numFollowing", "r": false, "t": "`$NUMBER`", "key$": "numFollowing", "index$": 12 }, "numFollowingOrgs": { "a": true, "h": "Num Following Orgs", "n": "numFollowingOrgs", "r": false, "t": "`$NUMBER`", "key$": "numFollowingOrgs", "index$": 13 }, "numKernels": { "a": true, "h": "Num Kernels", "n": "numKernels", "r": false, "t": "`$NUMBER`", "key$": "numKernels", "index$": 14 }, "numLikes": { "a": true, "h": "Num Likes", "n": "numLikes", "r": false, "t": "`$NUMBER`", "key$": "numLikes", "index$": 15 }, "numModels": { "a": true, "h": "Num Models", "n": "numModels", "r": false, "t": "`$NUMBER`", "key$": "numModels", "index$": 16 }, "numPapers": { "a": true, "h": "Num Papers", "n": "numPapers", "r": false, "t": "`$NUMBER`", "key$": "numPapers", "index$": 17 }, "numSpaces": { "a": true, "h": "Num Spaces", "n": "numSpaces", "r": false, "t": "`$NUMBER`", "key$": "numSpaces", "index$": 18 }, "numUpvotes": { "a": true, "h": "Num Upvotes", "n": "numUpvotes", "r": false, "t": "`$NUMBER`", "key$": "numUpvotes", "index$": 19 }, "orgs": { "a": true, "h": "Orgs", "n": "orgs", "r": false, "t": "`$ARRAY`", "key$": "orgs", "index$": 20 }, "primaryOrgAvatarUrl": { "a": true, "h": "Primary Org Avatar Url", "n": "primaryOrgAvatarUrl", "r": false, "t": "`$STRING`", "key$": "primaryOrgAvatarUrl", "index$": 21 }, "reasonToFollow": { "a": true, "h": "Reason To Follow", "n": "reasonToFollow", "r": false, "t": "`$STRING`", "key$": "reasonToFollow", "index$": 22 }, "serviceAccount": { "a": true, "h": "Service Account", "n": "serviceAccount", "r": true, "sh": "Set when the user is a service account", "t": "`$OBJECT`", "key$": "serviceAccount", "index$": 23 }, "type": { "a": true, "h": "Type", "n": "type", "r": true, "t": "`$STRING`", "key$": "type", "index$": 24 }, "user": { "a": true, "h": "User", "n": "user", "r": true, "t": "`$STRING`", "key$": "user", "index$": 25 } }, "id": { "field": "id", "name": "id" }, "name": "profile", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/users/{username}/overview", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "username", "or": "username", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/users/{username}/overview", "q": { "exist": ["username"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "users" }, { "var": "username" }, { "lit": "overview" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "profile", "name__orig": "profile", "Name": "Profile", "name_": "profile", "name-": "profile", "NAME": "PROFILE", "index$": 6 }, { "active": true, "entity": "profile", "key$": "BasicProfileFlow", "kind": "basic", "name": "BasicProfileFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "profile_ref01", "srcdatavar": "profile_ref01_data", "suffix": "_dt0" }, "m": { "id": "profile01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-profile_ref01" } }], "unreachable": true }] }, 'Profile', { "GET /api/users/{username}/overview": { "protocol": "http", "parameters": [{ "name": "username", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let profile_ref01_data = Object.values(setup.data.existing.profile)[0];
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/profile/ProfileTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HuggingfaceHubSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['profile01', 'profile02', 'profile03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HUGGINGFACE_HUB_TEST_PROFILE_ENTID': idmap,
        'HUGGINGFACE_HUB_TEST_LIVE': 'FALSE',
        'HUGGINGFACE_HUB_TEST_EXPLAIN': 'FALSE',
        'HUGGINGFACE_HUB_APIKEY': '',
    });
    idmap = env['HUGGINGFACE_HUB_TEST_PROFILE_ENTID'];
    const live = 'TRUE' === env.HUGGINGFACE_HUB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HUGGINGFACE_HUB_TEST_PROFILE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.HuggingfaceHubSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.HUGGINGFACE_HUB_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.HUGGINGFACE_HUB_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ProfileEntity.test.js.map