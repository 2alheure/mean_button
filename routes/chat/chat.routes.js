/*
Imports
*/
const express = require('express');
const chatRouter = express.Router({ mergeParams: true });
const { register, login } = require('./chat.controller');
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

        // Retrieve one
        chatRouter.get('/:id', (req, res) => {
            // Use controller function
            retrieve(req.params.id)
            .then( apiResponse => res.json(apiResponse) )
            .catch( apiResponse => res.json(apiResponse) )
        });
        
        // Retrieve all
        chatRouter.get('/all', (req, res) => {
            // Use controller function
            retrieveAll(req.body)
            .then( apiResponse => res.json(apiResponse) )
            .catch( apiResponse => res.json(apiResponse) )
        });
        
        // Send
        chatRouter.post('/send', (req, res) => {
            // Use controller function
            send(req.body)
            .then( apiResponse => res.json(apiResponse) )
            .catch( apiResponse => res.json(apiResponse) )
        });

        // Delete
        chatRouter.delete('/', (req, res) => {
            // Use controller function
            del(req.body)
            .then( apiResponse => res.json(apiResponse) )
            .catch( apiResponse => res.json(apiResponse) )
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