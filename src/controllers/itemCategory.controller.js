const Exception = require('../helpers/exception');
const { ItemCategoryService } = require('../services');
const { StatusCodes } = require('../utils/responseUtils');

class ItemCategoryController {
    async listCategories(_req) {
        return ItemCategoryService.listCategories();
    }

    async addCategory(req) {
        return ItemCategoryService.addCategory(req.body);
    }

    async editCategory(req) {
        const updatedCategory = await ItemCategoryService.editCategory(req.params.id, req.body);
        if (!updatedCategory) {
            throw Exception.newException(StatusCodes.NOT_FOUND, 'Category not found!');
        }
        return updatedCategory;
    }

    async removeCategory(req) {
        const deletedCategory = await ItemCategoryService.removeCategory(req.params.id);
        if (!deletedCategory) {
            throw Exception.newException(StatusCodes.NOT_FOUND, 'Category not found!');
        }
        return deletedCategory;
    }
}

module.exports = ItemCategoryController;
