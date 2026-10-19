import test from "node:test";
import assert from "node:assert";
import { store } from "../src/redux/store.js";

test("Redux Store Initialization", () => {
  const state = store.getState();
  assert.ok(state.auth, "Auth slice should be defined");
  assert.ok(state.lead, "Lead slice should be defined");
  assert.ok(state.users, "Users slice should be defined");

  assert.strictEqual(Array.isArray(state.lead.leads), true);
  assert.strictEqual(Array.isArray(state.users.users), true);
  assert.strictEqual(typeof state.auth.isAuthenticated, "boolean");
});

import { normalizeApiUrl, normalizeSocketUrl, buildApiUrl } from "../src/config/api.js";

test("API URL normalization and safe slash handling", () => {
  // Test trailing slash removal and appending /api when missing
  assert.strictEqual(
    normalizeApiUrl("https://crm-iota-wine.vercel.app"),
    "https://crm-iota-wine.vercel.app/api"
  );
  assert.strictEqual(
    normalizeApiUrl("https://crm-iota-wine.vercel.app/"),
    "https://crm-iota-wine.vercel.app/api"
  );
  assert.strictEqual(
    normalizeApiUrl("https://crm-iota-wine.vercel.app///"),
    "https://crm-iota-wine.vercel.app/api"
  );

  // Test when /api is already present
  assert.strictEqual(
    normalizeApiUrl("https://crm-iota-wine.vercel.app/api"),
    "https://crm-iota-wine.vercel.app/api"
  );
  assert.strictEqual(
    normalizeApiUrl("https://crm-iota-wine.vercel.app/api/"),
    "https://crm-iota-wine.vercel.app/api"
  );

  // Test socket URL normalization (removes /api and trailing slashes)
  assert.strictEqual(
    normalizeSocketUrl("https://crm-iota-wine.vercel.app/api"),
    "https://crm-iota-wine.vercel.app"
  );
  assert.strictEqual(
    normalizeSocketUrl("https://crm-iota-wine.vercel.app/"),
    "https://crm-iota-wine.vercel.app"
  );

  // Test buildApiUrl helper
  const urlWithSlash = buildApiUrl("/login");
  const urlWithoutSlash = buildApiUrl("login");
  assert.strictEqual(urlWithSlash, urlWithoutSlash);
  assert.ok(!urlWithSlash.includes("//login"));
});

