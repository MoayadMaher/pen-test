const execHelper = require('../utils/execHelper');
const fs = require('fs');
const path = require('path');

exports.start = async (req, res) => {
    // try {
    //     const url = req.query.url;
    //     if (!url) {
    //         return res.status(400).send('URL is required for directory search.');
    //     }

    //     // Setting up the output file path
    //     const outputPath = path.join(__dirname, 'results', `${new Date().getTime()}_dirsearch.json`);

    //     // Constructing the command with JSON output
    //     const command = `dirsearch -u ${url} --format=json -o ${outputPath}`;
    //     await execHelper.runCommand(command);

    //     // Reading and sending the JSON output
    //     const results = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    //     res.json(results);
    // } catch (error) {
    //     res.status(500).send(error.message);
    // }

    res.json({ message: 'Directory search is still under development.' });
};
