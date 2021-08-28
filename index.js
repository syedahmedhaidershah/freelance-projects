/** custom factories and libraries */
const {
    fetch,  // fetch API replica function - uses http/https module
    controlledGenerator, // a controlled, timed generator function
    pakWheelsUsedCarsData // Retreival / loading mechanism for data from pakwheels
} = require('./libraries');

/** Static imports and data objects */
const {
    statics: {
        uri, // uri paths for retreiving pages
    },
    extractionLogics: { skipFields, extractFieldsCount }
} = require('./imports');

/** Program control folow algorithm */
const collectPakWheelsUsedCars = async (uri, options = {}) => {
    /** Retreiving a used cars page from pak wheels  */
    let response = await fetch(
        uri,
        options,
        true
    );

    /** Extracting and transforming information */
    const dataArray = pakWheelsUsedCarsData(response);

    /** Returning transformed information */
    return dataArray;
}


/** IIFE controlFlow funcction to start processes */
(controlFlow = async () => {
    try {
        /** Declaring url to use */
        const { pakWheelsUsedCars: useUrl } = uri;

        /** Generator function for controlled / timed iterations */
        const generatorController = controlledGenerator(10, {
            timeout: 7000
        });

        /** Async iterable generator based loop */
        for await (let iterator of generatorController) {
            /** Page 1 query parameters */
            page = iterator + 1;

            /** Log for indication of page retreival */
            console.log(`retreiving page ${page}`);

            /** extrating and reteiving transformed information */
            const collected = await collectPakWheelsUsedCars(useUrl + `?page=${page}`, { method: 'get' });

            /** If null / falsey object is returned an error is thrown */
            if (!collected) throw new Error(collected);

            console.log(collected);
        }

    } catch (exc) {
        console.log(exc);
        return false;
    }
})();

console.log('cycled');