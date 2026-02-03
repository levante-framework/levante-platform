const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const crypto = require("crypto");

const ROOT_DIR = path.resolve(__dirname, "../..");
const SCHEMA_PATH = path.join(
  ROOT_DIR,
  "apps/server/levante-firebase-functions/functions/levante-admin/firestore-schema.ts"
);
const DEFAULT_README_PATH = path.join(
  ROOT_DIR,
  "schema_tools/README_FIREBASE_SCHEMA.md"
);
const VALIDATOR_MAPPING_PATH = path.join(
  ROOT_DIR,
  "schema_tools/SCHEMA_VALIDATOR_MAPPING.md"
);
const VALIDATOR_CONTRACT_PATH = path.join(
  ROOT_DIR,
  "schema_tools/SCHEMA_VALIDATOR_CONTRACT.md"
);

const BLOCK_START = "<!-- schema:snapshot:start -->";
const BLOCK_END = "<!-- schema:snapshot:end -->";
const DATA_START = "<!-- schema:snapshot:data";
const DATA_END = "schema:snapshot:data -->";

const args = process.argv.slice(2);
const isWrite = args.includes("--write");
const outputPaths = [];
let jsonOutputPath = null;

for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];
  if (arg === "--out") {
    const next = args[index + 1];
    if (next && !next.startsWith("--")) {
      outputPaths.push(path.resolve(ROOT_DIR, next));
      index += 1;
    }
  }
  if (arg.startsWith("--out=")) {
    outputPaths.push(path.resolve(ROOT_DIR, arg.replace("--out=", "")));
  }
  if (arg === "--json-out") {
    const next = args[index + 1];
    if (next && !next.startsWith("--")) {
      jsonOutputPath = path.resolve(ROOT_DIR, next);
      index += 1;
    }
  }
  if (arg.startsWith("--json-out=")) {
    jsonOutputPath = path.resolve(ROOT_DIR, arg.replace("--json-out=", ""));
  }
}

if (outputPaths.length === 0) {
  outputPaths.push(DEFAULT_README_PATH);
}

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

  return { generatedAt: new Date().toISOString(), interfaces };
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

const diffSnapshots = (previous, next) => {
  if (!previous) {
    return { breaking: [], notes: ["No previous snapshot found."] };
  }

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

const buildSnapshotMarkdown = (snapshot) => {
  const lines = [];
  lines.push("### Schema snapshot (auto)");
  lines.push("");
  lines.push(`Source: \`${path.relative(ROOT_DIR, SCHEMA_PATH)}\``);
  lines.push("Generated by `node scripts/update-schema-docs.js`");
  lines.push("");
  lines.push(`${DATA_START}`);
  lines.push(JSON.stringify(snapshot, null, 2));
  lines.push(`${DATA_END}`);
  lines.push("");

  Object.keys(snapshot.interfaces)
    .sort()
    .forEach((iface) => {
      lines.push(`#### ${iface}`);
      const properties = snapshot.interfaces[iface].properties || {};
      const propNames = Object.keys(properties).sort();
      if (propNames.length === 0) {
        lines.push("- (no fields)");
        lines.push("");
        return;
      }

      propNames.forEach((prop) => {
        const info = properties[prop];
        const optionalFlag = info.optional ? "optional" : "required";
        lines.push(`- \`${prop}\` — \`${info.type}\` (${optionalFlag})`);
      });
      lines.push("");
    });

  return lines.join("\n");
};

const updateReadme = (readmeText, newBlock) => {
  const blockRegex = new RegExp(
    `${BLOCK_START}[\\s\\S]*?${BLOCK_END}`,
    "m"
  );

  if (blockRegex.test(readmeText)) {
    return readmeText.replace(
      blockRegex,
      `${BLOCK_START}\n${newBlock}\n${BLOCK_END}`
    );
  }

  return `${readmeText.trim()}\n\n${BLOCK_START}\n${newBlock}\n${BLOCK_END}\n`;
};

const updateMetaBlock = (fileText, startMarker, endMarker, content) => {
  const blockRegex = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`, "m");
  if (blockRegex.test(fileText)) {
    return fileText.replace(blockRegex, `${startMarker}\n${content}\n${endMarker}`);
  }
  return `${fileText.trim()}\n\n${startMarker}\n${content}\n${endMarker}\n`;
};

const schemaText = fs.readFileSync(SCHEMA_PATH, "utf8");
const schemaHash = crypto.createHash("sha256").update(schemaText).digest("hex");
const updatedAt = new Date().toISOString();
const sourceFile = ts.createSourceFile(
  SCHEMA_PATH,
  schemaText,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS
);

const nextSnapshot = getInterfaceSnapshot(sourceFile);
const primaryReadmeText = fs.readFileSync(outputPaths[0], "utf8");
const previousSnapshot = loadSnapshotFromReadme(primaryReadmeText);
const { breaking, notes } = diffSnapshots(previousSnapshot, nextSnapshot);

if (breaking.length > 0) {
  console.log("Potential breaking changes:");
  breaking.forEach((item) => console.log(`- ${item}`));
  console.log("");
} else {
  console.log("No breaking changes detected.");
  console.log("");
}

if (notes.length > 0) {
  console.log("Non-breaking changes:");
  notes.forEach((item) => console.log(`- ${item}`));
  console.log("");
}

if (!isWrite) {
  console.log("Dry run. Re-run with --write to update markdown outputs.");
  process.exit(0);
}

const newBlock = buildSnapshotMarkdown(nextSnapshot);
outputPaths.forEach((readmePath) => {
  const readmeText = fs.readFileSync(readmePath, "utf8");
  const updatedReadme = updateReadme(readmeText, newBlock);
  fs.writeFileSync(readmePath, updatedReadme, "utf8");
  console.log(`Updated ${path.relative(ROOT_DIR, readmePath)}.`);
});

const metaContent = [
  "Schema source: `apps/server/levante-firebase-functions/functions/levante-admin/firestore-schema.ts`",
  `Schema sha256: \`${schemaHash}\``,
  `Last synced: \`${updatedAt}\``,
].join("\n");

const syncMeta = (filePath) => {
  const startMarker = "<!-- schema:validator:meta:start -->";
  const endMarker = "<!-- schema:validator:meta:end -->";
  const fileText = fs.readFileSync(filePath, "utf8");
  const updatedText = updateMetaBlock(fileText, startMarker, endMarker, metaContent);
  fs.writeFileSync(filePath, updatedText, "utf8");
  console.log(`Updated ${path.relative(ROOT_DIR, filePath)} metadata.`);
};

syncMeta(VALIDATOR_MAPPING_PATH);
syncMeta(VALIDATOR_CONTRACT_PATH);

if (jsonOutputPath) {
  fs.writeFileSync(
    jsonOutputPath,
    JSON.stringify(nextSnapshot, null, 2),
    "utf8"
  );
  console.log(`Wrote ${path.relative(ROOT_DIR, jsonOutputPath)}.`);
}
