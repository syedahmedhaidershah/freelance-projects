const StringFunctions = {
  /**
   * Convert a string into pascal case
   * @params {string} str string to convert into pascal case
   * @returs {string} Pascal case string
   */
  toPascalCase: (str = 'pascalCase') => {
    const pascalCase = str.substring(0, 1).toUpperCase().concat(str.substr(1).toLowerCase());
    return pascalCase;
  },
};

module.exports = {
  StringFunctions,
};
