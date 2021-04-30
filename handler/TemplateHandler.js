const fs = require("fs");

async function readJsonFile(filename) {
    if (!filename) throw new Error('Invalid file name');

    const file = JSON.parse(fs.readFileSync(filename, { encoding: "utf-8" }));

    return file;
}

function combineDocumentType(file) {
    const documentType = [];

    file?.Templates.forEach(template => {
        const doc = template.DocumentType + template.SubDocumentType;
        documentType.push(doc);
    });

    return documentType;
}

function editDisplayOrder(rules, file, documentType) {

    if (!rules || !file || !documentType) throw new Error('Invalid parameters');

    rules.forEach(rule => {
        const index = documentType.indexOf(rule['範本代碼']);
        
        if (index >= 0) {
            file.Templates[index].TemplateType = String(rule['範本類別']);
            file.Templates[index].DisplayOrder = String(rule['序號']);
        }
    });

    return file;
}

module.exports = {
    readJsonFile,
    combineDocumentType,
    editDisplayOrder
}