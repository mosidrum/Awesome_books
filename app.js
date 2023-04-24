if (localStorage.getItem('Added Books') == null) {
  localStorage.setItem('Added Books', JSON.stringify([]));
}

const storeData = JSON.parse(localStorage.getItem('Added Books'));

function updateData() {
  localStorage.setItem('Added Books', JSON.stringify(storeData));
}

function addNewData(bookTitle, bookAuthor) {
  const Book = {
    title: bookTitle,
    author: bookAuthor,
  };
  storeData.push(Book);
  updateData();
  displayBooks();
}

const bookForm = document.querySelector('form');
bookForm.addEventListener('submit', (e) => {
  const title = document.querySelector('.title');
  const author = document.querySelector('.author');
  e.preventDefault();
  addNewData(title.value, author.value);
});

function createBook(arr) {
  let books = '';
  for (let i = 0; i < arr.length; i++) {
    books += `
      <p>${arr[i].title}</p>
      <p>${arr[i].author}</p>
      <button onclick = "removeBook(${i})">Remove</button>
      <hr/>
    `;
  }
  return books;
}

function displayBooks() {
  const listOfBooks = document.querySelector('.container');
  listOfBooks.innerHTML = `
    <ul>
      ${createBook(storeData)}
    </ul>
  `
};

function removeBook(i) {
  storeData.splice(i);
  updateData();
  displayBooks();
}
removeBook();

window.location.reload = displayBooks();
