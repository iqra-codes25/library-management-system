
import React, { useEffect, useState } from "react";

import { Card } from "../../componenets/ui/Card";
import { SearchBar } from "../../componenets/ui/SearchBar";
import { Badge } from "../../componenets/ui/Badge";
import { Button } from "../../componenets/ui/Button";

import { books as defaultBooks } from "../../data/common/books";

import {
  getBorrowings,
  saveBorrowings,
  getBooks,
  saveBooks,
} from "../../utils/borrowingStorage";

export function MyBorrowedBooks() {
  const [search, setSearch] = useState("");
  const [borrowings, setBorrowings] = useState([]);

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  useEffect(() => {
    setBorrowings(getBorrowings());
  }, []);

  const handleReturn = (borrowingId) => {
    const borrowing = borrowings.find(
      (item) => item.id === borrowingId
    );

    if (!borrowing) {
      return;
    }

    const updatedBorrowings = borrowings.map((item) => {
      if (item.id === borrowingId) {
        return {
          ...item,
          status: "Returned",
          returnDate: new Date().toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          ),
        };
      }

      return item;
    });

    const books = getBooks(defaultBooks);

    const updatedBooks = books.map((book) => {
      if (book.title === borrowing.book) {
        const newAvailable = book.available + 1;

        return {
          ...book,
          available: newAvailable,
          status:
            newAvailable > 0
              ? "Available"
              : "Unavailable",
        };
      }

      return book;
    });

    setBorrowings(updatedBorrowings);

    saveBorrowings(updatedBorrowings);
    saveBooks(updatedBooks);
  };

  const myBooks = borrowings.filter(
    (item) =>
      item.userId === currentUser?.id &&
      item.status === "Borrowed"
  );

  const filteredBooks = myBooks.filter((item) =>
    `${item.book} ${item.user} ${item.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#faf7f7] px-6 py-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#7b1113]">
          My Borrowed Books
        </h1>

        <p className="mt-2 text-sm text-[#9b8585]">
          View the books you have borrowed and manage your current borrowing activity.
        </p>
      </div>

      {/* Search */}
      <div className="mt-6 max-w-md">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search borrowed books..."
        />
      </div>

      {/* Books */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {filteredBooks.map((item) => (
          <Card
            key={item.id}
            className="transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(123,17,19,0.10)]"
          >

            {/* Book Header */}
            <div className="flex items-start justify-between gap-4">

              <div>
                <h2 className="text-lg font-bold text-[#7b1113]">
                  {item.book}
                </h2>

                <p className="mt-1 text-sm text-[#6f4a4b]">
                  Borrowed by: {item.user}
                </p>
              </div>

              <Badge variant="success">
                Borrowed
              </Badge>

            </div>

            {/* Details */}
            <div className="mt-5 space-y-2 text-sm text-[#9b8585]">

              <p>
                <span className="font-medium text-[#6f4a4b]">
                  Issue Date:
                </span>{" "}
                {item.issueDate}
              </p>

              <p>
                <span className="font-medium text-[#6f4a4b]">
                  Return Date:
                </span>{" "}
                {item.returnDate}
              </p>

            </div>

            {/* Action */}
            <div className="mt-5">
              <Button
                className="w-full"
                onClick={() => handleReturn(item.id)}
              >
                Return Book
              </Button>
            </div>

          </Card>
        ))}

      </div>

      {/* No Results */}
      {filteredBooks.length === 0 && (
        <div className="mt-10 text-center text-sm text-[#9b8585]">
          No borrowed books found.
        </div>
      )}

    </div>
  );
}