const express = require('express');

const app = express();
const port = 4000;

app.get('/binary', (req, res) => {
    const buffer = new ArrayBuffer(10);
    const uint8 = new Uint8Array(buffer);

    // generate some data
    for (let i = 0; i< 10; i++) {
        uint8[i] = (Math.random() * 1000) % 256;
    }
    console.log(buffer);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(Buffer.from(uint8));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
