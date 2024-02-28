const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
const myRoutes = require('./routes/myRoute');
app.use('/api', myRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
