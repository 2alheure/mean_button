/*
Import
*/
const MessageModel = require('../../models/message.model');
const UserModel = require('../../models/user.model');
// const bcrypt = require('bcryptjs');
//

/*
Functions
*/
{
/* const register = body => {
    // Search for user
    return new Promise( (resolve, reject) => {

        UserModel.findOne({ email: body.email }, (error, user) => {
            if(error){ // Mongo Error
                return reject(error)
            }
            else if(user){ // User already exist
                return reject(user)
            }
            else{ // Register new user
                // Crypt password
                bcrypt.hash(body.password, 10)
                .then( hashedPassword => {
                    console.log(hashedPassword)
                    // Replace clear password
                    body.password = hashedPassword;

                    // Save user
                    UserModel.create(body, (error, newUser) => {
                        if(error){ // Mongo error
                            return reject(error)
                        }
                        else{ // User registrated
                            return resolve(newUser);
                        };
                    });
                })
                .catch( hashError => {
                    console.log('error', hashError)
                    return reject(hashError);
                });
            };
        });
    });
};

const login = body => {
    return new Promise( (resolve, reject ) => {

        UserModel.findOne( { email: body.email }, (error, user) => {
            if(error) reject(error)
            else if( !user ) reject('User not found')
            else{
                // Check password
                const validPassword = bcrypt.compareSync( body.password, user.password )

                if( !validPassword ) reject('Password not valid')
                else resolve({
                    user: user,
                    token: user.generateJwt()
                });
            }
        });
    });
};
*/
}

const send = body => {
    return new Promise( (resolve, reject ) => {
        UserModel.findOne( { token: body.token }, (error, user) => {
            if(error) reject(error)
            else if( !user ) reject('User not found')
            else {
                MessageModel.create({content: body.message, user_id: user._id})
                .then(response => resolve(response))
                .catch(response => reject(response));
            }
        });
    });
}

const retrieve = id => {
    return new Promise( (resolve, reject ) => {
        MessageModel.findOne({_id: id}, (error, message) => {
            if (error) reject(error);
            else resolve(message);
        });
    });
}

const retrieveAll = body => {
    return new Promise( (resolve, reject ) => {
        UserModel.findOne( { token: body.token }, (error, user) => {
            if (error) reject(error);
            else if (!user) reject('User not found');
            else {
                MessageModel.find({}, (error, messages) => {
                    if (error) reject(error);
                    else resolve(messages);
                });
            }
        });
    });
}

const del = body => {
    return new Promise( (resolve, reject ) => {
        MessageModel.findOne( { user_id: body.user_id, _id: body.message_id }, (error, message) => {
            if (error) reject(error);
            else if (!message) reject('Message not found');
            else {
                MessageModel.deleteOne({_id: body.message_id}, (error, message) => {
                    if (error) reject(error);
                    else resolve(message);
                });
            }
        });
    });
}
//

/*
Export
*/
module.exports = {
    retrieve,
    retrieveAll,
    send,
    del
}
//