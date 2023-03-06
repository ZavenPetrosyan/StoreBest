class Logger {
    constructor() {
        this.log = (msg, text, data) => {
            if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                console.log(msg, text, data);
            }
        }
    }
}

const logger = new Logger();

module.exports = logger;