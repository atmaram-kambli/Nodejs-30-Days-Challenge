import fs from 'fs';

const path1 = "test-files/file1.txt";
const path2 = "test-files/empty.txt";
const path3 = "test-files/nothing.txt";

function readFileContent(filePath) {
    fs.readFile(filePath, (err, data) => {
        if(err) console.log(err.message);
        else console.log("\nFile Content: \n",data.toString());
    })
}


readFileContent(path1);
readFileContent(path2);
readFileContent(path3);