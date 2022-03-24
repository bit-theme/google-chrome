const { createWriteStream } = require('fs');
const { join } = require('path')
const archiver = require('archiver')

const output = createWriteStream(join(__dirname, '..', '..', 'bit-theme-google-chrome.zip'))
const archive = archiver('zip')

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

output.on('end', function() {
  console.log('Data has been drained.');
});

archive.on('warning', function(err) {
  if (err.code !== 'ENOENT') {
    throw err;
  }
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

archive.file(join(__dirname, '..', 'manifest.json'), { name: 'manifest.json' });

archive.directory(join(__dirname, '..', 'images'), 'images')

archive.finalize();
