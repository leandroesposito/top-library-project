const booksContainer = document.querySelector(".books-container");

const myLibrary = [];

function Book(author, title, numPages, read, id) {
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.read = read;
    this.id = id;
}

function addBookToLibrary(author, title, numPages, read) {
    const newBookId = myLibrary.length;
    const newBook = new Book(author, title, numPages, read, newBookId);

    myLibrary.push(newBook);

    return newBook;
}

function BookElement(book) {
    this.book = book;
}

BookElement.prototype.createElement = function () {
    function createRow(label, value) {
        const row = document.createElement("div");
        row.classList.add("row");

        const fieldName = document.createElement("span");
        fieldName.classList.add("field-name");
        fieldName.textContent = label;

        const valueText = document.createTextNode(` : ${value}`);

        row.appendChild(fieldName);
        row.appendChild(valueText);

        return row;
    }

    const newBookElement = document.createElement("div");
    newBookElement.classList.add("card");
    newBookElement.dataset.id = this.book.id;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.dataset.id = this.book.id;
    deleteButton.addEventListener("click", handleDeleteBookClick);

    newBookElement.appendChild(deleteButton);

    newBookElement.appendChild(createRow("Author", this.book.author));
    newBookElement.appendChild(createRow("Title", this.book.title));
    newBookElement.appendChild(createRow("Number of pages", this.book.numPages));
    newBookElement.appendChild(createRow("Has been read", this.book.read ? "Yes" : "No"));

    return newBookElement;
};

function handleDeleteBookClick(event) {
    target = event.target;

    const bookId = target.dataset.id;
    deleteBook(bookId);
}

function deleteBook(bookId) {
    const bookToDelete = document.querySelector(`.card[data-id="${bookId}"]`);

    if (bookToDelete) {
        bookToDelete.remove();
    }
}

function showBooks() {
    myLibrary.forEach(showBook);
}

function showBook(book) {
    const bookElement = new BookElement(book);
    booksContainer.appendChild(bookElement.createElement());
}

addBookToLibrary("Marijn Haverbeke", "Eloquent JavaScript, Third Edition", 472, false);
addBookToLibrary("Nicolás Bevacqua", "Practical Modern JavaScript", 334, true);
addBookToLibrary("Nicholas C. Zakas", "Understanding ECMAScript 6", 352, false);
addBookToLibrary("Axel Rauschmayer", "Speaking JavaScript", 460, false);
addBookToLibrary("Addy Osmani", "Learning JavaScript Design Patterns", 254, true);
addBookToLibrary("Kyle Simpson", "You Don't Know JS Yet", 143, false);
addBookToLibrary("Scott Chacon and Ben Straub", "Pro Git", 458, true);
addBookToLibrary("Caitlin Sadowski, Thomas Zimmermann", "Rethinking Productivity in Software Engineering", 310, true);

showBooks();