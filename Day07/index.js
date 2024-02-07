const express = require('express')
const app = express()

function requestLoggerMiddleware(req, res, next) {
  const timeStramp = new Date().toISOString();
  const reqType = req.method;
  console.log(`${timeStramp} - ${reqType} request received`)
  next()
}

app.use(requestLoggerMiddleware)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000)