const jwt = require('jsonwebtoken');
const Config =  require('../utils/configLoader');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).send('Access denied');
    }

    try {
        // Verify the JWT and extract the user ID and role
        const { id, isAdmin } = jwt.verify(token, Config.secretKey);

        // Set the user object on the request
        req.user = { id, isAdmin };

        // Call the next middleware function
        return next();
    } catch (err) {
        return res.status(401).send('Access denied');
    }
}
