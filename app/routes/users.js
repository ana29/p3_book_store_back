module.exports = function (app) {
    let controller = app.controllers.users;

    app.get('/', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(":3");
    });

    app.route('/api/users')
        .post(controller.saveUser)
        .get(controller.getUsers);

    app.route('/api/users/:id')
        .get(controller.getUserById)
        .delete(controller.deleteUserById);


}