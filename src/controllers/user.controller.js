const User = require('./user');

class UserController {
    static async signUp(req, res) {
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

    static async signIn(req, res) {
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

    static async search(req, res) {
        const { name, tags, description } = req.query;
        const products = await Product.search(name, tags, description);
        res.status(200).send({ products });
    }
}

module.exports = UserController;

