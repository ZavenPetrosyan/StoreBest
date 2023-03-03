class Logger {
    constructor() {
        this.log = (msg) => {
            if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                console.log(msg);
            }
        }
    }
}

const logger = new Logger();

module.exports = logger;