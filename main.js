const express = require('express');
const config = require('./src/utils/configLoader');
const db = require('./src/halpers/database');

const { itemCategoryRouter, catalogItemsRouter, userRouter } = require('./src/routes');
const { RoutePaths } = require('./src/utils/routesPaths.enum');

class App {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || config.www.port;
        this.initMiddlewares();
        this.initRoutes();
        // this.initErrorHandlers();
    }

    initMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    initRoutes() {
        this.app.use(RoutePaths.CATALOG_ITEMS, catalogItemsRouter);
        this.app.use(RoutePaths.CATEGORIES, itemCategoryRouter);
        this.app.use(RoutePaths.USERS, userRouter);
    }

    initErrorHandlers() {
        this.app.use((_req, _res, next) => {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        if (this.app.get('env') === 'development') {
            this.app.use((err, _req, res, _next) => {
                res.status(err.status || 500);
                res.send('error', {
                    message: err.message,
                    error: err
                });
            });
        } else {
            this.app.use((err, _req, res, _next) => {
                res.status(err.status || 500);
                res.send('error', {
                    message: err.message,
                    error: {}
                });
            });
        }
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

