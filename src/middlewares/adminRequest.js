module.exports = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        const error = new Error('Access Denied');
        error.status = 403;
        return next(error);
    }
    next();
}
