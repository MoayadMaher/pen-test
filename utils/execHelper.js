const { promisify } = require('util');
const { exec } = require('child_process');

const promisifiedExec = promisify(exec);

exports.runCommand = async (command) => {
    try {
        const { stdout, stderr } = await promisifiedExec(command);
        if (stderr) throw new Error(stderr);
        return stdout;
    } catch (error) {
        throw new Error('Error executing command: ' + error.message);
    }
};
