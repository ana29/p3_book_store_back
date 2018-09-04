module.exports = function (app) {
    let controller = app.controllers.users;



    app.get('/', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ a: 1 }));
    });

    app.route('/api/users')
        .post(controller.saveUser)
        .get(controller.getUsers);

}