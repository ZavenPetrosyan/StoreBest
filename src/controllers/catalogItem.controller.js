const { Category } = require('../models/schemas/category.schema');

class CatalogItemController {
    static async listItems() {
        try {
            const categories = await Category.find({}).lean();
            if (categories.length === 0) {
                throw new Error('No categories found!');
            }
            return categories;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch categories!');
        }
    }

    static async addItem(body) {
        try {
            const newCategory = new Category(body);
            const savedCategory = await newCategory.save();
            if (!savedCategory) {
                throw new Error('Failed to save category!');
            }
            return savedCategory;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to add category!');
        }
    }

    static async editItem(categoryId, data) {
        try {
            const updatedCategory = await Category.findByIdAndUpdate(
                categoryId,
                data,
                { new: true }
            );
            if (!updatedCategory) {
                throw new Error('Failed to update category!');
            }
            return updatedCategory;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to update category!');
        }
    }

    static async removeItem(categoryId) {
        try {
            const deletedCategory = await Category.findByIdAndDelete(categoryId);
            if (!deletedCategory) {
                throw new Error('Failed to delete category!');
            }
            return deletedCategory;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to delete category!');
        }
    }
}

module.exports = CatalogItemController;
