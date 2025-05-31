const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Netlify custom build script...');

// Make sure we're using legacy peer deps for compatibility
console.log('Installing dependencies with legacy peer deps...');
try {
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
  console.log('Dependencies installed successfully.');
} catch (error) {
  console.error('Error installing dependencies:', error.message);
  process.exit(1);
}

// Create a special .env file for the build
console.log('Setting up environment variables...');
fs.writeFileSync('.env', 'DISABLE_ESLINT_PLUGIN=true\nCI=false\nSKIP_PREFLIGHT_CHECK=true');

// Run the build with CI=false to prevent warnings from causing failures
console.log('Building the project...');
try {
  execSync('CI=false npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully.');
} catch (error) {
  console.error('Error building project:', error.message);
  process.exit(1);
}

// Make sure index.html is at the root of the build directory
console.log('Verifying index.html location...');
const buildPath = path.join(__dirname, 'build');
const indexPath = path.join(buildPath, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('index.html not found in build directory!');
  process.exit(1);
}

console.log('Build process completed successfully!');
