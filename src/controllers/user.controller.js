const Exception = require('../helpers/exception');
const logger = require('../helpers/logger');
const { UserService } = require('../services');
const { StatusCodes } = require('../utils/responseUtils');

class UserController {
    async signUp(req) {
        try {
            return UserService.signUp(req.body);
        } catch (error) {
            logger.log(error);
            throw Exception.newException(StatusCodes.INTERNAL_SERVER_ERROR, 'An error occurred while creating user');
        }
    }

    async signIn(req) {
        try {
            return UserService.signIn(req.body);
        } catch (error) {
            logger.log(error);
            throw Exception.newException(StatusCodes.UNAUTHORIZED, 'Incorrect username or password!');
        }
    }
}

module.exports = UserController;
