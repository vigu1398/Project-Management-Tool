exports.createProjectInsertObject = (body, owner) => {
    var insertBody = {};
    var { name, description, endDate } = body;

    insertBody.name = name ? name : "";
    insertBody.description = description ? description : "";
    insertBody.endDate = endDate ? endDate : "";
    insertBody.owner = owner;
    
    return insertBody;
} 