module.exports = function (app) {
    let controller = app.controllers.users;

    app.route('/api/users')
        .post(controller.saveUser)
        .get(controller.getUsers);

    app.route('/api/users/:id')
        .get(controller.getUserById)
        .delete(controller.deleteUserById);
};