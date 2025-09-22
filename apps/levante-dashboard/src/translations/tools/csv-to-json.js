import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function readCsv(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data } = Papa.parse(raw, { header: true, skipEmptyLines: true });
  // Papa with header:true returns objects; ensure array of records
  return Array.isArray(data) ? data : [];
}

function isLocaleHeader(header) {
  if (!header) return false;
  const lower = String(header).toLowerCase();
  // identifier and label are metadata; anything else is a locale column
  if (lower === 'identifier' || lower === 'label') return false;
  return true;
}

function unescapeCsvValue(value) {
  if (value == null) return '';
  const s = String(value);
  // Values were escaped to literal \n and \r in CSV generation
  return s.replaceAll('\\n', '\n').replaceAll('\\r', '\r');
}

function setNested(messages, identifier, value) {
  if (!identifier) return;
  // Normalize: turn section/key paths like "auth/consent.acceptButton" into dot notation
  const normalized = identifier.replaceAll('/', '.');
  const parts = normalized.split('.').filter(Boolean);
  let node = messages;
  for (let i = 0; i < parts.length; i += 1) {
    const key = parts[i];
    const isLeaf = i === parts.length - 1;
    if (isLeaf) {
      node[key] = value;
    } else {
      if (!node[key] || typeof node[key] !== 'object') node[key] = {};
      node = node[key];
    }
  }
}

function localeToPathParts(localeRaw) {
  const originalLocale = String(localeRaw);
  const locale = originalLocale.toLowerCase();
  if (locale.includes('-')) {
    const [lang, region] = locale.split('-');
    return { dir: path.join('src', 'translations', lang, region), filename: `${originalLocale}-componentTranslations.json` };
  }
  return { dir: path.join('src', 'translations', locale), filename: `${originalLocale}-componentTranslations.json` };
}

function listCsvFiles() {
  const roots = [
    path.join('src', 'translations', 'consolidated'),
    path.join('src', 'translations', 'consolidated', 'components'),
  ];
  const files = [];
  for (const root of roots) {
    if (!fs.existsSync(root)) continue;
    const entries = fs.readdirSync(root);
    for (const entry of entries) {
      const fp = path.join(root, entry);
      if (fs.statSync(fp).isFile() && fp.toLowerCase().endsWith('.csv')) files.push(fp);
    }
  }
  return files;
}

function mergeDeep(target, source) {
  for (const key of Object.keys(source)) {
    const value = source[key];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      if (!target[key] || typeof target[key] !== 'object') target[key] = {};
      mergeDeep(target[key], value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

function validateCsvRows(rows, filePath) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const required = ['identifier', 'label'];
  const missing = required.filter((h) => !headers.includes(h));
  if (missing.length) {
    throw new Error(`CSV ${filePath} missing required columns: ${missing.join(', ')}`);
  }
  const seen = new Set();
  for (const row of rows) {
    const id = (row.identifier || '').trim();
    if (!id) throw new Error(`CSV ${filePath} has empty identifier`);
    if (seen.has(id)) throw new Error(`CSV ${filePath} has duplicate identifier: ${id}`);
    seen.add(id);
  }
}

function main() {
  console.log('🔄 Building legacy per-locale JSON from consolidated CSVs...');
  const csvFiles = listCsvFiles();
  if (!csvFiles.length) {
    console.log('No CSV files found under src/translations/consolidated. Nothing to do.');
    return;
  }

  /** @type {Record<string, any>} */
  const perLocaleMessages = {};
  /** @type {Record<string, string>} */
  const originalCaseMapping = {};

  for (const csvPath of csvFiles) {
    const rows = readCsv(csvPath);
    validateCsvRows(rows, csvPath);
    if (!rows.length) continue;
    const headers = Object.keys(rows[0]);
    const localeHeaders = headers.filter(isLocaleHeader);

    for (const row of rows) {
      const identifier = (row.identifier || '').trim();
      if (!identifier) continue;

      for (const header of localeHeaders) {
        const localeKey = String(header).toLowerCase();
        const originalHeader = String(header);
        const value = unescapeCsvValue(row[header] ?? '');
        if (!perLocaleMessages[localeKey]) perLocaleMessages[localeKey] = {};
        originalCaseMapping[localeKey] = originalHeader;
        setNested(perLocaleMessages[localeKey], identifier, value);
      }
    }
  }

  // Write one JSON file per locale
  const locales = Object.keys(perLocaleMessages);
  if (!locales.length) {
    console.log('No locales detected in CSVs. Nothing to write.');
    return;
  }

  for (const locale of locales) {
    const originalLocale = originalCaseMapping[locale] || locale;
    const { dir, filename } = localeToPathParts(originalLocale);
    ensureDir(dir);
    const outPath = path.join(dir, filename);

    const nextContent = JSON.stringify(perLocaleMessages[locale], null, 2);
    if (fs.existsSync(outPath)) {
      const prev = fs.readFileSync(outPath, 'utf8');
      if (prev === nextContent) {
        console.log(`⏭  Skipped (unchanged) ${outPath}`);
        continue;
      }
    }

    fs.writeFileSync(outPath, nextContent);
    console.log(`✅ Wrote ${outPath}`);
  }
}

main();
