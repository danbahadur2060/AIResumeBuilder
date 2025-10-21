// Simple build test script
const { exec } = require('child_process');

console.log('Testing build process...');

exec('npm run build', (error, stdout, stderr) => {
  if (error) {
    console.error('Build failed:', error);
    console.error('stderr:', stderr);
    process.exit(1);
  }
  
  console.log('Build successful!');
  console.log('stdout:', stdout);
  process.exit(0);
});
