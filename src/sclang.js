const find = require('findit');
var path = require('path');

let SCLang = {};

const operatingSystem = {
    windows: {
        directory: /^SuperCollider-\d*.\d*.\d*$/,
        sclangRelativePath: '\\sclang.exe\\'
    },
    macos: {
        directory: /^SuperCollider.app$/,
        sclangRelativePath: '/Contents/MacOS/sclang'

    }
}

SCLang.search = async os => {

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
            resolve(sclangAbsolutePath + sclangRelativePath);
        });
        finder.on('end', () => {
            reject(`No SuperCollider directory was found.`);
        });
    });

    try {
        let solution = await searchProcess;
        console.log(solution);
        return solution;
    } catch (error) {
        console.error(error);
        return;
    }
}

module.exports = SCLang;