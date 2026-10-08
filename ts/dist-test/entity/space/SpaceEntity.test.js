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
(0, node_test_1.describe)('SpaceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HUGGINGFACE_HUB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HUGGINGFACE_HUB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HuggingfaceHubSDK.test();
        const ent = testsdk.Space();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('space hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.HuggingfaceHubSDK.test(offline).Space().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.HuggingfaceHubSDK.test(offline).Space()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.HuggingfaceHubSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Space().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.HuggingfaceHubSDK.test().Space().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.HuggingfaceHubSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Space().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Space().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HuggingfaceHubSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Space().list({ "author": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HUGGINGFACE_HUB_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'space.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "author": { "a": true, "h": "Author", "n": "author", "r": false, "t": "`$STRING`", "key$": "author", "index$": 0 }, "cardData": { "a": true, "h": "Card Data", "n": "cardData", "r": false, "t": "`$OBJECT`", "key$": "cardData", "index$": 1 }, "createdAt": { "a": true, "fo": "date-time", "h": "Created At", "n": "createdAt", "r": false, "t": "`$STRING`", "key$": "createdAt", "index$": 2 }, "disabled": { "a": true, "h": "Disabled", "n": "disabled", "r": false, "t": "`$BOOLEAN`", "key$": "disabled", "index$": 3 }, "gated": { "a": true, "h": "Gated", "n": "gated", "r": false, "sh": "false, or 'auto' / 'manual' when access needs approval.", "t": "`$ANY`", "key$": "gated", "index$": 4 }, "host": { "a": true, "h": "Host", "n": "host", "r": false, "t": "`$STRING`", "key$": "host", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "op": { "list": { "req": true, "type": "`$STRING`" }, "load": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Repo id, namespace/name.", "t": "`$STRING`", "key$": "id", "index$": 6 }, "lastModified": { "a": true, "fo": "date-time", "h": "Last Modified", "n": "lastModified", "r": false, "t": "`$STRING`", "key$": "lastModified", "index$": 7 }, "likes": { "a": true, "h": "Likes", "n": "likes", "r": false, "t": "`$INTEGER`", "key$": "likes", "index$": 8 }, "models": { "a": true, "h": "Models", "n": "models", "r": false, "t": "`$ARRAY`", "key$": "models", "index$": 9 }, "private": { "a": true, "h": "Private", "n": "private", "r": false, "t": "`$BOOLEAN`", "key$": "private", "index$": 10 }, "runtime": { "a": true, "h": "Runtime", "n": "runtime", "r": false, "t": "`$OBJECT`", "key$": "runtime", "index$": 11 }, "sdk": { "a": true, "h": "Sdk", "n": "sdk", "r": false, "sh": "gradio, streamlit, docker or static.", "t": "`$STRING`", "key$": "sdk", "index$": 12 }, "sha": { "a": true, "h": "Sha", "n": "sha", "r": false, "t": "`$STRING`", "key$": "sha", "index$": 13 }, "siblings": { "a": true, "h": "Siblings", "n": "siblings", "r": false, "t": "`$ARRAY`", "key$": "siblings", "index$": 14 }, "subdomain": { "a": true, "h": "Subdomain", "n": "subdomain", "r": false, "t": "`$STRING`", "key$": "subdomain", "index$": 15 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "t": "`$ARRAY`", "key$": "tags", "index$": 16 }, "trendingScore": { "a": true, "h": "Trending Score", "n": "trendingScore", "r": false, "t": "`$NUMBER`", "key$": "trendingScore", "index$": 17 }, "usedStorage": { "a": true, "h": "Used Storage", "n": "usedStorage", "r": false, "t": "`$INTEGER`", "key$": "usedStorage", "index$": 18 } }, "id": { "field": "id", "name": "id", "parts": ["namespace", "repo"], "sep": "/" }, "name": "space", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/spaces", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "author", "or": "author", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "direction", "or": "direction", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "filter", "or": "filter", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "full", "or": "full", "r": false, "t": "`$BOOLEAN`", "index$": 3 }, { "a": true, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 4 }, { "a": true, "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 6 }] }, "k": "http", "m": "GET", "o": "/api/spaces", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "spaces" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/spaces/{namespace}/{repo}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "namespace", "or": "namespace", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "repo", "or": "repo", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/spaces/{namespace}/{repo}", "q": { "exist": ["namespace", "repo"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "spaces" }, { "var": "namespace" }, { "var": "repo" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "space", "name__orig": "space", "Name": "Space", "name_": "space", "name-": "space", "NAME": "SPACE", "index$": 7 }, { "active": true, "entity": "space", "key$": "BasicSpaceFlow", "kind": "basic", "name": "BasicSpaceFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "space_ref01" } }], "index$": 0 }, { "a": false, "d": {}, "i": { "ref": "space_ref01", "srcdatavar": "space_ref01_data", "suffix": "_dt0" }, "m": { "id": "space01", "namespace": "namespace01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-space_ref01" } }], "unreachable": true }] }, 'Space', { "GET /api/spaces": { "protocol": "http", "parameters": [{ "name": "search", "in": "query", "required": false, "description": "Filter by a substring of the repo id.", "schema": { "type": "string" }, "index$": 0 }, { "name": "author", "in": "query", "required": false, "description": "Filter by owner (user or organisation).", "schema": { "type": "string" }, "index$": 1 }, { "name": "filter", "in": "query", "required": false, "description": "Filter by tag, for example a library, task or language tag.", "schema": { "type": "string" }, "index$": 2 }, { "name": "sort", "in": "query", "required": false, "description": "Property to sort by, for example downloads, likes, trendingScore, createdAt or lastModified.", "schema": { "type": "string" }, "index$": 3 }, { "name": "direction", "in": "query", "required": false, "description": "Sort direction; -1 for descending.", "schema": { "type": "integer" }, "index$": 4 }, { "name": "limit", "in": "query", "required": false, "description": "Maximum number of results.", "schema": { "type": "integer", "minimum": 1 }, "index$": 5 }, { "name": "full", "in": "query", "required": false, "description": "Return the full record for each result.", "schema": { "type": "boolean" }, "index$": 6 }] }, "GET /api/spaces/{namespace}/{repo}": { "protocol": "http", "parameters": [{ "name": "namespace", "in": "path", "required": true, "description": "Owner (user or organisation).", "schema": { "type": "string" }, "index$": 0 }, { "name": "repo", "in": "path", "required": true, "description": "Repository name.", "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let space_ref01_data = Object.values(setup.data.existing.space)[0];
        // LIST
        const space_ref01_ent = client.Space();
        const space_ref01_match = {};
        const space_ref01_list = (await space_ref01_ent.list(space_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/space/SpaceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HuggingfaceHubSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['space01', 'space02', 'space03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HUGGINGFACE_HUB_TEST_SPACE_ENTID': idmap,
        'HUGGINGFACE_HUB_TEST_LIVE': 'FALSE',
        'HUGGINGFACE_HUB_TEST_EXPLAIN': 'FALSE',
        'HUGGINGFACE_HUB_APIKEY': '',
    });
    idmap = env['HUGGINGFACE_HUB_TEST_SPACE_ENTID'];
    const live = 'TRUE' === env.HUGGINGFACE_HUB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HUGGINGFACE_HUB_TEST_SPACE_ENTID'];
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
//# sourceMappingURL=SpaceEntity.test.js.map