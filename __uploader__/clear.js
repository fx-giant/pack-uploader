//Batman Code!
require('dotenv').config();
var env = process.env;
var fs = require('fs');
const src = "__uploader__";

var zipName = env.UPLOAD_ZIP_NAME || "upload-package";
const zipFile = `${src}/${zipName}.zip`;

fs.unlink(zipFile);
console.log("Cleared");