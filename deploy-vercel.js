const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Paths
const appPath = path.join(__dirname, 'src', 'App.tsx');
const appBackupPath = path.join(__dirname, 'src', 'App.original.tsx');
const indexPath = path.join(__dirname, 'src', 'index.tsx');
const indexBackupPath = path.join(__dirname, 'src', 'index.original.tsx');
const simpleAppPath = path.join(__dirname, 'src', 'App.simple.tsx');
const simpleIndexPath = path.join(__dirname, 'src', 'index.simple.tsx');

// Backup original files
console.log('Backing up original files...');
if (fs.existsSync(appPath)) {
  fs.copyFileSync(appPath, appBackupPath);
}
if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, indexBackupPath);
}

// Replace with simplified versions
console.log('Replacing with simplified versions...');
fs.copyFileSync(simpleAppPath, appPath);
fs.copyFileSync(simpleIndexPath, indexPath);

// Git operations
try {
  console.log('Adding files to git...');
  execSync('git add .', { stdio: 'inherit' });
  
  console.log('Committing changes...');
  execSync('git commit -m "Prepare simplified version for deployment"', { stdio: 'inherit' });
  
  console.log('Pushing to GitHub...');
  execSync('git push believeuniversity master', { stdio: 'inherit' });
  
  console.log('Successfully pushed simplified version to GitHub!');
  console.log('Now you can deploy on Vercel by connecting to your GitHub repository.');
} catch (error) {
  console.error('Error during git operations:', error.message);
} finally {
  // Restore original files
  console.log('Restoring original files...');
  if (fs.existsSync(appBackupPath)) {
    fs.copyFileSync(appBackupPath, appPath);
    fs.unlinkSync(appBackupPath);
  }
  if (fs.existsSync(indexBackupPath)) {
    fs.copyFileSync(indexBackupPath, indexPath);
    fs.unlinkSync(indexBackupPath);
  }
  
  console.log('Original files restored locally. The simplified version is only in the GitHub repository.');
}
