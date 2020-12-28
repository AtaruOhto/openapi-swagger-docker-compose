const chokidar = require('chokidar');
const { exec } = require('child_process');

const watchTarget = './openapi.yml';

console.log('openapi.yml.watch.js watch start...');

const generateMockServer = (event, path) => {
  console.log('start generating mock server...............');

  exec('yarn generate:server', (err, stdout, stderr) => {
    console.log('mock server generated!!!!!!!!!!!!');
    if (err) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

chokidar.watch(watchTarget).on('change', (event, path) => {
  exec('yarn generate:server', generateMockServer);
});

generateMockServer();

