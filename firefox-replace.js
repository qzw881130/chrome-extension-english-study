const replace = require('replace-in-file')

const options = {
  files: 'dist-firefox/popup.js',
  from: /\.innerHTML/g,
  to: '.textContent',
};

try {
  const results = replace.sync(options);
  console.log('Replacement results:', results);
} catch (error) {
  console.error('Error occurred:', error);
}