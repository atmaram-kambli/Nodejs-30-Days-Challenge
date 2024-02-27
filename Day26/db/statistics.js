const { getDatabase } = require('../db/connection');

async function getProductStatistics() {
  const db = getDatabase();
  const result = await db.collection('products').aggregate([
    {
      $group: {
        _id: null,
        totalProducts: { $sum: 1 },
        averagePrice: { $avg: '$price' },
        highestQuantity: { $max: '$quantity' }
      }
    },
    {
      $project: {
        _id: 0 // Exclude _id field from the result
      }
    }
  ]).toArray();
  
  return result[0];
}

module.exports = {
  getProductStatistics
};
