const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Config = require('../utils/configLoader');
const Exception = require('../helpers/exception');
const { StatusCodes } = require('../utils/responseUtils');
const { UserModel: User } = require('../models/user.model');

class UserService {
    static async signUp(body) {
        const {
            name, userName, email, password, isAdmin
        } = body;
        const userEntity = new User(userName, password, email, name, isAdmin);
        return userEntity.register();
    }

    static async signIn(body) {
        const { username, password } = body;
        const user = await User.getByUsername(username);
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            throw Exception.newException(StatusCodes.UNAUTHORIZED, 'Invalid username or password!');
        }

        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, Config.secretKey);
        return token;
    }
}

module.exports = UserService;
