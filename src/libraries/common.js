/**
* Get a promise that resolves after an argument number of milliseconds
* @param {number} t no of milliseconds
* @returns {Promise<number>} Resolves to the milliseconds awaited for.
*/
const promiseTimeout = (t) => new Promise((resolve, reject) => setTimeout(() => {
    resolve(t);
}, t));

/** Get a generator to yeild after a specified time, blocked by an unresolved promise
 * @param {number} val - number of iterations for async generator 
* @param {number} [timeout] - Number in milliseconds to set timer for
* @returns { Promise<number>} Resolves to the milliseconds awaited for.
*/
const getGen = async function* (val, timeout) {
    let i = 0;
    switch (typeof val) {
        case 'object':
            for (k of val) {
                if (timeout) {
                    await this.promiseTimeout(timeout);
                }
                yield k;
            }
            break;
        default:
            while (i < val) {
                if (timeout) {
                    await this.promiseTimeout(timeout);
                }
                yield i++;
            }
            break;
    }
}

/** Get a capitialized string
 * @param {string} text - A string parameter to capitalize
* @returns {string} Returns capitalized word
*/
const capitalize = (text) => {
    return text.substring(0, 1)
        .toUpperCase()
        .concat(text.substring(1))
}

/** Checks if the passed text is infact a stringified JSON Object, returns object if it's JSON
 * @param {string} stringifed - Text assumed to be stringified JSON
* @returns {boolean} Returns an array for affirmation and the object if the text is infact a stringified JSON
*/
const isTextJsonObject = (stringified) => {
    let toReturn = [false, null];

    if (!stringified || stringified === true) return toReturn;

    try {
        const parsed = JSON.parse(stringified);
        toReturn = [true, parsed];
    } catch (exc) { }

    return toReturn;
}

module.exports = {
    promiseTimeout,
    getGen,
    capitalize,
    isTextJsonObject
}