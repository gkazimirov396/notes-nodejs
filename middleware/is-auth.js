export default (req, res, next) => {
  if (!req.user) {
    const error = new Error('Access Denied!');
    error.status = 401;
    return next(error);
  }

  next();
};
