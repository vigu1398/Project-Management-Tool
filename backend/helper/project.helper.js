exports.createProjectInsertObject = (body) => {
    var insertBody = {};
    let { name, description, privacy, userIds, owner } = body;

    insertBody.name = name;
    insertBody.description = description;
    insertBody.owner = owner;
    insertBody.privacy = privacy;
    insertBody.userIds = userIds;
    insertBody.startDate = new Date();
    
    return insertBody;
} 

exports.modifyProjectObject = (body, record) => {
    var { name, description, endDate } = body;

    record.name = name ? name : record.name;
    record.description = description ? description : record.description;
    record.endDate = endDate ? endDate : record.endDate;

    return record;

}