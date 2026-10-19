const test = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const http = require("http");

// Set environment for testing
process.env.NODE_ENV = "test";
process.env.SECRETKEY = "crm_jwt_super_secret_key_2026_salescore";
process.env.MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/CRM";

const main = require("../config/db");
const { app, server } = require("../app");
const User = require("../Models/User");
const Lead = require("../Models/Lead");

let baseUrl;
let testServer;
let adminToken;
let agentToken;
let teamLeaderToken;
let dataEntryToken;
let createdLeadId;
let agentId;

test.before(async () => {
  await main();

  // Start test server on ephemeral port
  await new Promise((resolve) => {
    testServer = server.listen(0, () => {
      const port = testServer.address().port;
      baseUrl = `http://127.0.0.1:${port}/api`;
      resolve();
    });
  });

  // Ensure test users exist
  const roles = [
    { email: "admin@salescore.com", role: "admin", full_name: "Admin Tester" },
    { email: "agent@salescore.com", role: "agent", full_name: "Agent Tester" },
    { email: "teamleader@salescore.com", role: "TeamLeader", full_name: "Leader Tester" },
    { email: "dataentry@salescore.com", role: "Dataentry", full_name: "Data Tester" },
  ];

  for (const r of roles) {
    let u = await User.findOne({ email: r.email });
    if (!u) {
      u = await User.create({
        email: r.email,
        password: "password123",
        role: r.role,
        full_name: r.full_name,
      });
    }
  }

  // Login as admin
  const adminLogin = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@salescore.com", password: "password123" }),
  });
  const adminData = await adminLogin.json();
  adminToken = adminData.token;

  // Login as agent
  const agentLogin = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "agent@salescore.com", password: "password123" }),
  });
  const agentData = await agentLogin.json();
  agentToken = agentData.token;
  agentId = agentData.user?.id;

  // Login as teamleader
  const tlLogin = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "teamleader@salescore.com", password: "password123" }),
  });
  const tlData = await tlLogin.json();
  teamLeaderToken = tlData.token;

  // Login as dataentry
  const deLogin = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "dataentry@salescore.com", password: "password123" }),
  });
  const deData = await deLogin.json();
  dataEntryToken = deData.token;
});

test.after(async () => {
  if (testServer) {
    await new Promise((resolve) => testServer.close(resolve));
  }
  await mongoose.connection.close();
});

test("GET /api/health should return 200 and status ok", async () => {
  const res = await fetch(`${baseUrl}/health`);
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.strictEqual(data.status, "ok");
});

test("POST /api/login should reject invalid credentials", async () => {
  const res = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@salescore.com", password: "wrongpassword" }),
  });
  assert.strictEqual(res.status, 401);
});

test("POST /api/register should require admin token", async () => {
  const res = await fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      full_name: "Unauthorized User",
      email: "unauth@example.com",
      password: "password123",
      confirm_password: "password123",
      role: "agent",
    }),
  });
  assert.strictEqual(res.status, 401);
});

test("POST /api/Lead should allow Dataentry to create a lead", async () => {
  const testEmail = `lead_${Date.now()}@testcompany.com`;
  const res = await fetch(`${baseUrl}/Lead`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${dataEntryToken}`,
    },
    body: JSON.stringify({
      name: "Stark Industries",
      phone: "+1-800-555-0199",
      email: testEmail,
      source: "FaceBook",
    }),
  });

  assert.strictEqual(res.status, 201);
  const data = await res.json();
  assert.strictEqual(data.data.name, "Stark Industries");
  assert.strictEqual(data.data.status, "New");
  createdLeadId = data.data._id;
});

test("PATCH /api/Lead/:id should allow TeamLeader to assign lead", async () => {
  assert.ok(createdLeadId, "createdLeadId must exist");
  assert.ok(agentId, "agentId must exist");

  const res = await fetch(`${baseUrl}/Lead/${createdLeadId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${teamLeaderToken}`,
    },
    body: JSON.stringify({ Assignto: agentId }),
  });

  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.strictEqual(data.data.Assignto._id, agentId);
});

test("PATCH /api/LeadS/:id should allow Agent to update status of assigned lead", async () => {
  assert.ok(createdLeadId, "createdLeadId must exist");

  const res = await fetch(`${baseUrl}/LeadS/${createdLeadId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${agentToken}`,
    },
    body: JSON.stringify({ status: "Contacted" }),
  });

  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.strictEqual(data.data.status, "Contacted");
});

test("PATCH /api/LeadS/:id should allow TeamLeader to update status of any lead", async () => {
  assert.ok(createdLeadId, "createdLeadId must exist");

  const res = await fetch(`${baseUrl}/LeadS/${createdLeadId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${teamLeaderToken}`,
    },
    body: JSON.stringify({ status: "Inteersted" }),
  });

  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.strictEqual(data.data.status, "Inteersted");
});

test("GET /api/AllLead should return assigned leads for agent", async () => {
  const res = await fetch(`${baseUrl}/AllLead`, {
    headers: { Authorization: `Bearer ${agentToken}` },
  });

  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.ok(Array.isArray(data.lead));
  assert.ok(data.totallead >= 1);
});

test("GET /api/lead/filter should filter leads by status", async () => {
  const res = await fetch(`${baseUrl}/lead/filter?status=Inteersted`, {
    headers: { Authorization: `Bearer ${agentToken}` },
  });

  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.ok(Array.isArray(data.data));
  assert.ok(data.data.some((l) => l._id === createdLeadId));
});

test("GET /api/lead/:id should return lead details", async () => {
  const res = await fetch(`${baseUrl}/lead/${createdLeadId}`, {
    headers: { Authorization: `Bearer ${agentToken}` },
  });

  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.strictEqual(data.lead._id, createdLeadId);
});

test("GET /api/dashbourd_admin/allusers should return users with roles for admin", async () => {
  const res = await fetch(`${baseUrl}/dashbourd_admin/allusers`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });

  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.ok(Array.isArray(data.users));
  assert.ok(data.users.length >= 4);
  assert.ok(data.users.some((u) => u.role === "admin"));
  assert.ok(data.users.some((u) => u.role === "agent"));
});

test("GET /api/dashbourd_admin/stats should return comprehensive admin statistics", async () => {
  const res = await fetch(`${baseUrl}/dashbourd_admin/stats`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });

  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.ok(typeof data.totalUsers === "number");
  assert.ok(typeof data.totalLeads === "number");
  assert.ok(typeof data.statusStats === "object");
  assert.ok(typeof data.sourceStats === "object");
});

test("GET /api/noti should return notifications for user", async () => {
  const res = await fetch(`${baseUrl}/noti`, {
    headers: { Authorization: `Bearer ${agentToken}` },
  });

  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.ok(Array.isArray(data.noti));
});

