import fs from 'fs';
import path from 'path';


function writeToFile(filePath, content) {
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.log(err.message + "😑")
        }
        else {
            console.log(`Data written to ${path.basename(filePath)}👍`)
        }
    })
}

writeToFile('test-files/output1.txt', 'Sample content.');

writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');