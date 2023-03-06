const Exception = require('../helpers/exception');
const { CatalogItem } = require('../models/schemas/catalogItem.schema');
const { StatusCodes } = require('../utils/responseUtils');

class CatalogItemService {
    static async listItems() {
        const categories = await CatalogItem.find({}).lean();
        if (categories.length === 0) {
            throw Exception.newException(StatusCodes.BAD_REQUEST, 'No catalog-items found!');
        }
        return categories;
    }

    static async addItem(body) {
        const newCategory = new CatalogItem(body);
        const savedCategory = await newCategory.save();
        if (!savedCategory) {
            throw Exception.newException(StatusCodes.BAD_REQUEST, 'Failed to save catalog-items!');
        }
        return savedCategory;

    }

    static async editItem(categoryId, data) {
        const updatedCategory = await CatalogItem.findByIdAndUpdate(
            categoryId,
            data,
            { new: true }
        );
        if (!updatedCategory) {
            throw Exception.newException(StatusCodes.BAD_REQUEST, 'Failed to update catalog-items!');
        }
        return updatedCategory;

    }

    static async removeItem(categoryId) {
        const deletedCategory = await CatalogItem.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            throw Exception.newException(StatusCodes.BAD_REQUEST, 'Failed to delete catalog-items!');
        }
        return deletedCategory;
    }

    static async searchItems(query) {
        const { name, tags, description } = query;
        const filter = {};
        if (name) {
            filter.name = { $regex: new RegExp(name, 'i') };
        }
        if (tags) {
            filter.tags = { $in: tags };
        }
        if (description) {
            filter.description = { $regex: new RegExp(description, 'i') };
        }
        const searchResults = await CatalogItem.find(filter).lean();
        if (searchResults.length === 0) {
            throw Exception.newException(StatusCodes.NOT_FOUND, 'No catalog-items found!');
        }
        return searchResults;
    }

    static async listItemsByCategory(categoryId) {
        const items = await CatalogItem.find({ category: categoryId }).lean();
        if (items.length === 0) {
            throw Exception.newException(StatusCodes.NOT_FOUND, 'No items found for this category!');
        }
        return items;
    }
}

module.exports = CatalogItemService;

