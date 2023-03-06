const Exception = require('../helpers/exception');
const { Category } = require('../models/schemas/category.schema');
const { StatusCodes } = require('../utils/responseUtils');

class ItemCategoryService {
    static async listCategories() {
        const categories = await Category.find({}).lean();
        if (categories.length === 0) {
            throw Exception.newException(StatusCodes.NOT_FOUND, 'No categories found!');
        }
        return categories;
    }

    static async addCategory(body) {
        const newCategory = new Category(body);
        const savedCategory = await newCategory.save();
        if (!savedCategory) {
            throw Exception.newException(StatusCodes.BAD_REQUEST, 'Failed to save category!');
        }
        return savedCategory;
    }

    static async editCategory(categoryId, data) {
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            data,
            { new: true }
        );
        if (!updatedCategory) {
            throw Exception.newException(StatusCodes.BAD_REQUEST, 'Failed to update category!');
        }
        return updatedCategory;
    }

    static async removeCategory(categoryId) {
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            throw Exception.newException(StatusCodes.BAD_REQUEST, 'Failed to delete category!');
        }
        return deletedCategory;
    }
}

module.exports = ItemCategoryService;
