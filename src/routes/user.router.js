const express = require('express');
const UserController = require('../controllers/user.controller');
const validateParams = require('../halpers/validateParams');

class UserRouter {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    async signUp(req, res) {
        try {
            const user = await UserController.signUp(req.body);
            res.status(201).send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while creating user');
        }
    }

    async signIn(req, res) {
        try {
            const token = await UserController.signIn(req.body);
            res.status(200).send({ token });
        } catch (error) {
            console.error(error);
            res.status(401).send('Incorrect username or password');
        }
    }

    initializeRoutes() {
        this.router.post('/signup', validateParams(
            ['name', 'email', 'password'],
            ['isAdmin', 'userName']
        ), this.signUp.bind(this));
        this.router.put('/signin', validateParams(
            ['username', 'password'],
            []
        ), this.signIn.bind(this));
    }
}

module.exports = new UserRouter().router;
