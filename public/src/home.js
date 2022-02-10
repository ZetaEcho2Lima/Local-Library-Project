//Helpers for home.js
//First for an easy combination of sort and splice that is used a few times - splice to 5
function _sortAndSpliceArray(array) {
  array.sort((item1, item2) => item2.count - item1.count);
  array.splice(5);
  return array;
}
// Takes an array of books and an author ID and returns an array of books written by the given author
const _getBooksByWriterId = (books, authorId) => {
  return books.filter((books) => books.authorId === authorId);
};

//Core
function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  //variable to hold total books through loop
  let totalBooksBorrowed = 0;
  // loop
  books.forEach((books) => {
    //if statement to determine whether to add or not
    if (!books.borrows[0].returned) {
      totalBooksBorrowed++;
    }
  });
  //return total from previous variable declared
  return totalBooksBorrowed;
}

function getMostCommonGenres(books) {
  //create array with reduce
  let finalArrayHolder = books.reduce((genreToBookCountMap, book) => {
    //get genre of book
    let genreOfBook = book.genre;
    //get object in accumulator that has name equal to genre
    let genreExtra = genreToBookCountMap.find(
      (element) => element.name === genreOfBook
    );
    //if found add one
    if (genreExtra) {
      genreExtra.count++;
    }
    //otherwise create and push
    else {
      const newGenreExtra = {
        name: genreOfBook,
        count: 1,
      };
      genreToBookCountMap.push(newGenreExtra);
    }
    return genreToBookCountMap;
  }, []);
  //sorting greatest to least + CUT IT!
  return _sortAndSpliceArray(finalArrayHolder);
}

function getMostPopularBooks(books) {
  // new array with map
  let end = books.map((book) => {
    //name + count = required keys
    let popularityInfo = {
      name: book.title,
      count: book.borrows.length,
    };
    //remove from function to use
    return popularityInfo;
  });
  // sort it - max to min
  return _sortAndSpliceArray(end);
}

function getMostPopularAuthors(books, authors) {
  //create a new array with the authors + borrows will do so by popularity with map + reduce
  //first, map:
  let end = authors.map((authors) => {
    //declaring variables for what is within map
    //names using ` and shortening with authors.name (cuz... why not?)
    let short = authors.name;
    let moniker = `${short.first} ${short.last}`;
    //filter to get books by the writer Id in the list.
    let byWriterId = _getBooksByWriterId(books, authors.id);
    //reducing here to  get the count of how many times a book had been borrowed utilizing the previously created function
    let numberBorrows = byWriterId.reduce(
      (ac, book) => ac + book.borrows.length,
      0
    );
    //pop it into an updated object with name and count as the keys
    let end = {
      name: moniker,
      count: numberBorrows,
    };
    //return it to be used
    return end;
  });
  // then we sort the new end sort max to min and CUT, KILL, SPLICE! to limit to 5
  return _sortAndSpliceArray(end);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
