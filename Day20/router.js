// router.js

const express = require('express');
const router = express.Router();
const User = require('./models/user');

async function averageAgeOfUsers(req, res) {
  try {
    const pipeline = [
      {
        $group: {
          _id: null,
          averageAge: { $avg: "$age" }
        }
      }
    ];

    const result = await User.aggregate(pipeline);

    if (result.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    const averageAge = result[0].averageAge;
    return res.json({ averageAge });
  } catch (error) {
    console.error("Error calculating average age:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

router.get('/average-age', averageAgeOfUsers);

module.exports = router;
