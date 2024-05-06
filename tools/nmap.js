const execHelper = require('../utils/execHelper');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

exports.scan = async (req, res) => {
    try {
        const target = req.query.url;
        if (!target) {
            return res.status(400).send('Target IP address is required.');
        }
        const xmlOutput = await execHelper.runCommand(`nmap -oX -  -T5 --max-rtt-timeout 1s --min-parallelism 100 ${target}`);
        parser.parseString(xmlOutput, (err, result) => {
            if (err) {
                return res.status(500).send('Failed to parse XML.');
            }
            const formattedResult = formatScanResult(result);
            res.json(formattedResult);
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


function formatScanResult(data) {
    const host = data.nmaprun.host[0];
    const hostInfo = {
        address: host.address[0].$.addr,
        hostnames: host.hostnames[0].hostname.map(h => h.$.name)
    };

    const openPorts = host.ports[0].port.map(port => ({
        id: port.$.portid,
        protocol: port.$.protocol,
        state: port.state[0].$.state,
        service: port.service[0].$.name,
        serviceDetails: {
            product: port.service[0].$.product || 'unknown',
            version: port.service[0].$.version || 'unknown'
        }
    }));

    return { hostInfo, openPorts };
}