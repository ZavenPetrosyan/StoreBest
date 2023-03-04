const express = require('express');
const CategoryController = require('../controllers/category.controller');

class CategoryRouter {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    async listCategories(req, res, next) {
        try {
            const categories = await CategoryController.listCategories();
            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }

    async addCategory(req, res, next) {
        try {
            const newCategory = await CategoryController.addCategory(req.body);
            res.status(201).json(newCategory);
        } catch (error) {
            next(error);
        }
    }

    async editCategory(req, res, next) {
        try {
            const updatedCategory = await CategoryController.editCategory(req.params.id, req.body);
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
            const deletedCategory = await CategoryController.removeCategory(req.params.id);
            if (!deletedCategory) {
                return res.status(404).send('Category not found');
            }
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }

    initializeRoutes() {
        this.router.get('/', this.listCategories.bind(this));
        this.router.post('/', this.addCategory.bind(this));
        this.router.put('/:id', this.editCategory.bind(this));
        this.router.delete('/:id', this.removeCategory.bind(this));
    }

}

module.exports = CategoryRouter;
