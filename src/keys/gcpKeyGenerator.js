const fs = require('fs');
const path = require('path');

const isLocal = process.env.NODE_ENV === 'local';
const keyPath = path.resolve(__dirname, 'gcp.keys.json');
const localKeyPath = path.resolve(__dirname, 'gcp.keys.local.json');

const {
  GOOGLE_KEY_TYPE,
  GOOGLE_KEY_PROJECT_ID,
  GOOGLE_KEY_PRIVATE_KEY_ID,
  GOOGLE_KEY_PRIVATE_KEY,
  GOOGLE_KEY_CLIENT_EMAIL,
  GOOGLE_KEY_CLIENT_ID,
  GOOGLE_KEY_AUTH_URI,
  GOOGLE_KEY_TOKEN_URI,
  GOOGLE_KEY_AUTH_PROVIDER_X509_CERT_URL,
  GOOGLE_KEY_CLIENT_X509_CERT_URL,
} = process.env;

let gcpKey = {
  "type": GOOGLE_KEY_TYPE,
  "project_id": GOOGLE_KEY_PROJECT_ID,
  "private_key_id": GOOGLE_KEY_PRIVATE_KEY_ID,
  "private_key": GOOGLE_KEY_PRIVATE_KEY,
  "client_email": GOOGLE_KEY_CLIENT_EMAIL,
  "client_id": GOOGLE_KEY_CLIENT_ID,
  "auth_uri": GOOGLE_KEY_AUTH_URI,
  "token_uri": GOOGLE_KEY_TOKEN_URI,
  "auth_provider_x509_cert_url": GOOGLE_KEY_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": GOOGLE_KEY_CLIENT_X509_CERT_URL,
};

module.exports = () => {
  console.log(`[gcpKeyGenerator] generating at ${keyPath}`);
  if (isLocal) {
    gcpKey = require(localKeyPath);
  }
  console.log('key.json would contain: %j', gcpKey);
  fs.writeFileSync(keyPath, JSON.stringify(gcpKey, null, 2).replace(/\\\\/g, '\\'));
};
