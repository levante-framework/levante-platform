#!/usr/bin/env node
import 'dotenv/config';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';

function parseArgs(argv) {
  const args = {
    siteName: process.env.E2E_SITE_NAME || 'ai-tests',
    cohortName: undefined,
    adminEmail: process.env.E2E_AI_SITE_ADMIN_EMAIL,
    force: true,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--site-name') args.siteName = argv[++i];
    else if (a === '--cohort-name') args.cohortName = argv[++i];
    else if (a === '--admin-email') args.adminEmail = argv[++i];
    else if (a === '--force') args.force = true;
  }
  return args;
}

function normalize(input) {
  return String(input).trim().toLowerCase();
}

async function findDistrict(db, name) {
  const snap = await db.collection('districts').where('normalizedName', '==', normalize(name)).limit(1).get();
  return snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() };
}

async function createCohortGroup(db, districtId, cohortName) {
  const ref = db.collection('groups').doc();
  await ref.set({
    archived: false,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    createdBy: 'e2e-seeder',
    parentOrgId: districtId,
    parentOrgType: 'district',
    name: cohortName,
    normalizedName: normalize(cohortName),
    tags: ['e2e'],
  });
  return { id: ref.id, name: cohortName };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const envProject =
    process.env.E2E_FIREBASE_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID ||
    process.env.GOOGLE_CLOUD_PROJECT ||
    process.env.GCLOUD_PROJECT ||
    'hs-levante-admin-dev';

  initializeApp({ projectId: envProject, credential: applicationDefault() });
  const db = getFirestore();
  const auth = getAuth();

  const district = await findDistrict(db, args.siteName);
  if (!district) {
    throw new Error(`Site "${args.siteName}" not found. Run reset-site first.`);
  }

  const cohortName = args.cohortName || `e2e-cohort-${Date.now()}`;
  const cohort = await createCohortGroup(db, district.id, cohortName);

  const users = [
    { email: `e2e_child_${Date.now()}@levante.test`, password: 'levante1', userType: 'child' },
    { email: `e2e_caregiver_${Date.now()}@levante.test`, password: 'levante1', userType: 'caregiver' },
    { email: `e2e_teacher_${Date.now()}@levante.test`, password: 'levante1', userType: 'teacher' },
  ];

  const created = [];
  for (const u of users) {
    const rec = await auth.createUser({
      email: u.email,
      password: u.password,
      emailVerified: true,
      displayName: u.email.split('@')[0],
    });
    created.push({ ...u, uid: rec.uid });
    await db.collection('users').doc(rec.uid).set(
      {
        email: u.email,
        displayName: u.email.split('@')[0],
        userType: u.userType,
        roles: [{ siteId: district.id, siteName: args.siteName, role: 'participant' }],
        groups: { all: [cohort.id], current: [cohort.id], dates: {} },
        districts: { all: [district.id], current: [district.id], dates: {} },
        testData: true,
        updatedAt: FieldValue.serverTimestamp(),
        createdAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  }

  console.log(
    JSON.stringify(
      {
        projectId: envProject,
        site: { id: district.id, name: args.siteName },
        cohort,
        users: created.map(({ password, ...rest }) => rest),
      },
      null,
      2,
    ),
  );
  // Export cohort name for shell use
  console.error(`E2E_COHORT_NAME=${cohortName}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
