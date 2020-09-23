const find = require('findit');
var path = require('path');

// Version for MacOS

async function searchSCLang (searchDir) {
    let scPath = '';
    const finder = find(searchDir);

    finder.on('directory', (dir, stat, stop) => {
        if (path.basename(dir) === 'SuperCollider.app') {
            scPath = dir;
            finder.stop();
        }
    });

    // Filter all not accessable files or folders.
    finder.on('error', () => {});

    // Create a promise object to await its solution.
    const searchProcess = new Promise((resolve, reject) => {
        finder.on('stop', () => {
            resolve(`SCLang found. \nPath: ${scPath}/Contents/MacOS/sclang `);
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

searchSCLang('/');