/*
Import
*/
const MessageModel = require('../../models/message.model');
const UserModel = require('../../models/user.model');
//

/*
Functions
*/

const send = (body, user_id) => {
    return new Promise((resolve, reject) => {
        MessageModel.create({ content: body.message, user_id: user_id, date: new Date() })
            .then(response => resolve(response))
            .catch(response => reject(response));
    });
}

const retrieveAll = () => {
    return new Promise((resolve, reject) => {
        MessageModel.find({}, (error, messages) => {
            if (error) reject(error);
            else resolve(messages);
        });
    });
}

const del = (body, user_id) => {
    return new Promise((resolve, reject) => {
        MessageModel.deleteOne({ _id: body.id, user_id: user_id }, (error, message) => {
            if (error) reject(error);
            else resolve(message);
        });
    });
}
//

/*
Export
*/
module.exports = {
    retrieveAll,
    send,
    del
}
//