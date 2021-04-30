const fs = require("fs");

// Compare template type
const typeSort = (a, b) => {
    const templateTypeA = `${a.TemplateType.toUpperCase()}`;
    const templateTypeB = `${b.TemplateType.toUpperCase()}`;
    const orderA = a.DisplayOrder;
    const orderB = b.DisplayOrder;

    return templateTypeA < templateTypeB
        ? -1
        : templateTypeA > templateTypeB
        ? 1
        : orderA - orderB;
};

// Array sort function using custom compare Function
const orderByType = (file) => file.Templates.sort(typeSort);

/**
 * Sort by template type and display order 
 * @param {Object} file - ModuleInfo.json
 */
const converter = (file) => {
    orderByType(file);

    // make 2 space to json
    fs.writeFileSync("./New-ModuleInfo.json", JSON.stringify(file, null, 2));
};

module.exports = {
    ModuleInfoConverter: converter,
}
