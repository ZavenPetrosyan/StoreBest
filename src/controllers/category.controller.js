const { Category } = require('../models/schemas/category.schema');

class CategoryController {
    static async listCategories() {
        try {
            const categories = await Category.find({}).lean();
            if (categories.length === 0) {
                throw new Error('No categories found!');
            }
            return categories;
        } catch (error) {
            console.error(error);
        }
    }

    static async addCategory(body) {
        try {
            const newCategory = new Category(body);
            const savedCategory = await newCategory.save();
            if (!savedCategory) {
                throw new Error('Failed to save category!');
            }
            return savedCategory;
        } catch (error) {
            console.error(error);
        }
    }

    static async editCategory(categoryId, data) {
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
        }
    }

    static async removeCategory(categoryId) {
        try {
            const deletedCategory = await Category.findByIdAndDelete(categoryId);
            if (!deletedCategory) {
                throw new Error('Failed to delete category!');
            }
            return deletedCategory;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = CategoryController;
