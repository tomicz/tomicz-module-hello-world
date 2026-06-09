# @tomicz/module-hello-world

The smallest end-to-end **installable module** for the Tomicz CMS — a reference
example for `guides/modules.md` / ADR-0008 in the tomicz-framework.

Two surfaces:

- **backend** (`@tomicz/module-hello-world/backend`) — a `BackendModule` the org
  backend mounts at `/modules/hello-world`. One route: `GET /greeting` →
  `{ "message": "hello world" }`, guarded by the host's API key.
- **cms** (`@tomicz/module-hello-world/cms`) — a React page the CMS renders at
  `/admin/m/hello-world`; it fetches the greeting through the CMS proxy and shows it.

## Install (build-time, git-by-tag)

In the org backend **and** the CMS:

```sh
npm i "github:tomicz/tomicz-module-hello-world#v0.1.0"
```

Then register the backend export in the backend's installed-module list and the
cms export in the CMS catalog, and enable it for an org. See `guides/modules.md`.

## Packaging note

The backend surface ships **prebuilt** (`dist/backend`) so the Express server can
`require` it at runtime (the server bundles with `esbuild --packages=external`).
The cms surface ships as **source** (`src/cms/index.tsx`) and is transpiled by the
host CMS via Next's `transpilePackages`.
