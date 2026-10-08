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
(0, node_test_1.describe)('PaperEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HUGGINGFACE_HUB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HUGGINGFACE_HUB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HuggingfaceHubSDK.test();
        const ent = testsdk.Paper();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('paper hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.HuggingfaceHubSDK.test(offline).Paper().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.HuggingfaceHubSDK.test(offline).Paper()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.HuggingfaceHubSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Paper().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.HuggingfaceHubSDK.test().Paper().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.HuggingfaceHubSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Paper().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Paper().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HuggingfaceHubSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Paper().list({ "cursor": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HUGGINGFACE_HUB_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'paper.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "ai_keywords": { "a": true, "h": "Ai Keywords", "n": "ai_keywords", "r": false, "t": "`$ARRAY`", "key$": "ai_keywords", "index$": 0 }, "ai_summary": { "a": true, "h": "Ai Summary", "n": "ai_summary", "r": false, "t": "`$STRING`", "key$": "ai_summary", "index$": 1 }, "ai_summary_model": { "a": true, "h": "Ai Summary Model", "n": "ai_summary_model", "r": false, "t": "`$STRING`", "key$": "ai_summary_model", "index$": 2 }, "authors": { "a": true, "h": "Authors", "n": "authors", "r": true, "t": "`$ARRAY`", "key$": "authors", "index$": 3 }, "comments": { "a": true, "h": "Comments", "n": "comments", "r": false, "sh": "only available when field contains 'comments'", "t": "`$ARRAY`", "union": { "branches": 2, "count": 2, "depth": 7 }, "key$": "comments", "index$": 4 }, "discussionId": { "a": true, "h": "Discussion Id", "n": "discussionId", "r": true, "t": "`$STRING`", "key$": "discussionId", "index$": 5 }, "githubRepo": { "a": true, "h": "Github Repo", "n": "githubRepo", "r": false, "t": "`$STRING`", "key$": "githubRepo", "index$": 6 }, "githubStars": { "a": true, "h": "Github Stars", "n": "githubStars", "r": false, "t": "`$NUMBER`", "key$": "githubStars", "index$": 7 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 8 }, "linkedDatasets": { "a": true, "h": "Linked Datasets", "n": "linkedDatasets", "r": true, "t": "`$ARRAY`", "union": { "branches": 2, "count": 1, "depth": 3 }, "key$": "linkedDatasets", "index$": 9 }, "linkedModels": { "a": true, "h": "Linked Models", "n": "linkedModels", "r": true, "t": "`$ARRAY`", "union": { "branches": 2, "count": 2, "depth": 3 }, "key$": "linkedModels", "index$": 10 }, "linkedSpaces": { "a": true, "h": "Linked Spaces", "n": "linkedSpaces", "r": true, "t": "`$ARRAY`", "key$": "linkedSpaces", "index$": 11 }, "mediaUrls": { "a": true, "h": "Media Urls", "n": "mediaUrls", "r": false, "t": "`$ARRAY`", "key$": "mediaUrls", "index$": 12 }, "numTotalDatasets": { "a": true, "h": "Num Total Datasets", "n": "numTotalDatasets", "r": true, "t": "`$NUMBER`", "key$": "numTotalDatasets", "index$": 13 }, "numTotalModels": { "a": true, "h": "Num Total Models", "n": "numTotalModels", "r": true, "t": "`$NUMBER`", "key$": "numTotalModels", "index$": 14 }, "numTotalSpaces": { "a": true, "h": "Num Total Spaces", "n": "numTotalSpaces", "r": true, "t": "`$NUMBER`", "key$": "numTotalSpaces", "index$": 15 }, "organization": { "a": true, "h": "Organization", "n": "organization", "r": true, "t": "`$OBJECT`", "key$": "organization", "index$": 16 }, "projectPage": { "a": true, "h": "Project Page", "n": "projectPage", "r": false, "t": "`$STRING`", "key$": "projectPage", "index$": 17 }, "publishedAt": { "a": true, "fo": "date-time", "h": "Published At", "n": "publishedAt", "r": true, "t": "`$STRING`", "key$": "publishedAt", "index$": 18 }, "submissionDeadline": { "a": true, "fo": "date-time", "h": "Submission Deadline", "n": "submissionDeadline", "r": false, "sh": "only available when field contains 'submissionDeadline'", "t": "`$STRING`", "key$": "submissionDeadline", "index$": 19 }, "submittedOnDailyAt": { "a": true, "fo": "date-time", "h": "Submitted On Daily At", "n": "submittedOnDailyAt", "r": false, "t": "`$STRING`", "key$": "submittedOnDailyAt", "index$": 20 }, "submittedOnDailyBy": { "a": true, "h": "Submitted On Daily By", "n": "submittedOnDailyBy", "r": true, "sh": "User overview information", "t": "`$OBJECT`", "key$": "submittedOnDailyBy", "index$": 21 }, "summary": { "a": true, "h": "Summary", "n": "summary", "r": true, "t": "`$STRING`", "key$": "summary", "index$": 22 }, "thumbnailUrl": { "a": true, "h": "Thumbnail Url", "n": "thumbnailUrl", "r": false, "t": "`$STRING`", "key$": "thumbnailUrl", "index$": 23 }, "title": { "a": true, "h": "Title", "n": "title", "r": true, "t": "`$STRING`", "key$": "title", "index$": 24 }, "upvotes": { "a": true, "h": "Upvotes", "n": "upvotes", "r": true, "t": "`$NUMBER`", "key$": "upvotes", "index$": 25 }, "withdrawnAt": { "a": true, "fo": "date-time", "h": "Withdrawn At", "n": "withdrawnAt", "r": false, "t": "`$STRING`", "key$": "withdrawnAt", "index$": 26 } }, "id": { "field": "id", "name": "id" }, "name": "paper", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/papers", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 50, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/papers", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "papers" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/papers/search", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": "", "k": "query", "n": "q", "or": "q", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/papers/search", "q": { "$action": "search" }, "r": {}, "s": [{ "lit": "api" }, { "lit": "papers" }, { "lit": "search" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/papers/{paperId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "paperId", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "field", "or": "field", "r": false, "t": "`$ANY`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/papers/{paperId}", "q": { "exist": ["id"] }, "r": { "param": { "paperId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "papers" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "paper", "name__orig": "paper", "Name": "Paper", "name_": "paper", "name-": "paper", "NAME": "PAPER", "index$": 5 }, { "active": true, "entity": "paper", "key$": "BasicPaperFlow", "kind": "basic", "name": "BasicPaperFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "paper_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "paper_ref01", "srcdatavar": "paper_ref01_data", "suffix": "_dt0" }, "m": { "id": "paper01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-paper_ref01" } }], "index$": 1 }] }, 'Paper', { "GET /api/papers": { "protocol": "http", "parameters": [{ "name": "cursor", "in": "query", "schema": { "description": "Pagination cursor", "type": "string" }, "required": false, "index$": 0 }, { "name": "limit", "in": "query", "schema": { "default": 50, "type": "integer", "minimum": 1, "maximum": 100 }, "required": false, "index$": 1 }] }, "GET /api/papers/search": { "protocol": "http", "parameters": [{ "name": "q", "in": "query", "schema": { "default": "", "type": "string", "maxLength": 250 }, "required": false, "index$": 0 }, { "name": "limit", "in": "query", "schema": { "type": "integer", "minimum": 1, "maximum": 120 }, "required": false, "index$": 1 }] }, "GET /api/papers/{paperId}": { "protocol": "http", "parameters": [{ "name": "paperId", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "field", "in": "query", "schema": { "anyOf": [{ "type": "string", "enum": ["submissionDeadline", "comments"] }, { "type": "array", "items": { "type": "string", "enum": ["submissionDeadline", "comments"] } }] }, "required": false, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let paper_ref01_data = Object.values(setup.data.existing.paper)[0];
        // LIST
        const paper_ref01_ent = client.Paper();
        const paper_ref01_match = {};
        const paper_ref01_list = (await paper_ref01_ent.list(paper_ref01_match)).map((e) => e.data());
        // LOAD
        const paper_ref01_match_dt0 = {};
        paper_ref01_match_dt0.id = paper_ref01_data.id;
        const paper_ref01_data_dt0 = (await paper_ref01_ent.load(paper_ref01_match_dt0)).data();
        (0, node_assert_1.default)(paper_ref01_data_dt0.id === paper_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/paper/PaperTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HuggingfaceHubSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['paper01', 'paper02', 'paper03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HUGGINGFACE_HUB_TEST_PAPER_ENTID': idmap,
        'HUGGINGFACE_HUB_TEST_LIVE': 'FALSE',
        'HUGGINGFACE_HUB_TEST_EXPLAIN': 'FALSE',
        'HUGGINGFACE_HUB_APIKEY': '',
    });
    idmap = env['HUGGINGFACE_HUB_TEST_PAPER_ENTID'];
    const live = 'TRUE' === env.HUGGINGFACE_HUB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HUGGINGFACE_HUB_TEST_PAPER_ENTID'];
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
//# sourceMappingURL=PaperEntity.test.js.map