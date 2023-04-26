<<<<<<< HEAD
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  };
};

class UI {
  static displayBooks() {
  
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  };

  static addBookToList(book) {
     const list = document.querySelector('.container');
     const inside =  document.createElement('ul');
     inside.classList = 'book-holder'
     inside.innerHTML += `
      <p>${book.title}</p> <p class='by'>by</p> <p>${book.author}</p>
      <button class="delete">Remove</button>
     `;
     list.appendChild(inside);
=======
let books = JSON.parse(localStorage.getItem('books')) || [];
let count = 0;
function Book(title, author, id) {
  this.title = title;
  this.author = author;
  this.id = id;
}
function displayBooks() {
  const bookList = document.querySelector('ul');
  bookList.innerHTML = '';
  books.forEach((book) => {
    const contain = document.createElement('li');
    contain.id = book.id;
    contain.innerHTML = `
        <p>${book.title}</p>
        <p>${book.author}</p>
        <button class='remove-book-button'>Remove</button>
        <hr/>
        `;
    bookList.appendChild(contain);
  });
}
function addBookToCollection(title, author, id) {
  const newBook = new Book(title, author, id);
  books.push(newBook);
  localStorage.setItem('books', JSON.stringify(books));
  displayBooks();
}
function removeBookFromCollection(id) {
  books = books.filter((book) => book.id !== parseInt(id, 10));
  localStorage.setItem('books', JSON.stringify(books));
  displayBooks();
}
const addBookForm = document.getElementById('add-book-form');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  addBookToCollection(titleInput.value, authorInput.value, count);
  titleInput.value = '';
  authorInput.value = '';
  count += 1;
});
document.addEventListener('click', (e) => {
  const target = e.target.closest('.remove-book-button');
  if (target) {
    const { id } = target.parentNode;
    removeBookFromCollection(id);
>>>>>>> e328f0e9b807abef1e65a1393fbf3b40745b4a68
  }

  static clear() {
    const title = document.querySelector('#title').value = '';
    const author = document.querySelector('#author').value = '';
  }

  static deleteBook(target) {
    if(target.classList.contains('delete')) {
      target.parentElement.remove();
    };
  };
};

class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    };

    return books;
  };

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  };

  static removeBook(author) {
      const books = Store.getBooks();

      books.forEach((book, index)=> {
        if(book.author === author){
          books.splice(index, 1);
        }
      });
      localStorage.setItem('books', JSON.stringify(books));
  };

};

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
