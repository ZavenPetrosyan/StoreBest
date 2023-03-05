const express = require('express');
const CatalogItemController = require('../controllers/catalogItem.controller');
const validateParams = require('../halpers/validateParams');

class CatalogItemRouter {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    async getCatalogItems(req, res, next) {
        try {
            const result = await CatalogItemController.listItems();
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async addCatalogItem(req, res, next) {
        try {
            const catalogItem = await CatalogItemController.addItem(req.body);
            res.status(201).json(catalogItem);
        } catch (error) {
            next(error);
        }
    }

    async updateCatalogItem(req, res, next) {
        try {
            const updatedCatalogItem = await CatalogItemController.editItem(
                req.params.id,
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
            const deletedCatalogItem = await CatalogItemController.removeItem(req.params.id);
            res.sendStatus(204, deletedCatalogItem);
        } catch (error) {
            next(error);
        }
    }

    initializeRoutes() {
        this.router.get('/', this.getCatalogItems);
        this.router.post(
            '/',
            validateParams(
                ['name', 'description', 'currency', 'price', 'category'],
                ['tags', 'imageUrls', 'avaliableCount']
            ),
            this.addCatalogItem
        );
        this.router.put(
            '/:id',
            validateParams(
                [],
                ['name', 'description', 'currency', 'price', 'category', 'tags', 'imageUrls', 'avaliableCount']
            ),
            this.updateCatalogItem
        );
        this.router.delete('/:id', this.deleteCatalogItem);
    }
}

module.exports = new CatalogItemRouter().router;
