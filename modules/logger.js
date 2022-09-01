/**
 * logger prints to console
 * @options .info .error .warning
 * @param {string} message string to be printed
 */
const logger = {
    info: (message) => {
        console.log(`info > ${message}`);
    },
    error: (message) => {
        console.error(`error > ${message}`);
    },
    warning: (message) => {
        console.warn(`warning > ${message}`);
    },
};

module.exports = logger;
