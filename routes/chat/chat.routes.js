/*
Imports
*/
const express = require('express');
const chatRouter = express.Router({ mergeParams: true });
const { send, retrieveAll, del } = require('./chat.controller');
const checker = require('../../services/request.checker');
const response = require('../../services/server.response');
//

/*
Routes definition
*/
class ChatRouterClass {
    routes(){
        // HATEOAS
        chatRouter.get('/', (req, res) => {
            res.json('HATEOAS for chat');
        });
        
        // Retrieve all
        chatRouter.get('/all', (req, res) => {
            // Use controller function
            if (req.body === null || typeof req.body === 'undefined') response.sendBodyError(res, 'No data in body');

            var check = checker.checkFields(['token'], req.body);
            var user_id = checker.checkUserToken(req.body.token);

            if (user_id) {
                if (check.ok) {
                    retrieveAll()
                    .then( apiResponse => response.sendApiSuccessResponse(res, 'Success', apiResponse) )
                    .catch( apiResponse => response.sendApiErrorResponse(res, 'Error', apiResponse) );
                } else response.sendFieldsError(res, 'Bad arguments', check.miss, check.extra);
            } else response.sendTokenErrorResponse(res);
        });
        
        // Send
        chatRouter.post('/send', (req, res) => {
            // Use controller function
            if (req.body === null || typeof req.body === 'undefined') response.sendBodyError(res, 'No data in body');

            var check = checker.checkFields(['token', 'message'], req.body);
            var user_id = checker.checkUserToken(req.body.token);

            if (user_id) {
                if (check.ok) {
                    send(req.body, user_id)
                    .then( apiResponse => response.sendApiSuccessResponse(res, 'Success', apiResponse) )
                    .catch( apiResponse => response.sendApiErrorResponse(res, 'Error', apiResponse) );
                } else response.sendFieldsError(res, 'Bad arguments', check.miss, check.extra);
            } else response.sendTokenErrorResponse(res);
        });

        // Delete
        chatRouter.delete('/', (req, res) => {
            // Use controller function
            if (req.body === null || typeof req.body === 'undefined') response.sendBodyError(res, 'No data in body');

            var check = checker.checkFields(['token', 'id'], req.body);
            var user_id = checker.checkUserToken(req.body.token);

            if (user_id) {
                if (check.ok) {
                    del(req.body, user_id)
                    .then( apiResponse => response.sendApiSuccessResponse(res, 'Success', apiResponse) )
                    .catch( apiResponse => response.sendApiErrorResponse(res, 'Error', apiResponse) );
                } else response.sendFieldsError(res, 'Bad arguments', check.miss, check.extra);
            } else response.sendTokenErrorResponse(res);
        });
    };

    init(){
        this.routes();
        return chatRouter;
    }
}
//

/*
Export
*/
module.exports = ChatRouterClass;
//