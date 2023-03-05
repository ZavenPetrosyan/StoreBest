const validateParams = require('../halpers/validateParams')
const checkAuth = require('../middlewares/authRequest');
const adminRequest = require('../middlewares/adminRequest');
const BaseRouter = require('../utils/baseRouter');
const { CatalogItemsController } = require('../controllers');

class CatalogItemRouter extends BaseRouter {
    constructor(controller) {
        super();
        this.controller = controller;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.get('/', this.controller.getCatalogItems);
        this.delete('/:id', checkAuth, adminRequest, this.controller.deleteCatalogItem);
        this.post('/', checkAuth, adminRequest, validateParams(
            ['name', 'description', 'currency', 'price', 'category'],
            ['tags', 'imageUrls', 'avaliableCount']
        ),
            this.controller.addCatalogItem
        );
        this.put('/:id', checkAuth, adminRequest, validateParams(
            [],
            ['name', 'description', 'currency', 'price', 'category', 'tags', 'imageUrls', 'avaliableCount']
        ),
            this.controller.updateCatalogItem
        );
    }
}

const catalogItemsController = new CatalogItemsController();
const catalogItemsRouter = new CatalogItemRouter(catalogItemsController);

module.exports = catalogItemsRouter.router;
