module.exports = function (app) {
    var Book = app.models.book;
    var controller = {};

    controller.saveBook = (req, res) => {
        console.log('API: saveBook');
        var book = new Book(req.body);

        book.save(function (erro, book) {
            if (erro) {
                res.status(500).json(erro).end();
                console.log(erro);
            } else {
                res.json(book);
                res.status(201);
                console.log(201);
            }
        });
    };


    controller.getBooks = function (req, res) {
        console.log('API: getBooks');
        Book.find().exec().then(
            function (book) {
                res.json(book);
                res.status(201);
                console.log(201);
            },
            function (erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    };


    controller.getBookById = function (req, res) {
        console.log('API: getBookById');
        var _id = req.params.id;
        Book.findById(_id).exec()
            .then(
                function (book) {
                    if (!book) throw new Error("Book not found");
                    res.json(book)
                },
                function (erro) {
                    console.log(erro);
                    res.status(404).json(erro)
                }
            );
    };

    controller.deleteBookById = (req, res) => {
        console.log('API: deleteBookById');
        let _id = req.params.id;
        Book.findById(_id).remove().exec()
            .then(
                function () {
                    res.end();
                },
                function (erro) {
                    return console.error(erro);
                }
            );
    };
    return controller;

}
