#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

const appRoot = path.resolve(__dirname, "..");
const outputArg = process.argv[2] || ".env.local";
const outputPath = path.isAbsolute(outputArg)
  ? outputArg
  : path.join(appRoot, outputArg);

function runGitCommand(command) {
  try {
    return execSync(command, {
      cwd: appRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch (error) {
    return "";
  }
}

function getVersion() {
  const describe = runGitCommand("git describe --tags --always --dirty");
  const latestTag = runGitCommand("git describe --tags --abbrev=0");

  if (latestTag && describe && latestTag !== describe) {
    return `${latestTag} (${describe})`;
  }

  if (describe) {
    return describe;
  }

  try {
    const packageJsonPath = path.join(appRoot, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    return `v${packageJson.version}`;
  } catch (error) {
    return "local-dev";
  }
}

function writeEnvVersion(filePath, version) {
  let existing = "";
  if (fs.existsSync(filePath)) {
    existing = fs.readFileSync(filePath, "utf8");
  }

  const filtered = existing
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith("NEXT_PUBLIC_APP_VERSION="));

  filtered.push(`NEXT_PUBLIC_APP_VERSION=${version}`);
  const nextContent = `${filtered.join("\n")}\n`;

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, nextContent, "utf8");
}

const version = getVersion();
writeEnvVersion(outputPath, version);

console.log(`Wrote NEXT_PUBLIC_APP_VERSION=${version} to ${outputPath}`);

