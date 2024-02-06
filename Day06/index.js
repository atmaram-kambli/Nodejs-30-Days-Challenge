const express = require('express');
const app = express();

const port = 3000;

app.get('/greet', (req, res) => {
    const name = req.query.name;
    if (name) {
        res.send(`<h1>Hello ${name.toUpperCase()}👋!</h1>`)
    }
    else {
        res.send(`<h1>Hello Guest👋!</h1>`);
    }
})

app.listen(port, () => {
    console.log("App is running on port", port);
})