const express = require('express');
const { CatalogItem } = require('../models/catalogItem.schema');

class UserRouter {
    constructor() {
        this.router = express.Router();
        this.router.post('/signIn', this.signIn);
        this.router.put('/signOut', this.signOut);
    }

    async signIn(req, res, next) {
        try {
            const catalogItem = new CatalogItem(req.body);
            const savedCatalogItem = await catalogItem.save();
            res.status(201).json(savedCatalogItem);
        } catch (error) {
            next(error);
        }
    }

    async signOut(req, res, next) {
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
}

module.exports = new UserRouter().router;
