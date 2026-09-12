
import React, { useEffect, useState } from "react";

import { Card } from "../../componenets/ui/Card";
import { SearchBar } from "../../componenets/ui/SearchBar";
import { Badge } from "../../componenets/ui/Badge";
import { Button } from "../../componenets/ui/Button";

import {
  getBooks,
  saveBooks,
  getBorrowings,
  saveBorrowings,
} from "../../utils/borrowingStorage";

export function AvailableBooksPage() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  useEffect(() => {
    setBooks(getBooks());
  }, []);

  const handleBorrow = (bookId) => {
    if (!currentUser) {
      return;
    }

    const updatedBooks = books.map((book) => {
      if (book.id === bookId && book.available > 0) {
        return {
          ...book,
          available: book.available - 1,
          status:
            book.available - 1 > 0
              ? "Available"
              : "Unavailable",
        };
      }

      return book;
    });

    const selectedBook = books.find(
      (book) => book.id === bookId
    );

    if (!selectedBook || selectedBook.available === 0) {
      return;
    }

    const borrowings = getBorrowings();

    const newBorrowing = {
      id: Date.now(),
      book: selectedBook.title,
      userId: currentUser.id,
      user: currentUser.name,
      issueDate: new Date().toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      ),
      returnDate: "Not Returned",
      status: "Borrowed",
    };

    const updatedBorrowings = [
      ...borrowings,
      newBorrowing,
    ];

    setBooks(updatedBooks);

    saveBooks(updatedBooks);
    saveBorrowings(updatedBorrowings);
  };

  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author} ${book.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#faf7f7] px-6 py-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#7b1113]">
          Available Books
        </h1>

        <p className="mt-2 text-sm text-[#9b8585]">
          Browse books available in the library and borrow your favorite ones.
        </p>
      </div>

      {/* Search */}
      <div className="mt-6 max-w-md">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search books..."
        />
      </div>

      {/* Books */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {filteredBooks.map((book) => (
          <Card
            key={book.id}
            className="transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(123,17,19,0.10)]"
          >

            <div className="flex items-start justify-between gap-4">

              <div>
                <h2 className="text-lg font-bold text-[#7b1113]">
                  {book.title}
                </h2>

                <p className="mt-1 text-sm text-[#6f4a4b]">
                  {book.author}
                </p>
              </div>

              <Badge
                variant={
                  book.available > 0
                    ? "success"
                    : "danger"
                }
              >
                {book.available > 0
                  ? "Available"
                  : "Unavailable"}
              </Badge>

            </div>

            <div className="mt-5 space-y-2 text-sm text-[#9b8585]">

              <p>
                <span className="font-medium text-[#6f4a4b]">
                  Category:
                </span>{" "}
                {book.category}
              </p>

              <p>
                <span className="font-medium text-[#6f4a4b]">
                  Available:
                </span>{" "}
                {book.available} / {book.quantity}
              </p>

            </div>

            <div className="mt-5">

              <Button
                className="w-full"
                disabled={book.available === 0}
                onClick={() => handleBorrow(book.id)}
              >
                {book.available > 0
                  ? "Borrow Book"
                  : "Not Available"}
              </Button>

            </div>

          </Card>
        ))}

      </div>

      {/* No Results */}
      {filteredBooks.length === 0 && (
        <div className="mt-10 text-center text-sm text-[#9b8585]">
          No books found.
        </div>
      )}

    </div>
  );
}