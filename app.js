const express = require('express');
const path = require('path');
const megajs = require('megajs');
const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'link.html'),);
});

app.get('/direct/:link', (req, res) => {
    let link = decodeURIComponent(req.params.link);
    let file = megajs.file(link);
    file.loadAttributes((err, file) => {
        file.download({
            maxConnections: 10,
            initialChunkSize: 64000,
            chunkSizeIncrement: 64000,
            maxChunkSize: 1000000,
            returnCiphertext: false
        }, (err, data) => {
            if (err) throw err
            res.type(file.name);
            res.send(data);
        });
    });
});

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
