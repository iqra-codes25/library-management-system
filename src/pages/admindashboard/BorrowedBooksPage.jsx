
import React, { useState,useEffect } from "react";
import { Card } from "../../componenets/ui/Card";
import { SearchBar } from "../../componenets/ui/SearchBar";
import { Table } from "../../componenets/ui/Table";
import { Badge } from "../../componenets/ui/Badge";

import { borrowingColumns } from "../../data/common/borrowingColumns";
import { getBorrowings } from "../../utils/borrowingStorage";

export function BorrowedBooksPage() {
  const [borrowings, setBorrowings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
  const savedBorrowings = getBorrowings();
  setBorrowings(savedBorrowings);
}, []);

  // Search Borrowed Books
  const filteredBorrowings = borrowings.filter((item) => {
    const searchValue = search.toLowerCase();

    return (
      item.book.toLowerCase().includes(searchValue) ||
      item.user.toLowerCase().includes(searchValue) ||
      item.status.toLowerCase().includes(searchValue)
    );
  });

  // Table Data
  const tableData = filteredBorrowings.map((item) => ({
    ...item,

    status: (
      <Badge
        variant={
          item.status === "Borrowed"
            ? "warning"
            : "success"
        }
      >
        {item.status}
      </Badge>
    ),
  }));

  return (
    <div className="px-6 py-8 lg:px-8">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#7b1113]">
          Borrowed Books
        </h1>

        <p className="mt-2 text-sm text-[#9b8585]">
            View all book borrowing and return history from here.
        </p>
      </div>

      {/* Search */}
      <Card className="mb-6 p-5">
        <SearchBar
          placeholder="Search by book, user or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Card>

      {/* Borrowed Books Table */}
      <section>

        <div className="mb-4">
          <h2 className="text-xl font-bold text-[#4f3839]">
            Borrowing Records
          </h2>

          <p className="mt-1 text-sm text-[#9b8585]">
            List of all book borrowing transactions.
          </p>
        </div>

        <Table
          columns={borrowingColumns}
          data={tableData}
        />

      </section>

    </div>
  );
}