module.exports = (app) => {
  const controller = app.controllers.user;

  app.route('/user')
    .post()
    .get()
    .put()
    .delete();



};