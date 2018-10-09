module.exports = function (app) {
    let controller = app.controllers.auth;

    app.route('/api/login')
        .post(controller.login);
};