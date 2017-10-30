//batman code!
require('dotenv').config();
var env = process.env;
var request = require("request");
var fs = require("fs");
const src = "__uploader__";
var requestBackup = env.REQUEST_BACKUP || false;

var uploadUrl = env.UPLOAD_ENDPOINT + (requestBackup ? "?backup=true" : "");
var zipName = env.UPLOAD_ZIP_NAME || "upload-package";
const zipFile = `${src}/${zipName}.zip`;

console.log("Uploading to ", uploadUrl)

var requestObj = {
    method: "post",
    uri: uploadUrl,
    headers: {},
    formData: {
        attachments: [fs.createReadStream(zipFile)]
    }
};

var req = request(requestObj, function (err, resp, body) {
    if (err) {
        console.log('Error!', err);
    } else {
        console.log(body);
    }
});
