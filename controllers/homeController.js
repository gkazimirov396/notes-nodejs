const getHomePage = (req, res, next) => {
  res.render('pages/index', {
    title: 'Notes',
    description: 'Free Nodejs Notes App.',
    layout: '../views/layouts/front-page.ejs',
  });
};

export default { getHomePage };
