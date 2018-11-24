/*
Imports
*/
    // NodeJS
    const { Router } = require('express');

    // Inner
    const AuthRouterClass = require('./auth/auth.routes');
    const ChatRouterClass = require('./chat/chat.routes');
//

/*
Define routers
*/
    // Parent
    const mainRouter = Router({ mergeParams: true });
    const apiRouter = Router({ mergeParams: true });

    // Child
    const authRouter = new AuthRouterClass();
    const chatRouter = new ChatRouterClass();
//

/*
Define routes
*/
    mainRouter.use('/api', apiRouter);
    apiRouter.use('/auth', authRouter.init());
    apiRouter.use('/chat', chatRouter.init());
    // addSomeRoutes(apiRouter, '/auth', AuthRouterClass);
    // addSomeRoutes(apiRouter, '/chat', ChatRouterClass);
//

/*
Export
*/
    module.exports = { mainRouter };
//

// function addSomeRoutes(router, path, classRoute) {
//     router.use(path, new classRoute().init());
// }