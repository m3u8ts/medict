const express = require('express');
const path = require('path');
const fs = require('fs');
const megajs = require('megajs');
const port = process.env.PORT || 3000;
const mime = require('mime-types');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'link.html'),);
});

app.get('/direct/:link', (req, res) => {
    let link = decodeURIComponent(req.params.link);
    let file = megajs.file(link);
    file.loadAttributes((err, file) => {
        res.set('Content-Type', mime.lookup(file.name));
        file.download({
            maxConnections: 10
        }, (err, data) => {
            if (err) throw err
            console.log(data);
            res.send(data);
        });
    });
});

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
