exports.createProjectInsertObject = (body, owner) => {
    var insertBody = {};
    var { name, description, endDate } = body;

    insertBody.name = name ? name : "";
    insertBody.description = description ? description : "";
    insertBody.endDate = endDate ? endDate : "";
    insertBody.owner = owner;
    
    return insertBody;
} 

exports.modifyProjectObject = (body, record) => {
    var { name, description, endDate } = body;

    record.name = name ? name : record.name;
    record.description = description ? description : record.description;
    record.endDate = endDate ? endDate : record.endDate;

    return record;

}