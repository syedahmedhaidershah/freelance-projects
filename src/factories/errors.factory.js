const { Errors } = require('../constants');

class ErrorsFactory {

    #message = '';
    #status = 500;

    /**
     * Returns a factory to generate a custom API Error
     * average time per element for all answerscripts in an exam.
     * @param {string} dataObject.message - Message Data object with error config
     * @param {string|number} dataObject.statusId - Status to set in Data object with error config
     * @returns {ErrorsFactory} ErrorsFactory Object - An error factory object
     */
    constructor(dataObject) {
        const { message, statusId } = dataObject;
        try {
            this.#message = message;
            if (typeof statusId === number)
                return this.#status = Errors[statusId];
            if (typeof statusId === number)
                this.#status = statusId;
        } catch (exc) {
            throw exc;
        }
    };

    get Error() {
        return { error: new Error(this._message, this._status), status: this._status }
    }
}


module.exports = ErrorsFactory;