class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(author) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.author === author) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('.container');
    const inside = document.createElement('ul');
    inside.classList = 'book-holder';
    inside.innerHTML += `
      <p>${book.title}</p> <p class='by'>by</p> <p>${book.author}</p>
      <button class="delete">Remove</button>
     `;
    list.appendChild(inside);
  }

  static clear() {
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    title.value = '';
    author.value = '';
  }

  static deleteBook(target) {
    if (target.classList.contains('delete')) {
      target.parentElement.remove();
    }
  }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  const book = new Book(title, author);

  UI.addBookToList(book);

  Store.addBook(book);

  UI.clear();
});

document.querySelector('.container').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  Store.removeBook(e.target.previousElementSibling.textContent);
});
