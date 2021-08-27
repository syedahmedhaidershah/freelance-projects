const controlledGenerator = async function* (count, options = {}) {
    const { timeout = 2000 } = options;

    let i = 0;
    while (i < count) {
        await new Promise((resolve, reject) => {
            setTimeout(resolve, timeout);
        });
        yield i++;
    }
}

module.exports = {
    controlledGenerator
}