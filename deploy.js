const { execSync } = require('child_process');
const path = require('path');

// Define paths
const buildDir = path.join(__dirname, 'build');
const domain = 'beuhouse.surge.sh'; // You can change this to your preferred domain

console.log('Starting deployment process...');

try {
  // Build the project
  console.log('Building the React application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Deploy to Surge
  console.log(`Deploying to ${domain}...`);
  execSync(`npx surge ${buildDir} ${domain}`, { stdio: 'inherit' });
  
  console.log('Deployment completed successfully!');
} catch (error) {
  console.error('Deployment failed:', error.message);
  process.exit(1);
}
