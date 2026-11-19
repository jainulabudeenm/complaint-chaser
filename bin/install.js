#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const SKILL_NAME = 'consumer-dispute';
const SKILL_FILE = path.join(__dirname, '..', 'skills', `${SKILL_NAME}.skill`);

const args = process.argv.slice(2);
const isProject = args.includes('--project') || args.includes('-p');

console.log(`\nconsumer-dispute installer\n`);

if (!fs.existsSync(SKILL_FILE)) {
  console.error('Skill file not found in package. Try reinstalling.');
  process.exit(1);
}

// Claude Code reads ~/.agents/skills/, Claude.ai reads ~/.claude/skills/.
// Install to both so it works wherever you are.
const targets = isProject
  ? [
      path.join(process.cwd(), '.agents', 'skills'),
      path.join(process.cwd(), '.claude', 'skills'),
    ]
  : [
      path.join(os.homedir(), '.agents', 'skills'),
      path.join(os.homedir(), '.claude', 'skills'),
    ];

let anySuccess = false;

for (const targetDir of targets) {
  const targetFile = path.join(targetDir, `${SKILL_NAME}.skill`);
  try {
    fs.mkdirSync(targetDir, { recursive: true });
    fs.copyFileSync(SKILL_FILE, targetFile);
    console.log(`installed: ${targetFile}`);
    anySuccess = true;
  } catch (err) {
    if (err.code === 'EEXIST' || err.message.includes('identical')) {
      console.log(`already in place: ${targetFile}`);
      anySuccess = true;
    } else {
      console.warn(`could not install to ${targetDir}: ${err.message}`);
    }
  }
}

if (!anySuccess) {
  console.error('Installation failed. Check folder permissions.');
  process.exit(1);
}

if (isProject) {
  console.log(`\nTip: commit .agents/skills/ and .claude/skills/ to share with your team.`);
}

console.log(`\nHow to use:`);
console.log(`   Say "I want a refund from X" or paste the support email`);
console.log(`   It reads the thread and their policy, then rates your chance`);
console.log(`   You approve every send, every offer and every new step`);
console.log(`\nThis package ships the skill only. For the /consumer-dispute-init slash command as well,`);
console.log(`install it as a plugin instead:`);
console.log(`  /plugin marketplace add jainulabudeenm/consumer-dispute`);
console.log(`  /plugin install consumer-dispute`);

console.log(`\nTo update later: npx consumer-dispute@latest\n`);
