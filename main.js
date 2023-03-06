const express = require('express');
const config = require('./src/utils/configLoader');
const db = require('./src/helpers/database');

const { itemCategoryRouter, catalogItemsRouter, userRouter } = require('./src/routes');
const { BasePaths } = require('./src/utils/basePaths.enum');
const { handleError } = require('./src/helpers/handleError');

class App {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || config.www.port;
        this.initMiddlewares();
        this.initRoutes();
        this.initErrorHandlers();
    }

    initMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    initRoutes() {
        this.app.use(BasePaths.CATALOG_ITEMS, catalogItemsRouter);
        this.app.use(BasePaths.CATEGORIES, itemCategoryRouter);
        this.app.use(BasePaths.USERS, userRouter);
    }

    initErrorHandlers() {
        this.app.use((_req, _res, next) => {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
        this.app.use((err, req, res, next) => {
            handleError(req, res, err, err.code);
            next();
        });
    }

    initDatabase() {
        db.init(config.databaseConfig);
    }

    start() {
        this.initDatabase();
        this.app.listen(this.port, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log('[%s] Server running on http://localhost:%d', this.app.settings.env, this.port);
        });
    }
}

const app = new App();
app.start();

module.exports = app;

