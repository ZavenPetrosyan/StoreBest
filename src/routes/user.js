const express = require('express');
const { UserModel: User } = require('../models/user.model');

class UserRouter {
    constructor() {
        this.router = express.Router();
        this.router.post('/signUp', this.signUp);
        this.router.put('/signIn', this.signIn);
    }

    async signUp(req, res) {
        const { username, password } = req.body;
        const user = new User(username, password);

        try {
            await user.register();
            const token = await user.login();
            res.status(201).send({ token });
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while creating user');
        }
    }

    async signIn(req, res) {
        const { username, password } = req.body;
        const user = new User(username, password);

        try {
            const token = await user.login();
            res.status(200).send({ token });
        } catch (error) {
            console.error(error);
            res.status(401).send('Incorrect username or password');
        }
    }

    async searchItem(req, res) {
        const { username, password } = req.body;
        const user = new User(username, password);

        try {
            const token = await user.login();
            res.status(200).send({ token });
        } catch (error) {
            console.error(error);
            res.status(401).send('Incorrect username or password');
        }
    }
}

module.exports = new UserRouter().router;
