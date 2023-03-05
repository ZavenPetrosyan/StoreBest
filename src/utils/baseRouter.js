const express = require('express');

class BaseRouter {
    constructor() {
        this.router = express.Router();
    }

    get(path, ...handlers) {
        this.router.get(path, ...handlers);
    }

    post(path, ...handlers) {
        this.router.post(path, ...handlers);
    }

    put(path, ...handlers) {
        this.router.put(path, ...handlers);
    }

    delete(path, ...handlers) {
        this.router.delete(path, ...handlers);
    }
}

module.exports = BaseRouter;
