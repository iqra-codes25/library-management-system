import { recentBorrowings } from "../data/common/recentBorrowings";
import { books } from "../data/common/books";
const BORROWINGS_KEY = "borrowings";
const BOOKS_KEY = "books";

// export const getBorrowings = () => {
//   const savedBorrowings = localStorage.getItem(BORROWINGS_KEY);

//   if (savedBorrowings) {
//     return JSON.parse(savedBorrowings);
//   }

//   localStorage.setItem(
//     BORROWINGS_KEY,
//     JSON.stringify(recentBorrowings)
//   );

//   return recentBorrowings;
// };

export const getBorrowings = () => {
  const savedBorrowings = localStorage.getItem(BORROWINGS_KEY);

  if (savedBorrowings) {
    return JSON.parse(savedBorrowings);
  }

  return [];
};



export const saveBorrowings = (borrowings) => {
  localStorage.setItem(
    BORROWINGS_KEY,
    JSON.stringify(borrowings)
  );
};

export const getBooks = () => {
  const savedBooks = localStorage.getItem(BOOKS_KEY);

  if (savedBooks) {
    return JSON.parse(savedBooks);
  }

  localStorage.setItem(
    BOOKS_KEY,
    JSON.stringify(books)
  );

  return books;
};

export const saveBooks = (books) => {
  localStorage.setItem(
    BOOKS_KEY,
    JSON.stringify(books)
  );
};

const USERS_KEY = "users";

export const getUsers = () => {
  const savedUsers = localStorage.getItem(USERS_KEY);

  return savedUsers ? JSON.parse(savedUsers) : [];
  
};