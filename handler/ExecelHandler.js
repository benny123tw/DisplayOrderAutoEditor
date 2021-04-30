const parseXlsx = require("excel");

async function execelRules(config) {
    const {
        execel,
        templateTypeItems
    } = config

    if (!execel) throw new Error('Invalid file name');

    const data = await parseXlsx.default(execel);
    rules = convertToJSON(data, templateTypeItems);
    
    return rules;
}

function convertToJSON(array, templateTypeItems) {
    const first = array[0].join();
    const headers = first.split(",");

    let jsonData = [];
    for (let i = 1, length = array.length; i < length; i++) {
        const myRow = array[i].join();
        const row = myRow.split(",");

        let data = {};
        if (row[headers.indexOf("使用需求")] === "停用") continue;
            
        if (isNaN(row[headers.indexOf('序號')])) {
            templateTypeItems.forEach(template => {
                if (template.name == row[headers.indexOf('序號')])
                    templateType = String(template.value);
            });
            continue;
        }
            
        data["範本類別"] = templateType;

        for (let x = 0; x < row.length; x++) {
            if (headers[x] != "範本代碼" && headers[x] != "範本名稱" &&  headers[x] != "序號") continue;
            
            if (row[x].endsWith('.0')) row[x] = row[x].slice(0, -2);
            if (row[x].startsWith('form')) row[x] = row[x].split('form')[1];

            data[headers[x]] = row[x];
        }
        if (data["範本代碼"]) jsonData.push(data);
    }
    return jsonData;
}

module.exports = {
    execelRules
};