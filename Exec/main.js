const { exec } = require('child_process');

const comanda = process.platform === 'win32' ? 'dir' : 'ls -la';
console.log(`${comanda}`);

exec(comanda, (error, stdout, stderr) => {
    if (error) {
        console.error(`${error.message}`)
    }
    if (stderr) {
        console.error(`${stderr}`)
    }
    console.log(stdout);
})
