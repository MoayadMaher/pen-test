const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./utils/errorHandler');
const nmap = require('./tools/nmap');
const whois = require('./tools/whois');
const dirsearch = require('./tools/dirsearch');



app.use(cors(
    {
        origin: '*',
        optionsSuccessStatus: 200,
    }
));

app.use(express.json());

app.get('/nmap/scan', nmap.scan);
app.get('/whois/lookup', whois.lookup);
app.get('/dirsearch/start', dirsearch.start);

app.get('/', (req, res) => {
    res.send('API is running');
});

app.use(errorHandler);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
