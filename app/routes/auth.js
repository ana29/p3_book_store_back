module.exports = function (app) {
    let controller = app.controllers.auth;

    app.route('/api/login')
        .post(controller.login)
        .get(controller.status);

    app.route('/api/logout')
        .delete(controller.logout);
};