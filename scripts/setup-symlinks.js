#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const os = require("os");

const WORKSPACE_ROOT = path.resolve(__dirname, "..");
const DASHBOARD_NAME = "levante-dashboard";
const FUNCTIONS_NAME = "levante-firebase-functions";

const DASHBOARD_LINK = path.join(
  WORKSPACE_ROOT,
  "apps",
  "client",
  "levante-dashboard"
);
const FUNCTIONS_LINK = path.join(
  WORKSPACE_ROOT,
  "apps",
  "server",
  "levante-firebase-functions"
);

const DEFAULT_SEARCH_ROOTS = [
  os.homedir(),
  path.join(os.homedir(), "Documents"),
  path.join(os.homedir(), "dev"),
  path.join(os.homedir(), "code"),
  path.join(os.homedir(), "projects"),
  path.join(os.homedir(), "workspace"),
];

const IGNORE_DIRS = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  ".cache",
  ".turbo",
  ".next",
  ".vite",
]);

const MAX_DEPTH = 4;
const MAX_ENTRIES = 20000;

let scannedEntries = 0;

const pad = (value) => String(value).padStart(2, "0");

const timestamp = () => {
  const now = new Date();
  return [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join("");
};

const pathExists = async (target) => {
  try {
    await fs.promises.lstat(target);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
};

const backupIfNeeded = async (linkPath) => {
  try {
    const stats = await fs.promises.lstat(linkPath);
    if (!stats.isSymbolicLink()) {
      const backupPath = `${linkPath}.local-backup-${timestamp()}`;
      console.log(`Backing up ${linkPath} -> ${backupPath}`);
      await fs.promises.rename(linkPath, backupPath);
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
};

const createLink = async (target, linkPath) => {
  await backupIfNeeded(linkPath);
  try {
    await fs.promises.unlink(linkPath);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  await fs.promises.symlink(target, linkPath);
  console.log(`Linked ${linkPath} -> ${target}`);
};

const findRepoByName = async (repoName, roots) => {
  const queue = roots
    .map((root) => ({ dir: root, depth: 0 }))
    .filter((entry) => entry.dir);

  while (queue.length > 0) {
    const { dir, depth } = queue.shift();

    if (scannedEntries >= MAX_ENTRIES) {
      return null;
    }

    let entries;
    try {
      entries = await fs.promises.readdir(dir, { withFileTypes: true });
    } catch (error) {
      continue;
    }

    for (const entry of entries) {
      scannedEntries += 1;
      if (scannedEntries >= MAX_ENTRIES) {
        return null;
      }

      if (!entry.isDirectory()) continue;
      if (IGNORE_DIRS.has(entry.name)) continue;

      const fullPath = path.join(dir, entry.name);

      if (entry.name === repoName) {
        return fullPath;
      }

      if (depth < MAX_DEPTH) {
        queue.push({ dir: fullPath, depth: depth + 1 });
      }
    }
  }

  return null;
};

const resolveRepo = async (envValue, repoName) => {
  if (envValue) {
    return path.resolve(envValue);
  }

  const roots = DEFAULT_SEARCH_ROOTS.filter(
    (root) => root && fs.existsSync(root)
  );

  return findRepoByName(repoName, roots);
};

const main = async () => {
  try {
    const dashboardRepo = await resolveRepo(
      process.env.DASHBOARD_REPO,
      DASHBOARD_NAME
    );
    const functionsRepo = await resolveRepo(
      process.env.FUNCTIONS_REPO,
      FUNCTIONS_NAME
    );

    if (!dashboardRepo) {
      console.error(
        `Could not locate ${DASHBOARD_NAME}. Set DASHBOARD_REPO to the path.`
      );
      process.exitCode = 1;
      return;
    }

    if (!functionsRepo) {
      console.error(
        `Could not locate ${FUNCTIONS_NAME}. Set FUNCTIONS_REPO to the path.`
      );
      process.exitCode = 1;
      return;
    }

    if (!(await pathExists(dashboardRepo))) {
      console.error(`Dashboard path does not exist: ${dashboardRepo}`);
      process.exitCode = 1;
      return;
    }

    if (!(await pathExists(functionsRepo))) {
      console.error(`Functions path does not exist: ${functionsRepo}`);
      process.exitCode = 1;
      return;
    }

    await createLink(dashboardRepo, DASHBOARD_LINK);
    await createLink(functionsRepo, FUNCTIONS_LINK);
  } catch (error) {
    console.error(error?.message || error);
    process.exitCode = 1;
  }
};

main();
