const booksContainer = document.querySelector(".books-container");
const newBookButton = document.querySelector("button.new-book");
const newBookDialog = document.querySelector(".new-book-dialog");
const newBookForm = document.querySelector("#new-book-form");
const closeDialogButton = document.querySelector(".close-dialog-button");

const myLibrary = [];
const booksElements = []

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
    this.node = null;
}

BookElement.prototype.createElement = function () {
    function createRow(label, value, className) {
        const row = document.createElement("div");
        row.classList.add("row");

        const fieldName = document.createElement("span");
        fieldName.classList.add("field-name");
        fieldName.textContent = label;

        const valueText = document.createElement("span");
        valueText.textContent = ` : ${value}`;
        valueText.classList.add(className);

        row.appendChild(fieldName);
        row.appendChild(valueText);

        return row;
    }

    function createButton(text, className, id, callback) {
        const button = document.createElement("button");
        button.textContent = text;
        button.classList.add(className);
        button.dataset.id = id;
        button.addEventListener("click", callback);

        return button;
    }

    const newBookElement = document.createElement("div");
    newBookElement.classList.add("card");
    newBookElement.dataset.id = this.book.id;

    const deleteButton = createButton("X", "close-card-button", this.book.id, handleDeleteBookClick);
    const toggleReadButton = createButton("Toggle read status", "toggle-read-button", this.book.id, handleToggleReadClick);

    newBookElement.appendChild(deleteButton);

    newBookElement.appendChild(createRow("Author", this.book.author), "author");
    newBookElement.appendChild(createRow("Title", this.book.title), "title");
    newBookElement.appendChild(createRow("Number of pages", this.book.numPages), "num-pages");

    const readRow = createRow("Has been read", this.book.read ? "Yes" : "No", "read");
    readRow.appendChild(toggleReadButton);

    newBookElement.appendChild(readRow);

    this.node = newBookElement

    return this.node;
};

BookElement.prototype.toggleReadStatus = function () {
    this.book.read = !this.book.read;
    const readValueSpan = this.node.querySelector(".read");
    readValueSpan.textContent = ` : ${this.book.read ? "Yes" : "No"}`;
};

function handleDeleteBookClick(event) {
    target = event.target;

    const bookId = target.dataset.id;
    deleteBook(bookId);
}

function handleToggleReadClick(event) {
    target = event.target;

    const bookId = target.dataset.id;
    toggleBookReadStatus(bookId);
}

function toggleBookReadStatus(bookId) {
    booksElements[bookId].toggleReadStatus();
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
    booksElements.push(bookElement);
    booksContainer.appendChild(bookElement.createElement());
}

addBookToLibrary("Marijn Haverbeke", "Eloquent JavaScript, Third Edition", 472, false);
addBookToLibrary("Nicolás Bevacqua", "Practical Modern JavaScript", 334, true);
addBookToLibrary("Nicholas C. Zakas", "Understanding ECMAScript 6", 352, false);

showBooks();

newBookButton.addEventListener("click", () => {
    newBookDialog.showModal();
});

newBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event);

    const formData = new FormData(newBookForm);

    const author = formData.get("author");
    const title = formData.get("title");
    const numPages = formData.get("num-pages");
    const read = Boolean(formData.get("read"));

    const newBook = addBookToLibrary(author, title, numPages, read);
    showBook(newBook);

    newBookDialog.close();
    newBookForm.reset();
})

closeDialogButton.addEventListener("click", () => newBookDialog.close());