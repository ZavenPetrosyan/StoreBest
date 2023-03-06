const Exception = require('../helpers/exception');
const { StatusCodes } = require('../utils/responseUtils');
const { User } = require('./schemas/user.schema');

class UserModel {
    constructor(userName, password, email, name, isAdmin) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin || false;
        this.userName = userName || `user_${Math.floor(Date.now() / 1000)}`;
    }

    async register() {
        try {
            const user = new User({
                userName: this.userName,
                password: this.password,
                isAdmin: this.isAdmin,
                email: this.email,
                name: this.name,
            });
            return await user.save();
        } catch (error) {
            throw Exception.newException(StatusCodes.INTERNAL_SERVER_ERROR, 'Error creating user DB!');
        }
    }

    static async getByUsername(username) {
        try {
            return await User.findOne({ userName: username });
        } catch (error) {
            throw Exception.newException(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to get user DB!');
        }
    }
}

module.exports = { UserModel };
