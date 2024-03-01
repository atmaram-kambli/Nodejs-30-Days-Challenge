function errorHandler(err, req, res, next) {
    console.error(err);

    const statusCode = err.statusCode || 500;

    // Send an appropriate error response to the client
    res.status(statusCode).json({
        error: {
            message: err.message || 'Internal Server Error'
        }
    });
}

module.exports = errorHandler;
