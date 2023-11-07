const logoutHandler = (req, res, next) => {
  req.session.destroy(error => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error logging out.');
    }

    res.redirect('/');
  });
};

export default { logoutHandler };
