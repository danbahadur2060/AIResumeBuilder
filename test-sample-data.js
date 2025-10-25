const fs = require('fs');
const path = require('path');

const assetsPath = path.join(__dirname, 'app', 'assets', 'assets.js');
const code = fs.readFileSync(assetsPath, 'utf8');

// crude extraction: find the `export const dummyResumeData =` and evaluate the RHS
const marker = 'export const dummyResumeData =';
const idx = code.indexOf(marker);
if (idx === -1) {
  console.error('Could not find dummyResumeData export in assets.js');
  process.exit(1);
}

const rhs = code.slice(idx + marker.length);

// Remove possible trailing export wrapper (```) and anything after the array closing
const arrStart = rhs.indexOf('[');
const arrEnd = rhs.lastIndexOf('];');
if (arrStart === -1 || arrEnd === -1) {
  console.error('Could not locate array bounds');
  process.exit(1);
}

const arrayText = rhs.slice(arrStart, arrEnd + 2);

// Replace image import reference (dummy_profile) with a placeholder string to make JSON parseable
const cleaned = arrayText.replace(/dummy_profile/g, '"dummy_profile.png"');

// Replace single quotes with double quotes where necessary and ensure property keys are quoted
// This is a quick-and-dirty transform for test purposes only.
const jsToJson = cleaned
  .replace(/([\w$]+)\s*:/g, '"$1":') // quote keys
  .replace(/\n/g, ' ') // remove newlines
  .replace(/'/g, '"');

try {
  const data = JSON.parse(jsToJson);
  console.log('Sample data loaded, resumes count =', data.length);
  const id = '68d2a31a1c4dd38875bb037e';
  const found = data.find((r) => r._id === id);
  console.log('Find by id result:', found ? 'FOUND' : 'NOT FOUND');
} catch (err) {
  console.error('Failed to parse sample data:', err.message);
  process.exit(1);
}
