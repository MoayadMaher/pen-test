const execHelper = require('../utils/execHelper');

exports.lookup = async (req, res) => {
    try {
        const url = req.query.url;
        if (!url) {
            return res.status(400).send('URL is required for WHOIS lookup.');
        }
        const rawOutput = await execHelper.runCommand(`whois ${url}`);
        const parsedResult = parseWhoisData(rawOutput);
        res.json(parsedResult);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

function parseWhoisData(rawData) {
    const result = {};
    const lines = rawData.split('\n');

    lines.forEach(line => {
        const separatorIndex = line.indexOf(':');

        if (separatorIndex !== -1) {
            const key = line.substring(0, separatorIndex).trim();
            const value = line.substring(separatorIndex + 1).trim();

            if (value && (!result[key] || (Array.isArray(result[key]) && result[key].indexOf(value) === -1))) {
                if (result[key]) {
                    if (Array.isArray(result[key])) {
                        result[key].push(value);
                    } else {
                        result[key] = [result[key], value];
                    }
                } else {
                    result[key] = value;
                }
            }
        }
    });

    return result;
}
