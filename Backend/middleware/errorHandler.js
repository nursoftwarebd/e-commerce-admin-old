// not found error handler
const notFoundHandler = async (req, res, next) => {
  const error = new Error("404 Not Found");
  error.status = 404;
  next(error);
};

// default error handler
const errorHandler = (error, req, res, next) => {
  if (error.status) {
    return res.status(error.status).send(`<h1>${error.message}</h1>`);
  }

  res.status(500).send(`<h1>SomeThings went wrong</h1>`);
};

module.exports = { notFoundHandler, errorHandler };
