const { execSync } = require('child_process');
const args = process.argv.slice(2);
const migrationName = args[0] || '';
if (!migrationName) {
  process.exit(1);
}
const command = `npm run typeorm migration:generate -- ./src/db/migrations/${migrationName}`;
try {
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('Error generando la migración: ', error);
  process.exit(1);
}

