const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const { execSync } = require("child_process");

const ROOT_DIR = path.resolve(__dirname, "..");
const DEFAULT_BASE = "origin/main";
const SCHEMA_PATH = "apps/server/levante-firebase-functions/functions/levante-admin/firestore-schema.ts";
const README_PATH = "README_FIREBASE_SCHEMA.md";
const DATA_START = "<!-- schema:snapshot:data";
const DATA_END = "schema:snapshot:data -->";

const args = process.argv.slice(2);
const isVerbose = args.includes("--verbose");
const preferSnapshot = args.includes("--prefer-snapshot");
const preferGit = args.includes("--prefer-git");

const readArgValue = (flag) => {
  const flagIndex = args.indexOf(flag);
  if (flagIndex === -1) return null;
  const next = args[flagIndex + 1];
  return next && !next.startsWith("--") ? next : null;
};

const baseRef = readArgValue("--base") || DEFAULT_BASE;

const normalizeType = (typeText) =>
  typeText.replace(/\s+/g, " ").replace(/;\s*$/, "").trim();

const getInterfaceSnapshot = (sourceFile) => {
  const interfaces = {};

  const visit = (node) => {
    if (ts.isInterfaceDeclaration(node)) {
      const isExported =
        node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) ?? false;
      if (!isExported) {
        ts.forEachChild(node, visit);
        return;
      }

      const name = node.name.text;
      const properties = {};

      node.members.forEach((member) => {
        if (ts.isPropertySignature(member)) {
          const propName = member.name.getText(sourceFile).replace(/^"|"$/g, "");
          const propType = member.type ? normalizeType(member.type.getText(sourceFile)) : "unknown";
          properties[propName] = {
            type: propType,
            optional: Boolean(member.questionToken),
          };
        }

        if (ts.isIndexSignatureDeclaration(member)) {
          const keyParam = member.parameters[0];
          const keyName = keyParam?.name?.getText(sourceFile) || "key";
          const keyType = keyParam?.type ? normalizeType(keyParam.type.getText(sourceFile)) : "unknown";
          const valueType = member.type ? normalizeType(member.type.getText(sourceFile)) : "unknown";
          const indexName = `[${keyName}: ${keyType}]`;
          properties[indexName] = {
            type: valueType,
            optional: false,
          };
        }
      });

      interfaces[name] = { properties };
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  return { interfaces };
};

const buildSnapshotFromText = (schemaText, sourcePath) => {
  const sourceFile = ts.createSourceFile(
    sourcePath,
    schemaText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );
  return getInterfaceSnapshot(sourceFile);
};

const diffSnapshots = (previous, next) => {
  const breaking = [];
  const notes = [];

  const prevInterfaces = previous.interfaces || {};
  const nextInterfaces = next.interfaces || {};

  Object.keys(prevInterfaces).forEach((iface) => {
    if (!nextInterfaces[iface]) {
      breaking.push(`Interface removed: ${iface}`);
      return;
    }

    const prevProps = prevInterfaces[iface].properties || {};
    const nextProps = nextInterfaces[iface].properties || {};

    Object.keys(prevProps).forEach((prop) => {
      if (!nextProps[prop]) {
        breaking.push(`Field removed: ${iface}.${prop}`);
        return;
      }

      const prevField = prevProps[prop];
      const nextField = nextProps[prop];
      if (prevField.optional && !nextField.optional) {
        breaking.push(`Field made required: ${iface}.${prop}`);
      }
      if (prevField.type !== nextField.type) {
        breaking.push(`Field type changed: ${iface}.${prop} (${prevField.type} → ${nextField.type})`);
      }
    });
  });

  Object.keys(nextInterfaces).forEach((iface) => {
    if (!prevInterfaces[iface]) {
      notes.push(`Interface added: ${iface}`);
      return;
    }

    const prevProps = prevInterfaces[iface].properties || {};
    const nextProps = nextInterfaces[iface].properties || {};

    Object.keys(nextProps).forEach((prop) => {
      if (!prevProps[prop]) {
        notes.push(`Field added: ${iface}.${prop}`);
      }
    });
  });

  return { breaking, notes };
};

const loadSnapshotFromReadme = (readmeText) => {
  const dataMatch = new RegExp(`${DATA_START}([\\s\\S]*?)${DATA_END}`).exec(readmeText);
  if (!dataMatch) return null;
  try {
    return JSON.parse(dataMatch[1].trim());
  } catch (error) {
    return null;
  }
};

const getBaseSchemaInfo = () => {
  try {
    const mergeBase = execSync(`git merge-base ${baseRef} HEAD`, {
      cwd: ROOT_DIR,
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();

    const schemaText = execSync(`git show ${mergeBase}:${SCHEMA_PATH}`, {
      cwd: ROOT_DIR,
      stdio: ["ignore", "pipe", "pipe"],
    }).toString();

    const baseTimestamp = Number(
      execSync(`git show -s --format=%ct ${mergeBase}`, {
        cwd: ROOT_DIR,
        stdio: ["ignore", "pipe", "ignore"],
      })
        .toString()
        .trim()
    );

    return { schemaText, baseTimestamp };
  } catch (error) {
    return null;
  }
};

const currentSchemaText = fs.readFileSync(path.join(ROOT_DIR, SCHEMA_PATH), "utf8");
const baseSchemaInfo = getBaseSchemaInfo();

const readmeText = fs.readFileSync(path.join(ROOT_DIR, README_PATH), "utf8");
const snapshotFromReadme = loadSnapshotFromReadme(readmeText);
const snapshotTimestamp = snapshotFromReadme?.generatedAt
  ? Date.parse(snapshotFromReadme.generatedAt)
  : null;

let baselineSnapshot = null;
let baselineLabel = null;

if (preferSnapshot && snapshotFromReadme) {
  baselineSnapshot = snapshotFromReadme;
  baselineLabel = "README snapshot (forced)";
} else if (preferGit && baseSchemaInfo) {
  baselineSnapshot = buildSnapshotFromText(baseSchemaInfo.schemaText, `${SCHEMA_PATH}@${baseRef}`);
  baselineLabel = `git base (${baseRef}, forced)`;
} else if (baseSchemaInfo && snapshotTimestamp) {
  const baseTimeMs = baseSchemaInfo.baseTimestamp * 1000;
  if (snapshotTimestamp > baseTimeMs) {
    baselineSnapshot = snapshotFromReadme;
    baselineLabel = "README snapshot";
  } else {
    baselineSnapshot = buildSnapshotFromText(baseSchemaInfo.schemaText, `${SCHEMA_PATH}@${baseRef}`);
    baselineLabel = `git base (${baseRef})`;
  }
} else if (baseSchemaInfo) {
  baselineSnapshot = buildSnapshotFromText(baseSchemaInfo.schemaText, `${SCHEMA_PATH}@${baseRef}`);
  baselineLabel = `git base (${baseRef})`;
} else if (snapshotFromReadme) {
  baselineSnapshot = snapshotFromReadme;
  baselineLabel = "README snapshot";
} else {
  console.error(`Unable to read schema from base ref: ${baseRef} or README snapshot.`);
  process.exit(2);
}

const currentSnapshot = buildSnapshotFromText(currentSchemaText, SCHEMA_PATH);

if (isVerbose && baselineLabel) {
  console.log(`Baseline: ${baselineLabel}`);
  console.log("");
}

const { breaking, notes } = diffSnapshots(baselineSnapshot, currentSnapshot);

if (breaking.length > 0) {
  console.log("Schema integrity check failed. Potential breaking changes:");
  breaking.forEach((item) => console.log(`- ${item}`));
  console.log("");
  if (isVerbose && notes.length > 0) {
    console.log("Non-breaking changes:");
    notes.forEach((item) => console.log(`- ${item}`));
    console.log("");
  }
  process.exit(1);
}

console.log("Schema integrity check passed.");

if (isVerbose && notes.length > 0) {
  console.log("");
  console.log("Non-breaking changes:");
  notes.forEach((item) => console.log(`- ${item}`));
}
