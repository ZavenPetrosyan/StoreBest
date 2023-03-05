const { CatalogItem } = require('../models/schemas/catalogItem.schema');

class CatalogItemService {
    static async listItems() {
        try {
            const categories = await CatalogItem.find({}).lean();
            if (categories.length === 0) {
                throw new Error('No categories found!');
            }
            return categories;
        } catch (error) {
            console.error(error);
        }
    }

    static async addItem(body) {
        try {
            const newCategory = new CatalogItem(body);
            const savedCategory = await newCategory.save();
            if (!savedCategory) {
                throw new Error('Failed to save category!');
            }
            return savedCategory;
        } catch (error) {
            console.error(error);
        }
    }

    static async editItem(categoryId, data) {
        try {
            const updatedCategory = await CatalogItem.findByIdAndUpdate(
                categoryId,
                data,
                { new: true }
            );
            if (!updatedCategory) {
                throw new Error('Failed to update item!');
            }
            return updatedCategory;
        } catch (error) {
            console.error(error);
        }
    }

    static async removeItem(categoryId) {
        try {
            const deletedCategory = await CatalogItem.findByIdAndDelete(categoryId);
            if (!deletedCategory) {
                throw new Error('Failed to delete item!');
            }
            return deletedCategory;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = CatalogItemService;
