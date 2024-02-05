const path = require('path');

function checkFileExtension(filePath, expectedExtension) {
    const ext = path.extname(filePath);
    if (ext !== expectedExtension) {
        console.log("File does not have the expected extension. Expected:", expectedExtension, " Actual:", ext);
    }
    else {
        console.log("File has the expected extension:",expectedExtension);
    }
    console.log()
}

checkFileExtension('test-files/file1.txt', '.txt');

checkFileExtension('test-files/image.png', '.jpg');