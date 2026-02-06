const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT_DIR = path.resolve(__dirname, "../..");
const DOCS = [
  {
    name: "ROAR_TASK_DEPENDENCIES",
    mdPath: path.join(ROOT_DIR, "schema_tools/ROAR_TASK_DEPENDENCIES.md"),
    erdPath: path.join(ROOT_DIR, "schema_tools/ROAR_TASK_DEPENDENCIES.erd.mmd"),
    svgPath: path.join(ROOT_DIR, "schema_tools/ROAR_TASK_DEPENDENCIES.erd.svg"),
  },
  {
    name: "ROAR_FIREKIT_SCHEMA_MAPPING",
    mdPath: path.join(ROOT_DIR, "schema_tools/ROAR_FIREKIT_SCHEMA_MAPPING.md"),
    erdPath: path.join(ROOT_DIR, "schema_tools/ROAR_FIREKIT_SCHEMA_MAPPING.erd.mmd"),
    svgPath: path.join(ROOT_DIR, "schema_tools/ROAR_FIREKIT_SCHEMA_MAPPING.erd.svg"),
  },
];

const MERMAID_CONFIG_PATH = path.join(ROOT_DIR, "schema_tools/mermaid.roar.config.json");

const args = new Set(process.argv.slice(2));
const shouldWrite = args.has("--write");
const verbose = args.has("--verbose");
const useConfig = args.has("--use-config");
const force = args.has("--force");

const extractMermaid = (markdown, label) => {
  const match = markdown.match(/```mermaid\s*([\s\S]*?)```/);
  if (!match) {
    throw new Error(`No Mermaid block found in ${label}.`);
  }
  return `${match[1].trim()}\n`;
};

const readFile = (filePath) => fs.readFileSync(filePath, "utf8");

const writeIfChanged = (filePath, content) => {
  const exists = fs.existsSync(filePath);
  const current = exists ? fs.readFileSync(filePath, "utf8") : null;
  if (current === content) return false;
  if (shouldWrite) {
    fs.writeFileSync(filePath, content, "utf8");
  }
  return true;
};

const renderSvg = (inputPath, outputPath) => {
  const configArg = useConfig && fs.existsSync(MERMAID_CONFIG_PATH) ? ` -c "${MERMAID_CONFIG_PATH}"` : "";
  const command = `npx -y @mermaid-js/mermaid-cli -i "${inputPath}" -o "${outputPath}"${configArg}`;
  if (verbose) {
    console.log(command);
  }
  execSync(command, { stdio: "inherit" });
};

const run = () => {
  const changes = [];
  DOCS.forEach((doc) => {
    const mdText = readFile(doc.mdPath);
    const erdText = extractMermaid(mdText, doc.mdPath);
    const erdChanged = writeIfChanged(doc.erdPath, erdText);
    if (erdChanged) {
      changes.push(`${path.relative(ROOT_DIR, doc.erdPath)} (updated)`);
    }

    const svgMissing = !fs.existsSync(doc.svgPath);
    if (shouldWrite && (force || erdChanged || svgMissing)) {
      renderSvg(doc.erdPath, doc.svgPath);
      changes.push(`${path.relative(ROOT_DIR, doc.svgPath)} (rendered)`);
    }
  });

  if (!shouldWrite) {
    if (changes.length === 0) {
      console.log("No changes detected. Use --write to update outputs.");
      return;
    }
    console.log("Planned updates (run with --write to apply):");
  } else if (changes.length === 0) {
    console.log("No changes detected.");
    return;
  } else {
    console.log("Updated files:");
  }

  changes.forEach((change) => console.log(`- ${change}`));
};

run();
