const fs = require("fs");
const path = require("path");
const { authenticate } = require("@google-cloud/local-auth");

const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

async function main() {
  const auth = await authenticate({
    scopes: SCOPES,
    keyfilePath: path.join(__dirname, "credentials.json"),
  });

  fs.writeFileSync(
    path.join(__dirname, "token.json"),
    JSON.stringify(auth.credentials)
  );

  console.log("Token saved successfully!");
}

main();