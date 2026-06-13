#!/usr/bin/env node
import { createCipheriv, pbkdf2Sync, randomBytes } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const DEFAULT_OUTPUT = "docs/assets/pod-passwords.enc.json";
const ITERATIONS = 250000;

function usage() {
  console.error(
    [
      "Usage:",
      "  POD_PASSWORD_PASSPHRASE='lab passcode' node scripts/encrypt-pod-passwords.mjs data/pod-passwords.plain.json",
      "  POD_PASSWORD_PASSPHRASE='lab passcode' node scripts/encrypt-pod-passwords.mjs --from-js docs/javascripts/pod-lookup.js",
      "",
      "Optional:",
      "  POD_PASSWORD_OUTPUT=docs/assets/pod-passwords.enc.json"
    ].join("\n")
  );
}

function parsePlainJson(path) {
  const parsed = JSON.parse(readFileSync(path, "utf8"));
  if (parsed && typeof parsed === "object" && parsed.pods) {
    return Object.fromEntries(
      Object.entries(parsed.pods).map(([podNumber, pod]) => [podNumber, pod.password])
    );
  }
  return parsed;
}

function parsePasswordsFromJs(path) {
  const source = readFileSync(path, "utf8");
  const passwords = {};
  const podPattern = /(\d+):\s*\{[\s\S]*?password:\s*"((?:\\.|[^"\\])*)"/g;
  let match;

  while ((match = podPattern.exec(source)) !== null) {
    passwords[match[1]] = JSON.parse(`"${match[2]}"`);
  }

  return passwords;
}

function assertPasswordMap(passwords) {
  if (!passwords || typeof passwords !== "object" || Array.isArray(passwords)) {
    throw new Error("Input must be an object keyed by POD number.");
  }

  for (const [podNumber, password] of Object.entries(passwords)) {
    if (!/^\d+$/.test(podNumber) || typeof password !== "string" || password.length === 0) {
      throw new Error(`Invalid password entry for POD ${podNumber}.`);
    }
  }
}

const args = process.argv.slice(2);
const passphrase = process.env.POD_PASSWORD_PASSPHRASE;
const output = process.env.POD_PASSWORD_OUTPUT || DEFAULT_OUTPUT;

if (!passphrase || args.length === 0) {
  usage();
  process.exit(1);
}

const passwords =
  args[0] === "--from-js" ? parsePasswordsFromJs(resolve(args[1] || "")) : parsePlainJson(resolve(args[0]));

assertPasswordMap(passwords);

const salt = randomBytes(16);
const iv = randomBytes(12);
const key = pbkdf2Sync(passphrase, salt, ITERATIONS, 32, "sha256");
const cipher = createCipheriv("aes-256-gcm", key, iv);
const plaintext = Buffer.from(JSON.stringify(passwords), "utf8");
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const tag = cipher.getAuthTag();

writeFileSync(
  output,
  `${JSON.stringify(
    {
      version: 1,
      algorithm: "AES-GCM",
      kdf: "PBKDF2",
      hash: "SHA-256",
      iterations: ITERATIONS,
      salt: salt.toString("base64"),
      iv: iv.toString("base64"),
      ciphertext: Buffer.concat([encrypted, tag]).toString("base64")
    },
    null,
    2
  )}\n`
);

console.log(`Encrypted ${Object.keys(passwords).length} POD passwords to ${output}`);
