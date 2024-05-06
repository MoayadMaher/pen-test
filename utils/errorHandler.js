function errorHandler(err, req, res, next) {
    console.error(err);  // Log error information to console
    const status = err.status || 500;
    const message = err.message || 'Something went wrong on the server.';
    res.status(status).json({ error: message });
}

module.exports = errorHandler;
