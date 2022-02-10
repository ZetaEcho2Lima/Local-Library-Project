//Helpers for accounts.js
// simplifying this, which is used later.
const _getAuthorById = (authors, id) => {
  return authors.find((author) => author.id === id);
};

//Core
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((acc1, acc2) =>
    acc1.name.last.toUpperCase() > acc2.name.last.toUpperCase() ? 1 : -1
  );
}
/*Utilizing ? format instead
   {
   return 1
 } 
 else {
   return -1}
}*/

function getTotalNumberOfBorrows(account, books) {
  //Decon to isolate
  const { id } = account;
  //declare 0 variable
  let end = 0;
  //loop
  for (let book in books) {
    //decon
    const { borrows } = books[book];
    //second loop
    borrows.forEach((borrowsValue) => {
      //if equal, add to end
      if (borrowsValue.id === id) {
        end++;
      }
    });
  }
  return end;
}

function getBooksPossessedByAccount(account, books, authors) {
  //declare variables for use - simplify account.id
  const accountId = account.id;
  let end = [];
  //begin modification of blank array with filter
  end = books.filter((book) => {
    return book.borrows.some(
      (borrow) => borrow.id === accountId && !borrow.returned
    );
  });
  //map through the new array
  end = end.map((book) => {
    //helper function - doesnt really see other use, but still used
    let author = _getAuthorById(authors, book.authorId);
    //plug in a new object
    const newBook = {
      ...book,
      author,
    };
    return newBook;
  });
  return end;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
