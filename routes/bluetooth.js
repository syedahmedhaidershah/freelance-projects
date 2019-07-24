const execSync = require('child_process').execSync;

module.exports = {
    scan: async function () {
        execSync('hcitool scan');
        const devices = await execSync('sudo bluetoothctl');
        return Buffer.from(devices).toString();
    }
}