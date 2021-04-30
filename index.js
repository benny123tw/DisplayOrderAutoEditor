const fs = require("fs");
const {execelRules} = require('./handler/ExecelHandler');
const {readJsonFile, combineDocumentType, editDisplayOrder} = require('./handler/TemplateHandler');
const {ModuleInfoConverter} = require('./handler/Sorter');

entry();

/**
 *  此應用入口
 */
async function entry() {
    // 讀取config
    const config = JSON.parse(await fs.readFileSync('./config.json', 'utf8'));

    // 讀取 Excel 檔案
    const rules = await execelRules(config);

    // 讀取 Json 檔案
    const file = await readJsonFile(config.json);

    // 將 ModuleInfo.json DocumentType和SubDocumentType結合
    const documentType = combineDocumentType(file);

    // 編輯 DisplayOrder
    const newFile = editDisplayOrder(rules, file, documentType);

    // 整理排序 輸出檔案
    ModuleInfoConverter(newFile);
}
