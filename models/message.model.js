/*
Imports & configs
*/
const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
//


/*
Model definition
*/
const messageSchema = new Schema({
    content: String,
    user_id: String
})
//

/*
Method
*/
messageSchema.methods.generateJwt = function generateJwt(){
    // set expiration
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 59);

    // JWT creation
    return jwt.sign({
        _id: this._id,
        user_id: this.user_id,
        expireIn: '10s',
        exp: parseInt(expiry.getTime() / 100, 10)
    }, process.env.JWT_SECRET )
};
//

/*
Export
*/
const MessageModel = mongoose.model('message', messageSchema);
module.exports = MessageModel;
//