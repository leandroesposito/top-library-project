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
    const newBookElement = document.createElement("div");
    newBookElement.classList.add("card");
    newBookElement.dataset.id = this.book.id;

    const pAuthor = document.createElement("p");
    const pTitle = document.createElement("p");
    const pNumPages = document.createElement("p");
    const pRead = document.createElement("p");

    pAuthor.textContent = `Author: ${this.book.author}`;
    pTitle.textContent = `Title: ${this.book.title}`;
    pNumPages.textContent = `Number of pages: ${this.book.numPages}`;
    pRead.textContent = `Has been read: ${this.book.read ? "Yes" : "No"}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.dataset.id = this.book.id;
    deleteButton.addEventListener("click", handleDeleteBookClick);

    newBookElement.appendChild(deleteButton);
    newBookElement.appendChild(pTitle);
    newBookElement.appendChild(pAuthor);
    newBookElement.appendChild(pNumPages);
    newBookElement.appendChild(pRead);

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
