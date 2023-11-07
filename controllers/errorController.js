const getNotFoundPage = (req, res, next) => {
  res.status(404).render('pages/404', {
    message: `Page not found. ${req.originalUrl} is not a valid url!`,
    title: 'Page Not Found',
  });
};

const getErrorPage = (error, req, res, next) => {
  console.error(error);

  const status = error.status || 500;
  const message = error.message || 'An error occurred.';

  res.status(status).render('pages/500', {
    message,
    title: 'An Error Occurred',
  });
};

export default { getNotFoundPage, getErrorPage };
