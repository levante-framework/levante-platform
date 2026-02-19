import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const pipelineDir = path.resolve(path.dirname(new URL(import.meta.url).pathname));
const schemaToolsDir = path.resolve(pipelineDir, '..');
const contractPath = path.resolve(schemaToolsDir, 'PIPELINE_DATA_CONTRACT.json');

const shouldWrite = process.argv.includes('--write');

function parseCsvHeader(headerLine) {
  const columns = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < headerLine.length; i += 1) {
    const ch = headerLine[i];
    const next = headerLine[i + 1];

    if (ch === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
      continue;
    }

    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (ch === ',' && !inQuotes) {
      columns.push(current.trim());
      current = '';
      continue;
    }

    current += ch;
  }

  columns.push(current.trim());
  return columns.filter(Boolean);
}

function readHeaderColumns(csvPath) {
  const contents = fs.readFileSync(csvPath, 'utf8');
  const firstLine = contents.split(/\r?\n/, 1)[0] ?? '';
  if (!firstLine.trim()) throw new Error(`Empty CSV header in ${csvPath}`);
  return parseCsvHeader(firstLine);
}

function setNestedValue(root, pathSegments, value) {
  let node = root;
  for (let i = 0; i < pathSegments.length - 1; i += 1) {
    node = node[pathSegments[i]];
  }
  const leaf = pathSegments[pathSegments.length - 1];
  node[leaf] = value;
}

function getNestedValue(root, pathSegments) {
  let node = root;
  for (const segment of pathSegments) {
    node = node?.[segment];
  }
  return node;
}

function sameArray(a = [], b = []) {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return false;
  return a.every((value, index) => value === b[index]);
}

if (!fs.existsSync(contractPath)) {
  throw new Error(`Contract file not found: ${contractPath}`);
}

const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

const mappings = [
  {
    csv: path.resolve(pipelineDir, 'fixtures/task_trials_prelim_fixture.csv'),
    contractKey: ['pilotsContracts', 'taskData', 'requiredColumns'],
  },
  {
    csv: path.resolve(pipelineDir, 'fixtures/survey_data_fixture.csv'),
    contractKey: ['pilotsContracts', 'surveyData', 'requiredColumns'],
  },
  {
    csv: path.resolve(pipelineDir, 'fixtures/stage02_scores_fixture.csv'),
    contractKey: ['pilotsContracts', 'stage02Scores', 'requiredColumns'],
  },
  {
    csv: path.resolve(pipelineDir, 'fixtures/stage03_scores_counts_fixture.csv'),
    contractKey: ['pilotsContracts', 'stage03Summaries', 'requiredColumns'],
  },
  {
    csv: path.resolve(pipelineDir, 'fixtures/stage03_explore_fixture.csv'),
    contractKey: ['pilotsContracts', 'stage03ExploreTasks', 'requiredInputColumns'],
  },
  {
    csv: path.resolve(pipelineDir, 'fixtures/stage04_papers_scores_fixture.csv'),
    contractKey: ['pilotsContracts', 'stage04Papers', 'requiredInputColumns'],
  },
  {
    csv: path.resolve(pipelineDir, 'fixtures/stage04_papers_reliability_fixture.csv'),
    contractKey: ['pilotsContracts', 'stage04Papers', 'requiredReliabilityColumns'],
  },
];

let changed = false;

for (const mapping of mappings) {
  const nextColumns = readHeaderColumns(mapping.csv);
  const currentColumns = getNestedValue(contract, mapping.contractKey);
  const keyLabel = mapping.contractKey.join('.');

  if (sameArray(currentColumns, nextColumns)) {
    console.log(`No change: ${keyLabel}`);
    continue;
  }

  changed = true;
  console.log(`Updated: ${keyLabel}`);
  console.log(`  old: ${JSON.stringify(currentColumns ?? [])}`);
  console.log(`  new: ${JSON.stringify(nextColumns)}`);
  setNestedValue(contract, mapping.contractKey, nextColumns);
}

if (!changed) {
  console.log('Contract already matches fixture headers.');
  process.exit(0);
}

if (!shouldWrite) {
  console.log('\nDry run only. Re-run with --write to save contract changes.');
  process.exit(0);
}

const now = new Date();
contract.updatedAt = now.toISOString().slice(0, 10);
fs.writeFileSync(contractPath, `${JSON.stringify(contract, null, 2)}\n`, 'utf8');
console.log(`\nWrote updated contract: ${contractPath}`);
