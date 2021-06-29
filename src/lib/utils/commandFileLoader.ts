import { readFileSync } from 'fs';
import glob from 'glob';

const { sync } = glob;
const files: Map<string, string> = new Map();

sync(process.cwd() + '/src/commands/**/*.*').forEach((file) => {
  const fname = file.split('commands/')[1].split('/')[1].replace('.ts', '');
  const content = readFileSync(file, 'utf-8');

  files.set(fname, content);
});

export default files;
