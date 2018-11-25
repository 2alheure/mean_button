/*
Imports
*/
    const express = require('express');
    const authRouter = express.Router({ mergeParams: true });
    const { register, login } = require('./auth.controller');
    const checker = require('../../services/request.checker');
    const response = require('../../services/server.response');
//

/*
Routes definition
*/
    class AuthRouterClass {
        routes() {
            // HATEOAS
            authRouter.get('/', (req, res) => {
                res.json('HATEOAS for auth');
            });
            
            // Register
            authRouter.post('/register', (req, res) => {
                // Use controller function
                if (req.body === null || typeof req.body === 'undefined') response.sendBodyError(res, 'No data in body');

                var check = checker.checkFields(['first_name', 'last_name', 'email', 'password'], req.body);

                if (check.ok) {
                    register(req.body)
                    .then( apiResponse => response.sendApiSuccessResponse(res, 'Success', apiResponse) )
                    .catch( apiResponse => response.sendApiErrorResponse(res, 'Error', apiResponse) );
                } else response.sendFieldsError(res, 'Bad arguments', check.miss, check.extra);
            });

            // Login
            authRouter.post('/login', (req, res) => {
                // Use controller function
                if (req.body === null || typeof req.body === 'undefined') response.sendBodyError(res, 'No data in body');

                var check = checker.checkFields(['email', 'password'], req.body);

                if (check.ok) {
                    login(req.body)
                    .then( apiResponse => response.sendApiSuccessResponse(res, 'Success', apiResponse) )
                    .catch( apiResponse => response.sendApiErrorResponse(res, 'Error', apiResponse) );
                } else response.sendFieldsError(res, 'Bad arguments', check.miss, check.extra);
            });
        }

        init() {
            this.routes();
            return authRouter;
        }
    }
//

/*
Export
*/
    module.exports = AuthRouterClass;
//