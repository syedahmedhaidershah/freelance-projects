const { fetch } = require('./http-fetch');
const { controlledGenerator } = require('./controlled-generator');
const informationExtractors = require('./information-extractor');

module.exports = {
    fetch,
    controlledGenerator,
    ...informationExtractors
}