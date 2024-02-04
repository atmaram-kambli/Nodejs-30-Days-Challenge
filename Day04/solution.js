const path = require('path');

function resolvePath(relativePath) {
    const absolutePath = path.resolve(relativePath);
    console.log("Given Relative path: ",relativePath)
    console.log("Absolute path: ",absolutePath,"\n");
}

const add1 = '\\Day04\\solution.js';
const add2 = 'nonexistent-folder/file.txt';

resolvePath(add1);
resolvePath(add2);