//Batman Code!
require('dotenv').config();
var env = process.env;
const src = "./";
const dest = "__uploader__";

const ignoreList = ["__uploader__", "__zip__", "node_modules"];

var fs = require('fs');
var archiver = require('archiver');
var dateTime = require("node-datetime");
var path = require("path");
var zipName = env.UPLOAD_ZIP_NAME || "upload-package";

findExportDirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory() && ignoreList.indexOf(f) == -1 && !f.startsWith("."))
var directories = findExportDirs(src);
console.log("Directories: ", directories);
var output = fs.createWriteStream(`${dest}/${zipName}.zip`);

var archive = archiver('zip', {
    zlib: { level: 9 }
});

for (var i = 0; i < directories.length; i++) {
    archive.directory(directories[i], directories[i])
}
output.on('close', function () {
    //console.log(archive.pointer() + ' total bytes');
    console.log(`Files ziped to ${src}/${zipName}.zip`);
});

output.on('end', function () {
    console.log('Data has been drained');
});

archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
    } else {
        throw err;
    }
});

archive.on('error', function (err) {
    console.error(err);
    throw err;
});

archive.pipe(output);

archive.finalize();