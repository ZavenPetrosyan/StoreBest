const { CatalogItemService } = require('../services');

class CatalogItemsController {
    async getCatalogItems(_req) {
        return CatalogItemService.listItems();
    }

    async addCatalogItem(req) {
        return CatalogItemService.addItem(req.body);
    }

    async updateCatalogItem(req) {
        const { id } = req.params;
        const updatedCatalogItem = await CatalogItemService.editItem(
            id,
            req.body,
            { new: true }
        );
        return updatedCatalogItem;
    }

    async deleteCatalogItem(req) {
        const { id } = req.params;
        const deletedCatalogItem = await CatalogItemService.removeItem(id);
        return deletedCatalogItem
    }

    async searchCatalogItems(req) {
        const searchResults = await CatalogItemService.searchItems(req.query);
        return searchResults;
    }

    async getCatalogItemsByCategory(req) {
        const { categoryId } = req.params;
        const items = await CatalogItemService.listItemsByCategory(categoryId);
        return items;
    }
}

module.exports = CatalogItemsController;

