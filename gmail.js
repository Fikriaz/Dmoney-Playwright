const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

function getAuth() {
  const token = JSON.parse(
    fs.readFileSync(path.join(__dirname, "token.json"))
  );

  const { OAuth2 } = google.auth;
  const client = new OAuth2();
  client.setCredentials(token);

  return client;
}

// 🔥 decode base64url (INI PENTING)
function decodeBase64Url(data) {
  if (!data) return "";

  return Buffer.from(
    data.replace(/-/g, "+").replace(/_/g, "/"),
    "base64"
  ).toString("utf-8");
}

// 🔥 ambil body recursive
function extractBody(payload) {
  if (!payload) return "";

  if (payload.body?.data) {
    return decodeBase64Url(payload.body.data);
  }

  if (payload.parts) {
    for (const part of payload.parts) {
      const result = extractBody(part);
      if (result) return result;
    }
  }

  return "";
}

async function getOtp() {
  const gmail = google.gmail({
    version: "v1",
    auth: getAuth(),
  });

  const res = await gmail.users.messages.list({
    userId: "me",
    maxResults: 10,
    q: "OTP OR DMoney OR login", // 🔥 biar lebih tepat
  });

  const messages = res.data.messages;
  if (!messages?.length) return null;

  for (const m of messages) {
    const msg = await gmail.users.messages.get({
      userId: "me",
      id: m.id,
    });

    const body = extractBody(msg.data.payload);

    const otpMatch = body.match(/\b\d{4,6}\b/);

    if (otpMatch) return otpMatch[0];
  }

  return null;
}

module.exports = { getOtp };