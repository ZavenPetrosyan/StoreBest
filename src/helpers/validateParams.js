function validateParams(requiredParams, optionalParams) {
    return (req, res, next) => {
        // Check for required body parameters
        const missingParams = requiredParams.filter((param) => !(param in req.body));
        if (missingParams.length > 0) {
            return res.status(400).json({ message: `Missing required parameter(s): ${missingParams.join(', ')}` });
        }
        // Check for unexpected body parameters
        const unexpectedParams = Object.keys(req.body).filter((param) => !requiredParams.includes(param) && !optionalParams.includes(param));
        if (unexpectedParams.length > 0) {
            return res.status(400).json({ message: `Unexpected parameter(s): ${unexpectedParams.join(', ')}` });
        }
        next();
    };
}

module.exports = validateParams;
