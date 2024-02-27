const express = require('express');
const { getProductStatistics } = require('./db/statistics');

const app = express();
const port = 3000;

app.get('/statistics', async (req, res) => {
  try {
    const statistics = await getProductStatistics();
    res.json(statistics);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
