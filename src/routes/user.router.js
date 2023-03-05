const validateParams = require('../halpers/validateParams');
const BaseRouter = require('../utils/baseRouter');
const { UserController } = require('../controllers');

class UserRouter extends BaseRouter {
    constructor(controller) {
        super();
        this.controller = controller;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.post('/sign-up', validateParams(['name', 'email', 'password'], ['isAdmin', 'userName']), this.controller.signUp);
        this.put('/sign-in', validateParams(['username', 'password'], []), this.controller.signIn);
    }
}

const userController = new UserController();
const userRouter = new UserRouter(userController);

module.exports = userRouter.router;
