const { StatusCodes } = require("../utils/responseUtils");
const logger = require("./logger");

const handleError = (req, res, error, status = StatusCodes.INTERNAL_SERVER_ERROR) => {
    if (res.headersSent) return;
    logger.log('error', `Request Error: ${req.originalUrl}`, {
        data: { error: error },
    });
    return res.status(status).json({
        status,
        error: error.message || error,
        timestamp: new Date().toUTCString()
    }).end();
}

module.exports = { handleError };
