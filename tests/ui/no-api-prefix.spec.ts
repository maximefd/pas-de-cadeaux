import { expect, test } from "@playwright/test";
import { existsSync } from "node:fs";

// The production reverse proxy blocks every URL under /api/ on the shared domain,
// so the app must never expose a route under that prefix (the fork uses /pdc/ instead).
test("no route is served under /api/", async ({ request }) => {
    expect(existsSync("src/routes/api")).toBe(false);
    for (const path of ["/api/groups", "/api/users", "/api/assets/anything"]) {
        const response = await request.get(path, { maxRedirects: 0 });
        expect(response.status(), path).toBe(404);
    }
});
