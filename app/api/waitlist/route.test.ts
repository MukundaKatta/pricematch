import { describe, it, expect } from "vitest";
import { POST } from "./route";
import type { NextRequest } from "next/server";

function makeRequest(body: string): NextRequest {
  return new Request("http://localhost/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  }) as unknown as NextRequest;
}

describe("POST /api/waitlist validation", () => {
  it("returns 400 for a malformed JSON body", async () => {
    const res = await POST(makeRequest("not json"));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({ error: "invalid JSON body" });
  });

  it("returns 400 when email is missing", async () => {
    const res = await POST(makeRequest(JSON.stringify({})));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({ error: "email required" });
  });

  it("returns 400 when email is not a string", async () => {
    const res = await POST(makeRequest(JSON.stringify({ email: 123 })));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({ error: "email required" });
  });
});
