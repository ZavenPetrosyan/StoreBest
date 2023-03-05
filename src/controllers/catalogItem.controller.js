const { CatalogItemService } = require('../services');

class CatalogItemsController {
    async getCatalogItems(req, res, next) { 
        try {
            const result = await CatalogItemService.listItems();
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async addCatalogItem(req, res, next) {
        try {
            const catalogItem = await CatalogItemService.addItem(req.body);
            res.status(201).json(catalogItem);
        } catch (error) {
            next(error);
        }
    }

    async updateCatalogItem(req, res, next) {
        try {
            const { id } = req.params;
            const updatedCatalogItem = await CatalogItemService.editItem(
                id,
                req.body,
                { new: true }
            );
            res.json(updatedCatalogItem);
        } catch (error) {
            next(error);
        }
    }

    async deleteCatalogItem(req, res, next) {
        try {
            const { id } = req.params;
            const deletedCatalogItem = await CatalogItemService.removeItem(id);
            res.sendStatus(204, deletedCatalogItem);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = CatalogItemsController;