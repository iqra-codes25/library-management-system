
import { useEffect, useState } from "react";

import { dashboardStats } from "../../data/admindata/dashboardStats";
import { borrowingColumns } from "../../data/common/borrowingColumns";
import { getBooks, getBorrowings } from "../../utils/borrowingStorage";
import { users } from "../../data/userdata/Users";

import { Card } from "../../componenets/ui/Card";
import { Table } from "../../componenets/ui/Table";
import { Badge } from "../../componenets/ui/Badge";

export function AdminDashboard() {
  const [stats, setStats] = useState([]);
  const [borrowings, setBorrowings] = useState([]);

  useEffect(() => {
    const books = getBooks();
    const borrowingData = getBorrowings();

      const totalUsers = users.length;

    // Store borrowing data in state
    setBorrowings(borrowingData);

    // Total number of all book copies
    const totalBooks = books.reduce(
      (total, book) => total + book.quantity,
      0
    );

    // Total number of currently available book copies
    const availableBooks = books.reduce(
      (total, book) => total + book.available,
      0
    );

    // Total currently borrowed books
    const borrowedBooks = borrowingData.filter(
      (item) => item.status === "Borrowed"
    ).length;

    const updatedStats = dashboardStats.map((stat) => {
      if (stat.title === "Total Books") {
        return {
          ...stat,
          value: totalBooks,
        };
      }

      if (stat.title === "Available Books") {
        return {
          ...stat,
          value: availableBooks,
        };
      }

      if (stat.title === "Borrowed Books") {
        return {
          ...stat,
          value: borrowedBooks,
        };
      }

      if (stat.title === "Total Users") {
      return {
        ...stat,
        value: totalUsers,
      };
    }

      return stat;
    });

    setStats(updatedStats);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#faf7f7]">

      {/* Sidebar */}

      {/* Main Area */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Dashboard Content */}
        <main className="flex-1 px-6 py-8 lg:px-8">

          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#7b1113]">
              Welcome, Admin 👋
            </h1>

            <p className="mt-2 text-sm text-[#9b8585]">
              Here's what's happening in your library today.
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <Card key={stat.title} className="p-5">
                  <div className="flex items-start justify-between">

                    <div>
                      <p className="text-sm font-medium text-[#8f7778]">
                        {stat.title}
                      </p>

                      <h2 className="mt-2 text-3xl font-bold text-[#7b1113]">
                        {stat.value}
                      </h2>

                      <p className="mt-2 text-xs text-[#9b8585]">
                        {stat.description}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#f8eeee] p-3 text-[#7b1113]">
                      <Icon size={23} strokeWidth={2} />
                    </div>

                  </div>
                </Card>
              );
            })}
          </div>

          {/* Recent Borrowings */}
          <section className="mt-8">

            <div className="mb-4">
              <h2 className="text-xl font-bold text-[#4f3839]">
                Recent Borrowings
              </h2>

              <p className="mt-1 text-sm text-[#9b8585]">
                Latest book borrowing activity
              </p>
            </div>

            <Table
              columns={borrowingColumns}
              data={borrowings.map((item) => ({
                ...item,

                status: (
                  <Badge
                    variant={
                      item.status === "Returned"
                        ? "success"
                        : "warning"
                    }
                  >
                    {item.status}
                  </Badge>
                ),
              }))}
            />

          </section>

        </main>
      </div>
    </div>
  );
}