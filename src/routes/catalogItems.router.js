const validateParams = require('../helpers/validateParams')
const checkAuth = require('../middlewares/authRequest');
const adminRequest = require('../middlewares/adminRequest');
const BaseRouter = require('../utils/baseRouter');
const { CatalogItemsController } = require('../controllers');
const { WrapRoute } = require('../utils/responseUtils');

class CatalogItemRouter extends BaseRouter {
    constructor(controller) {
        super();
        this.controller = controller;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.get('/', WrapRoute(this.controller.getCatalogItems));
        this.get('/search', checkAuth, WrapRoute(this.controller.searchCatalogItems));
        this.get('/:categoryId', checkAuth, WrapRoute(this.controller.getCatalogItemsByCategory));
        this.delete('/:id', checkAuth, adminRequest, WrapRoute(this.controller.deleteCatalogItem));
        this.post('/', checkAuth, adminRequest, validateParams(
            ['name', 'description', 'currency', 'price', 'category'],
            ['tags', 'imageUrls', 'avaliableCount']
        ),
            WrapRoute(this.controller.addCatalogItem)
        );
        this.put('/:id', checkAuth, adminRequest, validateParams(
            [],
            ['name', 'description', 'currency', 'price', 'category', 'tags', 'imageUrls', 'avaliableCount']
        ),
            WrapRoute(this.controller.updateCatalogItem)
        );
    }
}

const catalogItemsController = new CatalogItemsController();
const catalogItemsRouter = new CatalogItemRouter(catalogItemsController);

module.exports = catalogItemsRouter.router;
