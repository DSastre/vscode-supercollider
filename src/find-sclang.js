const find = require('findit');
var path = require('path');


const operatingSystem = {
    windows: {
        directory: /^SuperCollider-\d*.\d*.\d*$/,
        sclangRelativePath: '\\sclang.exe'
    },
    macOS: {
        directory: /^SuperCollider.app$/,
        sclangRelativePath: '/Contents/MacOS/sclang'

    }
}

async function searchSCLang (os) {

    let directory = operatingSystem[os].directory;
    let sclangRelativePath = operatingSystem[os].sclangRelativePath;

    let sclangAbsolutePath = '';
    const finder = find('/');

    finder.on('directory', (dir, stat, stop) => {
        if (directory.test(path.basename(dir))) {
            sclangAbsolutePath = path.resolve(dir);
            finder.stop();
        }
    });

    // Skip all not accessable files or folders.
    finder.on('error', () => {});

    // Create a promise object to await its solution.
    const searchProcess = new Promise((resolve, reject) => {
        finder.on('stop', () => {
            resolve(`SCLang found. \nPath: ${sclangAbsolutePath} `);
        });
        finder.on('end', () => {
            reject(`No SuperCollider directory was found.`);
        });
    });

    try {
        let solution = await searchProcess;
        console.log(solution);
    } catch (error) {
        console.log(error);
    }
}

//searchSCLang('/', 'WINDOWS');
searchSCLang('macOS');
