const { UserModel: User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Config = require('../halpers/configLoader');

class UserController {
    static async signUp(body) {
        const { name, userName, email, password, isAdmin } = body;
        const user = new User(userName, password, email, name, isAdmin);
        return user.register();
    }

    static async signIn(body) {
        const { username, password } = body;
        const user = await User.getByUsername(username);
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send('Invalid username or password');
        }

        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, Config.secretKey);
        return token;
    }
}

module.exports = UserController;

