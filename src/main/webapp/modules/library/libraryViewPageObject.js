define(function(require) {

    var _ = require('underscore');
    var sinon = require('sinon');

    var AddBookViewPageObject = require('modules/library/books/addBookViewPageObject');

    var LibraryViewPageObject = function(libraryView) {
        this.view = libraryView;
    };

    _.extend(LibraryViewPageObject.prototype, {
        clickAddBook: function(callback) {
            var server = sinon.fakeServer.create();

            var genresResponse = [
                { name: "Crime novel" },
                { name: "Picaresco" }
            ];

            this.view.$(".add-book").click();

            server.respondWith([200, { "Content-Type": "application/json" }, JSON.stringify(genresResponse)]);
            server.respond();
            server.restore();

            callback(new AddBookViewPageObject(this.view.addBookView));
        },
        expectToHaveNumberOfBooks: function(numberOfBooksExpected) {
            expect(this.view.$(".books li").size()).toBe(numberOfBooksExpected);
        }
    });

    return LibraryViewPageObject;
});
