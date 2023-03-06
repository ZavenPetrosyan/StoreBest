const respondWithJson = (response, data = {}, status = 200, ...args) => {
    if (response.headersSent) return;
    return response.status(status).json(
        Object.assign({}, {
            status: status,
            timestamp: new Date().toUTCString()
        }, ...args, { data })
    ).end();
}

const StatusCodes = Object.freeze({
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NOT_FOUND: 404,
    BAD_GATEWAY: 502,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    REQUEST_TIMEOUT: 408,
    EXPECTATION_FAILED: 417,
    INTERNAL_SERVER_ERROR: 500,
});

const WrapRoute = (routeFn) => async (req, res, next) => {
    try {
        const result = await routeFn(req, res);
        respondWithJson(res, result);
    } catch (err) {
        next(err);
    }
}

module.exports = { WrapRoute, StatusCodes };
