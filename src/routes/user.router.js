const validateParams = require('../helpers/validateParams');
const BaseRouter = require('../utils/baseRouter');
const { UserController } = require('../controllers');
const { WrapRoute } = require('../utils/responseUtils');

class UserRouter extends BaseRouter {
    constructor(controller) {
        super();
        this.controller = controller;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.post('/sign-up', validateParams(['name', 'email', 'password'], ['isAdmin', 'userName']), WrapRoute(this.controller.signUp));
        this.put('/sign-in', validateParams(['username', 'password'], []), WrapRoute(this.controller.signIn));
    }
}

const userController = new UserController();
const userRouter = new UserRouter(userController);

module.exports = userRouter.router;
