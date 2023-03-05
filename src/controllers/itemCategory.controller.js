const { ItemCategoryService } = require('../services');

class ItemCategoryController {
    async listCategories(req, res, next) {
        try {
            const categories = await ItemCategoryService.listCategories();
            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }

    async addCategory(req, res, next) {
        try {
            const newCategory = await ItemCategoryService.addCategory(req.body);
            res.status(201).json(newCategory);
        } catch (error) {
            next(error);
        }
    }

    async editCategory(req, res, next) {
        try {
            const updatedCategory = await ItemCategoryService.editCategory(req.params.id, req.body);
            if (!updatedCategory) {
                return res.status(404).send('Category not found');
            }
            res.status(200).json(updatedCategory);
        } catch (error) {
            next(error);
        }
    }

    async removeCategory(req, res, next) {
        try {
            const deletedCategory = await ItemCategoryService.removeCategory(req.params.id);
            if (!deletedCategory) {
                return res.status(404).send('Category not found');
            }
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ItemCategoryController;