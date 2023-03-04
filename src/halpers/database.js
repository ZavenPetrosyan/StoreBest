const mongoose = require('mongoose');

class Database {
    constructor() {
        this.connection = null;
    }

    init(config) {
        console.log(`Trying to connect to ${config.host}/${config.database} MongoDB database`);
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        const connString = 'mongodb://localhost:27017';
        // const connString = `mongodb://${config.host}/${config.database}`;
        mongoose.connect(connString, options);
        this.connection = mongoose.connection;
        this.connection.on('error', console.error.bind(console, 'connection error:'));
        this.connection.once('open', () => console.log('db connection open'));
        return this.connection;
    }

    close() {
        if (this.connection) {
            this.connection.close(() => {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        }
    }
}

module.exports = new Database();
