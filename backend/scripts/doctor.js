#!/usr/bin/env node
/*
  Environment doctor for Inventarium backend
  Checks:
  - Node.js version
  - Required files and dependencies
  - Required environment variables
  - Database connectivity (PostgreSQL when not in test)
  - Port availability (4000)
*/

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const net = require('net');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env'), quiet: true });

const REQUIRED_ENV = [
  'JWT_SECRET',
  // DB envs are required only if not test
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',
  'DB_HOST',
  'DB_PORT'
];

function checkNodeVersion() {
  const requiredMajor = 18; // recommend Node.js >= 18 LTS
  const version = process.versions.node;
  const major = parseInt(version.split('.')[0], 10);
  const ok = major >= requiredMajor;
  return { ok, version, required: `>= ${requiredMajor}.x` };
}

function checkFileExists(relPath) {
  const p = path.resolve(__dirname, '..', relPath);
  try { fs.accessSync(p, fs.constants.F_OK); return { ok: true, path: p }; } catch { return { ok: false, path: p }; }
}

function run(cmd) {
  try {
    return child_process.execSync(cmd, { stdio: 'pipe' }).toString().trim();
  } catch (e) {
    return null;
  }
}

function checkDepsInstalled() {
  const out = run('npm ls --depth=0 --json');
  if (!out) return { ok: false, reason: 'npm ls failed' };
  const parsed = JSON.parse(out);
  const hasErrors = !!parsed.problems && parsed.problems.length > 0;
  return { ok: !hasErrors, problems: parsed.problems || [] };
}

function checkEnvVars() {
  const missing = [];
  const isTest = process.env.NODE_ENV === 'test';
  for (const key of REQUIRED_ENV) {
    if (key.startsWith('DB_') && isTest) continue; // DB_* not required in tests
    if (!process.env[key] || String(process.env[key]).length === 0) missing.push(key);
  }
  return { ok: missing.length === 0, missing };
}

async function checkDbConnectivity() {
  if (process.env.NODE_ENV === 'test') return { ok: true, skipped: true, reason: 'Using SQLite in tests' };
  let { Sequelize } = require('sequelize');
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'postgres',
      port: Number(process.env.DB_PORT || 5432),
      logging: false,
    }
  );
  try {
    await sequelize.authenticate();
    await sequelize.close();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

function checkPort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve({ ok: false }));
    server.once('listening', () => server.close(() => resolve({ ok: true })));
    server.listen(port, '0.0.0.0');
  });
}

(async function main() {
  console.log('🔎 Inventarium Backend Doctor');

  const node = checkNodeVersion();
  console.log(`- Node.js: ${node.version} (required ${node.required}) ${node.ok ? '✅' : '❌'}`);

  const envFile = checkFileExists('.env');
  console.log(`- .env file: ${envFile.ok ? `found at ${envFile.path} ✅` : 'missing ❌ (copy backend/.env.example to backend/.env)'}`);

  const deps = checkDepsInstalled();
  console.log(`- Dependencies installed: ${deps.ok ? '✅' : `❌ (${(deps.problems || []).length} issues)`}`);

  const envs = checkEnvVars();
  console.log(`- Required env vars: ${envs.ok ? '✅' : `❌ missing: ${envs.missing.join(', ')}`}`);

  const db = await checkDbConnectivity();
  console.log(`- Database connectivity: ${db.ok ? '✅' : `❌ ${db.error || db.reason}`}`);

  const port4000 = await checkPort(4000);
  console.log(`- Port 4000 availability: ${port4000.ok ? '✅ free' : '❌ busy (another process is using it)'}`);

  const allOk = node.ok && deps.ok && envs.ok && db.ok && port4000.ok;
  console.log(`\n${allOk ? '🎉 Your environment looks good!' : '⚠️ Please fix the issues above and re-run: npm run doctor'}`);
  process.exit(allOk ? 0 : 1);
})();
