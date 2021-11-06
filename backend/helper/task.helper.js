exports.modifyTaskObject = (record, body) => {
    for(let key in body) {
        if(key != '_id') {
            record[key] = body[key];
        }
    }

    return record;
}