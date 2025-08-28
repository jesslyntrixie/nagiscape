// /server/middleware/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
    // Log error untuk debugging
    console.error(`ERROR: ${err.message}`);
    console.error(process.env.NODE_ENV === 'production' ? null : err.stack);

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
    });
};

module.exports = { errorHandler };