//Helpers for books.js
//transfer of function from accounts.js for use as a helper
function _findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

// Takes an array of books and returns an array of the non-returned books
const _getNonReturnedBooks = (books) => {
  return books.filter((book) =>
    book.borrows.some((transaction) => !transaction.returned)
  );
};
// Takes an array of books and returns an array of the returned books
const _getReturnedBooks = (books) => {
  return books.filter((book) =>
    book.borrows.every((transaction) => transaction.returned)
  );
};

//Core
function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  // create array of non-returned books
  const nonReturnedBooks = _getNonReturnedBooks(books);
  // create array of returned books
  const returnedBooks = _getReturnedBooks(books);
  // create empty array
  const result = [];
  // push non-returned books array
  result.push(nonReturnedBooks);
  // push returned books array
  result.push(returnedBooks);
  // return array
  return result;
}

function getBorrowersForBook(book, accounts) {
  // create array of transactons from the given book
  const transactions = book.borrows;
  // use map to add the transaction id's account info to the transaction
  const result = transactions.map((transaction) => {
    const accountInfo = _findAccountById(accounts, transaction.id);
    const newTransaction = {
      ...transaction,
      ...accountInfo,
    };
    return newTransaction;
  });
  // limit the amount of transactions to 10
  result.splice(10);
  // return the updated transaciton array
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
