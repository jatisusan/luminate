const errorHandler = async (err, req, res, next) => {
    let errStatus = err.status || 500;
    let errMsg = err.message || "Internal Server Error";
    res.status(errStatus).send({ error: errMsg, stack: err.stack });
}

export default errorHandler;