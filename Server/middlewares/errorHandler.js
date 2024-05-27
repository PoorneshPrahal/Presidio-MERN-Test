const errorHandler = (err, req, res, next) => {
  console.log(err.stack);

  const status = req.status ? req.status : 500;

  res.status(status).json({ message: err.message });
};

module.exports = errorHandler;
