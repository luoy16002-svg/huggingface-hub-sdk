"""Cut a focused slice out of the Hugging Face Hub OpenAPI file.

Input:  spec/hf-hub-openapi.full.json  (downloaded from https://huggingface.co/.well-known/openapi.json if missing)
        spec/supplement.json           (endpoints the published file leaves out; see make_supplement.py)
Output: spec/hf-hub-openapi.slice.json, also copied to .sdk/def/ for `npm run generate`

Only the operations listed in KEEP are copied, plus every component they reference.
Run: python spec/build_slice.py
"""
import json
import re
import shutil
import sys
import urllib.request
from pathlib import Path

HERE = Path(__file__).parent
FULL = HERE / "hf-hub-openapi.full.json"
if not FULL.exists():
    req = urllib.request.Request("https://huggingface.co/.well-known/openapi.json", headers={"User-Agent": "huggingface-hub-sdk"})
    FULL.write_bytes(urllib.request.urlopen(req, timeout=60).read())
full = json.loads(FULL.read_text(encoding="utf-8"))
supp = json.loads((HERE / "supplement.json").read_text(encoding="utf-8"))

KEEP = {
    "/api/whoami-v2": ["get"],
    "/api/trending": ["get"],
    "/api/daily_papers": ["get"],
    "/api/papers": ["get"],
    "/api/papers/search": ["get"],
    "/api/papers/{paperId}": ["get"],
    "/api/collections": ["get"],
    "/api/collections/{namespace}/{slug}": ["get"],
    "/api/users/{username}/overview": ["get"],
}

out = {
    "openapi": full["openapi"],
    "info": {
        "title": "Hugging Face Hub API",
        "version": full["info"].get("version", "0.0.1"),
        "description": (
            "A focused slice of the Hugging Face Hub API: models, datasets, Spaces, papers, "
            "collections and users (read operations). Cut from https://huggingface.co/.well-known/openapi.json; "
            "the model, dataset and Space list/info endpoints come from spec/supplement.json because the "
            "published file does not include them."
        ),
    },
    "servers": full["servers"],
    "security": full.get("security", []),
    "paths": {},
    "components": {"securitySchemes": full["components"]["securitySchemes"]},
}

missing = []
for path, methods in KEEP.items():
    if path not in full["paths"]:
        missing.append(path)
        continue
    item = {m: full["paths"][path][m] for m in methods}
    # path-level parameters apply to every method
    if "parameters" in full["paths"][path]:
        item["parameters"] = full["paths"][path]["parameters"]
    out["paths"][path] = item
if missing:
    sys.exit(f"not in the published spec: {missing}")

for path, item in supp["paths"].items():
    out["paths"][path] = item
for kind, comps in supp.get("components", {}).items():
    out["components"].setdefault(kind, {}).update(comps)

# copy the closure of $ref'd components
REF = re.compile(r'"\$ref":\s*"#/components/([^/]+)/([^"]+)"')
seen = set()
todo = REF.findall(json.dumps(out["paths"]))
while todo:
    kind, name = todo.pop()
    if (kind, name) in seen:
        continue
    seen.add((kind, name))
    if name in out["components"].get(kind, {}):
        node = out["components"][kind][name]
    else:
        node = full["components"][kind][name]
        out["components"].setdefault(kind, {})[name] = node
    todo.extend(REF.findall(json.dumps(node)))

dst = HERE / "hf-hub-openapi.slice.json"
dst.write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
shutil.copyfile(dst, HERE.parent / ".sdk" / "def" / dst.name)
ops = sum(1 for p in out["paths"].values() for m in p if m != "parameters")
print(f"{dst.name}: {len(out['paths'])} paths, {ops} operations, {len(seen)} components")
