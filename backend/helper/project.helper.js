exports.createProjectInsertObject = (body) => {
    var insertBody = { ...body };
    insertBody.startDate = new Date();
    
    return insertBody;
} 

exports.modifyProjectObject = (body, record) => {
    for(let key in body) {
        record[key] = body[key];
    }

    return record;

}