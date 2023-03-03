const express = require('express');
const { CatalogItem } = require('../models/catalogItem.schema');

class CatalogItemRouter {
    constructor() {
        this.router = express.Router();
        this.router.post('/', this.addCatalogItem);
        this.router.put('/:id', this.updateCatalogItem);
        this.router.delete('/:id', this.deleteCatalogItem);
    }

    async addCatalogItem(req, res, next) {
        try {
            const catalogItem = new CatalogItem(req.body);
            const savedCatalogItem = await catalogItem.save();
            res.status(201).json(savedCatalogItem);
        } catch (error) {
            next(error);
        }
    }

    async updateCatalogItem(req, res, next) {
        try {
            const updatedCatalogItem = await CatalogItem.findByIdAndUpdate(
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
            const deletedCatalogItem = await CatalogItem.findByIdAndDelete(req.params.id);
            if (!deletedCatalogItem) {
                return res.sendStatus(404);
            }
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CatalogItemRouter().router;
