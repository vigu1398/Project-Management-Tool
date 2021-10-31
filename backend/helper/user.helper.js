const _ = require('lodash');

exports.transform = (allUsers) => {
    _.forEach(allUsers, (user) => {
        user[user.firstName] = user.email
    })

    return allUsers;
}