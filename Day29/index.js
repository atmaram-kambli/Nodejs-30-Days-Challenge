const express = require('express');
const app = express();
const errorHandler = require('./middleware/errhandler');
const exampleRoutes = require('./routes/ex');

// Other middleware and routes...

// Register exampleRoutes
app.use('/example', exampleRoutes);

// Register the errorHandler middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
