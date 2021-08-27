const { parse: parser } = require('node-html-parser');

const {
    fetch,
    controlledGenerator
} = require('./libraries');

const {
    statics: {
        uri,
        omitTexts,
        citiesInPakistan
    },
    extractionLogics: { skipFields, extractFieldsCount }
} = require('./imports');

class PostDetails {
    attrs = {
        title: '',
        originalImageData: '',
        imageSrc: '',
        price: 'PKR0',
        city: '',
        year: '',
        mileage: '0',
        consumptionType: 'Petrol',
        ccDisplacement: '0 cc',
        transmission: 'Manual',
    }

    constructor(data = {}) {
        for (let key in data) {
            this.attrs[key] = data[key];
        }
    }

    setAttribute = (key, value) => {
        this.attrs[key] = value;
    }

    setAttributes = (data) => {
        for (let key in data) {
            this.attrs[key] = data[key];
        }
    }

    get data() {
        return { ...this.attrs };
    }
}

const informationExtractor = (elements) => {
    return Array.from(elements)
        .map(element => {
            const useData = element.innerText
                .split(/[\n]{1,}|[\s]{2,}/g)
                .filter(text => text)
                .filter(text => !omitTexts.includes(text.toLowerCase().replace(/\s/g, '')));

            let rating = null;

            const useLength = useData.length;

            // cutt off last line
            useData.splice(useLength - 1, 1);

            /** if CALL not available
            * cut off 7th field
            * cut off 5th field
            * cut off 4th field
            * cut off 3rd field
            * cut off 2nd field
            * **/
            onCallPricePresent = useData.reduce((t, a) => {
                const present = a.toLowerCase() === 'call';
                return t || present;
            }, false);

            if (!onCallPricePresent) {
                useData.splice(6, 1);
                useData.splice(4, 1);
                useData.splice(3, 1);
                useData.splice(2, 1);
                useData.splice(1, 1);
            }


            /**
             * if element 6 includes "/"
             * remove rating and store
             */
            if (useData[5].includes('\/')) {
                rating = useData[5];
                useData.splice(5, 1);
            }

            /** if element 5 is not in cities
            * remove it */
            if (!citiesInPakistan.includes(useData[5].toLowerCase())) {
                useData.splice(5, 1)
            }

            /** if element 5 is not in cities
            * combine element 5 into 4 */
            if (!citiesInPakistan.includes(useData[3].toLowerCase())) {
                useData[3] += useData[4];
                useData.splice(4, 1);
            }

            /**
             * search for PKR
            * if found
            * remove first match
            * move second match to first position
             */
            const priceFields = useData
                .map((e, i) => {
                    if (e.toString().includes('PKR'))
                        return i;
                })
                .filter(e => e)

            const [toRemove, toKeep] = priceFields;

            useData.splice(toRemove, 1);

            const [keep] = useData.splice(toKeep - 1, 1);

            useData.unshift(keep);

            return [
                useData.length,
                ...useData
            ];
        });
}

const collect = async (uri, options = {}) => {
    try {
        let response = await fetch(uri, options, true);


        let resolverWaitLoaded;
        let searchResultULs;

        waitTillLoadedPromise = new Promise((resolve, reject) => {
            resolverWaitLoaded = resolve;
        });

        setTimeout(() => {
            const root = parser(response);

            searchResultULs = root.querySelectorAll('.search-list')

            resolverWaitLoaded(searchResultULs);
        }, 0);

        const foundElements = await waitTillLoadedPromise;

        const dataArray = informationExtractor(foundElements);

        return dataArray;
    } catch (exc) {
        console.log(exc);
        return false;
    }
}


(async () => {
    const generatorController = controlledGenerator(100, {
        timeout: 3000
    });

    for await (let iterator of generatorController) {
        page = iterator + 1;
        console.log(`retreiving page ${page}`);
        const collected = await collect(uri + `?page=${page}`, { method: 'get' });
        if (!collected) throw new Error(collected);
        console.log(collected);
    }
})();

console.log('cycled');