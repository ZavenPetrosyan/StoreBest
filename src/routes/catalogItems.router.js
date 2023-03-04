const express = require('express');
const CatalogItemController = require('../controllers/catalogItem.controller');

class CatalogItemRouter {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }
    
    async getCatalogItems(req, res, next) {
        try {
            const result = await CatalogItemController.listItems()
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async addCatalogItem(req, res, next) {
        try {
            const catalogItem = await CatalogItemController.addItem();
            const savedCatalogItem = await catalogItem.save();
            res.status(201).json(savedCatalogItem);
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
            if (!updatedCatalogItem) {
                return res.sendStatus(404);
            }
            res.json(updatedCatalogItem);
        } catch (error) {
            next(error);
        }
    }

    async deleteCatalogItem(req, res, next) {
        try { 
            const deletedCatalogItem = await CatalogItemController.removeItem(req.params.id);
            if (!deletedCatalogItem) {
                return res.sendStatus(404);
            }
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }

    initializeRoutes() {
        this.router.get('/', this.getCatalogItems);
        this.router.post('/', this.addCatalogItem);
        this.router.put('/:id', this.updateCatalogItem);
        this.router.delete('/:id', this.deleteCatalogItem);
    }
}

module.exports = new CatalogItemRouter().router;
