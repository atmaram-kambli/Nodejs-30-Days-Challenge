const express = require('express');
const cache = require('memory-cache'); // Or any other caching library

const cacheTime = 3600; // In milliseconds (1 minutes)

function cachingMiddleware(req, res, next) {
  const key = req.originalUrl;

  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    console.log(`Serving cached response for ${key}`);
    res.send(cachedResponse);
  } else {
    next();
  }

  res.on('finish', () => {
    if (res.statusCode === 200) {
      const responseCopy = res.send.bind(res);
      res.send = (data) => {
        cache.put(key, data, cacheTime);
        responseCopy(data);
      };
    }
  });
}

const app = express();
app.use(cachingMiddleware);

// Sample route (replace with your actual route)
app.get('/', (req, res) => {
  console.log('Generating new response...');
  res.send('Hello from the Express server!');
});

app.listen(3000, () => console.log('Server listening on port 3000'));