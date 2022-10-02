const env = process.env.ENVIRONMENT;

/**
 * logger prints to console
 * @options .info .error .warning
 * @param {string} message string to be printed
 */
const logger = {
    info: (message) => {
        env == 'dev' ? console.log(`info > ${message}`) : null;
    },
    error: (message) => {
        env == 'dev' ? console.error(`error > ${message}`) : null;
    },
    warning: (message) => {
        env == 'dev' ? console.warn(`warning > ${message}`) : null;
    },
};

module.exports = logger;
