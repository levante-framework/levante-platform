#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Clear Ports and Stop Servers Script for Levante Platform
 * Cross-platform script to kill processes on all ports used by the development environment
 */

const { exec } = require('child_process');
const os = require('os');

// Colors for output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

const log = (color, message) => console.log(`${color}${message}${colors.reset}`);

// Ports used by the platform
const ports = [
  { port: 5173, name: 'Vite Dev Server' },
  { port: 9199, name: 'Firebase Auth Emulator' },
  { port: 5002, name: 'Firebase Functions Emulator' },
  { port: 8180, name: 'Firebase Firestore Emulator' },
  { port: 4401, name: 'Firebase Hub Emulator' },
  { port: 9899, name: 'Firebase Tasks Emulator' },
  { port: 4001, name: 'Firebase UI Emulator' },
  { port: 4501, name: 'Firebase Logging Emulator' },
  { port: 3000, name: 'Alternative Dev Server' },
  { port: 8080, name: 'Alternative Dev Server' },
  { port: 3001, name: 'Alternative Dev Server' },
];

// Process patterns to kill
const processPatterns = [
  { pattern: 'vite', name: 'Vite' },
  { pattern: 'firebase', name: 'Firebase' },
  { pattern: 'turbo', name: 'Turbo' },
  { pattern: 'npm.*run.*dev', name: 'NPM Dev processes' },
];

function execCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error && !error.message.includes('No such process')) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

async function killPort(port, serviceName) {
  log(colors.blue, `Checking port ${port} (${serviceName})...`);

  try {
    let pid;

    if (os.platform() === 'win32') {
      // Windows command
      const { stdout } = await execCommand(`netstat -ano | findstr :${port}`);
      const lines = stdout.split('\n').filter((line) => line.includes(`:${port}`));
      if (lines.length > 0) {
        const parts = lines[0].trim().split(/\s+/);
        pid = parts[parts.length - 1];
      }
    } else {
      // Unix-like command
      const { stdout } = await execCommand(`lsof -ti:${port}`);
      pid = stdout.trim();
    }

    if (pid && pid !== '') {
      log(colors.yellow, `Found process ${pid} on port ${port}, killing...`);

      if (os.platform() === 'win32') {
        await execCommand(`taskkill /F /PID ${pid}`);
      } else {
        await execCommand(`kill -9 ${pid}`);
      }

      log(colors.green, `✅ Killed process on port ${port}`);
    } else {
      log(colors.green, `✅ Port ${port} is already free`);
    }
  } catch {
    log(colors.green, `✅ Port ${port} is already free`);
  }
}

async function killProcesses(pattern, name) {
  log(colors.blue, `Checking for ${name} processes...`);

  try {
    let command;

    if (os.platform() === 'win32') {
      // Windows command
      if (pattern === 'vite') {
        command = `taskkill /F /IM "node.exe" /FI "WINDOWTITLE eq *vite*"`;
      } else if (pattern === 'firebase') {
        command = `taskkill /F /IM "firebase.exe" & taskkill /F /IM "node.exe" /FI "COMMANDLINE eq *firebase*"`;
      } else if (pattern === 'turbo') {
        command = `taskkill /F /IM "node.exe" /FI "COMMANDLINE eq *turbo*"`;
      } else if (pattern === 'npm.*run.*dev') {
        command = `taskkill /F /IM "node.exe" /FI "COMMANDLINE eq *npm*run*dev*"`;
      }
    } else {
      // Unix-like command
      command = `pkill -f "${pattern}"`;
    }

    if (command) {
      await execCommand(command);
      log(colors.green, `✅ Killed ${name} processes`);
    } else {
      log(colors.green, `✅ No ${name} processes found`);
    }
  } catch {
    log(colors.green, `✅ No ${name} processes found`);
  }
}

async function main() {
  log(colors.blue, '🛑 Stopping all Levante Platform servers and clearing ports...\n');

  // Clear specific ports
  log(colors.blue, 'Clearing development server ports...');
  for (const { port, name } of ports) {
    await killPort(port, name);
  }

  console.log();

  // Clear process-based services
  log(colors.blue, 'Clearing process-based services...');
  for (const { pattern, name } of processPatterns) {
    await killProcesses(pattern, name);
  }

  console.log();
  log(colors.green, '🎉 All ports cleared and servers stopped!');
  log(colors.blue, "You can now run 'npm run dev' to start fresh servers.");
}

// Run the script
main().catch(console.error);
