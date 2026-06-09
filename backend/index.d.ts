import { Router, type RequestHandler } from "express";
/** The slice of the host's ModuleDeps this module needs (it only guards a route).
 *  Structurally compatible with `@llm/backend/modules` `ModuleDeps`. */
interface HostDeps {
    requireApiKey: RequestHandler;
}
/**
 * The smallest backend module (guides/modules.md, ADR-0008): one authenticated
 * route returning a greeting. The host mounts this at `/modules/hello-world`, so
 * the route below answers `GET /modules/hello-world/greeting`. The CMS proxy
 * forwards the org's API key, so we guard it with the host's `requireApiKey`.
 */
declare const helloWorld: {
    id: string;
    createRouter(deps: HostDeps): Router;
};
export default helloWorld;
