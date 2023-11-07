const getAboutPage = (req, res, next) => {
  return res.render('pages/about', {
    title: 'About - Notes',
    description: 'Free Nodejs Notes App.',
  });
};

export default { getAboutPage };
