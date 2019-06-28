/*
Imports & configs
*/
const mongoose = require('mongoose');
const { Schema } = mongoose;
//


/*
Model definition
*/
const messageSchema = new Schema({
    content: String,
    user_id: String,
    date: Date
})
//

/*
Export
*/
const MessageModel = mongoose.model('message', messageSchema);
module.exports = MessageModel;
//