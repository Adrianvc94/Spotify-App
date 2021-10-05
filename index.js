require('dotenv').config();
const express = require('express');
const app = express();
const port = 8888;

console.log(process.env.CLIENT_ID);

app.get('/', (req, res) => {
    const data = {
        name: 'Just a name',
        isAwesome: true
    };

    res.json(data);
});



app.listen(port, () => {
    console.log(`Express app listening http://localhost:${port}`);
});