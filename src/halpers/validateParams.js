function validateParams(requiredBodyParams, optionalBodyParams) {
    return function (req, res, next) {
        const unexpectedParams = Object.keys(req.body).filter(param => ![
            ...requiredBodyParams,
            ...optionalBodyParams
        ].includes(param));

        if (unexpectedParams.length > 0) {
            return res.status(400).send(`Unexpected parameter(s) found: ${unexpectedParams.join(', ')}`);
        }

        // Check for required body parameters
        if (requiredBodyParams.length) {
            for (const param of requiredBodyParams) {
                if (!req.body[param]) {
                    return res.status(400).send(`Body parameter ${param} is required`);
                }
            }
        }

        // Extract optional body parameters
        const optional = {};
        if (optionalBodyParams.length) {
            for (const param of optionalBodyParams) {
                if (req.body[param]) {
                    optional[param] = req.body[param];
                }
            }
        }

        // Add optional parameters to request object
        req.optional = optional;

        // Call next middleware
        return next();
    };
}

module.exports = validateParams;