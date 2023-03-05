const validateParams = require('../halpers/validateParams');
const BaseRouter = require('../utils/baseRouter');
const checkAuth = require('../middlewares/authRequest');
const adminRequest = require('../middlewares/adminRequest');

const { ItemCategoryController } = require('../controllers');

class ItemCategoryRouter extends BaseRouter {
    constructor(controller) {
        super();
        this.controller = controller;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.get('/', this.controller.listCategories);
        this.post('/', checkAuth, adminRequest, validateParams(['name'], []), this.controller.addCategory);
        this.put('/:id', checkAuth, adminRequest, validateParams([], ['name']), this.controller.editCategory);
        this.delete('/:id', checkAuth, adminRequest, this.controller.removeCategory);
    }
}

const itemCategoryController = new ItemCategoryController();
const itemCategoryRouter = new ItemCategoryRouter(itemCategoryController);

module.exports = itemCategoryRouter.router;
