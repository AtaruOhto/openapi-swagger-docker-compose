const fs = require('fs');
const { exec } = require('child_process');

const checkFilePath = './index.js';
let refreshIntervalId = null;

console.log('node.files.watch.js script start...');

const startNodemon = () => {
  console.log('check node files exist');

  try {
    if (fs.existsSync(checkFilePath)) {
      if (!refreshIntervalId) {
        throw new Error('no refreshId found!');
      }

      clearInterval(refreshIntervalId);

      console.log('start nodemon watching....');
      exec('nodemon -L', (err, stdout, stderr) => {
        if (err) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
    }
  } catch (err) {
    console.log('waiting for file generation.');
  }
};

refreshIntervalId = setInterval(startNodemon, 3000);
