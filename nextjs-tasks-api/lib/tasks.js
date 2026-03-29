import fs from 'fs/promises';
import path from 'path';
import os from 'os';

const TMP_FILE = path.join(os.tmpdir(), 'tasks.json');
const SEED_FILE = path.join(process.cwd(), 'tasks.json');

export async function readTasks() {
  try {
    const data = await fs.readFile(TMP_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    try {
      const seed = await fs.readFile(SEED_FILE, 'utf8');
      return JSON.parse(seed);
    } catch {
      return [];
    }
  }
}

export async function writeTasks(tasks) {
  await fs.writeFile(TMP_FILE, JSON.stringify(tasks, null, 2), 'utf8');
}