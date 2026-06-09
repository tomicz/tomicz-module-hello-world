"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/**
 * The smallest backend module (guides/modules.md, ADR-0008): one authenticated
 * route returning a greeting. The host mounts this at `/modules/hello-world`, so
 * the route below answers `GET /modules/hello-world/greeting`. The CMS proxy
 * forwards the org's API key, so we guard it with the host's `requireApiKey`.
 */
const helloWorld = {
    id: "hello-world",
    createRouter(deps) {
        const router = (0, express_1.Router)();
        router.get("/greeting", deps.requireApiKey, (_req, res) => {
            res.json({ message: "hello world" });
        });
        return router;
    },
};
exports.default = helloWorld;
