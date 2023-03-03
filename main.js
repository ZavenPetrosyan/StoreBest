const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('./src/halpers/configLoader');
const db = require('./src/halpers/database');
const routes = require('./src/routes/index');
const { RoutePaths } = require('./src/halpers/routesPaths.enum');

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
        this.app.use(cookieParser());
    }

    initRoutes() {
        this.app.use(RoutePaths.CATALOG_ITEMS, routes.catalogItemsRouter);
        this.app.use(RoutePaths.CATEGORIES, routes.categoryRouter);
        this.app.use(RoutePaths.USERS, routes.userRouter);
    }

    initErrorHandlers() {
        this.app.use((req, res, next) => {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        if (this.app.get('env') === 'development') {
            this.app.use((err, req, res, next) => {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        } else {
            this.app.use((err, req, res, next) => {
                res.status(err.status || 500);
                res.render('error', {
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
        // this.initDatabase();
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
