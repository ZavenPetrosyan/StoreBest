const UserService =  require('../services');

class UserController {
    async signUp(req, res) {
        try {
            const user = await UserService.signUp(req.body);
            res.status(201).send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while creating user');
        }
    }

    async signIn(req, res) {
        try {
            const token = await UserService.signIn(req.body);
            res.status(200).send({ token });
        } catch (error) {
            console.error(error);
            res.status(401).send('Incorrect username or password');
        }
    }
}

module.exports = UserController;