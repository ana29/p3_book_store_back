module.exports = function (app) {
    let controller = app.controllers.book;

    app.route('/api/books')
        .post(controller.saveBook)
        .get(controller.getBooks);

    app.route('/api/books/:id')
        .get(controller.getBookById)
        .delete(controller.deleteBookById);


};