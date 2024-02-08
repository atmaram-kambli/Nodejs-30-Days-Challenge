const express = require('express')
const app = express();

function errorHandler(err, req, res, next) {
    if(err.message === 'Not Positive Number') {
        res.status(400).json({error: `A parameter 'number' must be valid positive number`})
    }else {
        next(err);
    }
}

function positiveIntegerHandler(req, res, next) {
    const num = parseInt(req.query.num);
    if(Number.isInteger(num) == false || num <= 0) {
        const error = new Error("Not Positive Number");
        return next(error);
    }
    next();
}

app.get('/positive', positiveIntegerHandler, (req, res) => {
    res.send(`<h1>Number is Positive Number.</h1>`)
})

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log("App is running on port", port);
})