"use client";

import { useEffect, useState } from "react";

/** Props the CMS host injects (mirrors the CMS `ModulePageProps`). */
export interface ModulePageProps {
  /** Same-origin proxy base for this module: fetch `${apiBase}/<path>`. */
  apiBase: string;
}

/**
 * The smallest CMS module surface (guides/modules.md, ADR-0008): fetch the
 * greeting from this module's backend — through the CMS proxy at
 * `/api/m/hello-world/greeting` — and show it. The CMS host renders this inside
 * the standard ModuleHeader chrome at `/admin/m/hello-world`. The browser never
 * sees the backend URL or key; the proxy attaches them server-side.
 */
export default function HelloWorldPage({ apiBase }: ModulePageProps) {
  const [message, setMessage] = useState("Loading…");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch(`${apiBase}/greeting`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`Backend returned ${r.status}`);
        return (await r.json()) as { message?: string };
      })
      .then((d) => {
        if (active) setMessage(d.message ?? "(no message)");
      })
      .catch((e: Error) => {
        if (active) setError(e.message);
      });
    return () => {
      active = false;
    };
  }, [apiBase]);

  return (
    <div className="card">
      <p style={{ margin: 0, fontSize: "1.25rem" }}>
        {error ? `Error: ${error}` : message}
      </p>
    </div>
  );
}
