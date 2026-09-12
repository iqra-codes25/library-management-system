
import React, { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";

import { Card } from "../../componenets/ui/Card";
import { userDashboardStats } from "../../data/userdata/userDashboardStats";
import { getBooks, getBorrowings } from "../../utils/borrowingStorage";

export function UserDashboard() {
  const [dashboardStats, setDashboardStats] = useState([]);

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  useEffect(() => {
    const books = getBooks();
    const borrowings = getBorrowings();

    const availableBooks = books.reduce(
      (total, book) => total + book.available,
      0
    );

    const myBorrowedBooks = borrowings.filter(
      (item) =>
        item.userId === currentUser?.id &&
        item.status === "Borrowed"
    ).length;

    const myHistory = borrowings.filter(
      (item) => item.userId === currentUser?.id
    ).length;

    const updatedStats = userDashboardStats.map((stat) => {
      if (stat.title === "Available Books") {
        return {
          ...stat,
          value: availableBooks,
        };
      }

      if (stat.title === "My Borrowed Books") {
        return {
          ...stat,
          value: myBorrowedBooks,
        };
      }

      if (stat.title === "Borrowing History") {
        return {
          ...stat,
          value: myHistory,
        };
      }

      return stat;
    });

    setDashboardStats(updatedStats);
  }, [currentUser?.id]);

  return (
    <div className="min-h-screen bg-[#faf7f7] px-6 py-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#7b1113]">
          Welcome back, {currentUser?.name} 👋
        </h1>

        <p className="mt-2 text-sm text-[#9b8585]">
          Explore books and manage your borrowing activity.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">

        {dashboardStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card
              key={stat.id}
              className="transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(123,17,19,0.10)]"
            >
              <div className="flex items-center justify-between">

                {/* Text */}
                <div>
                  <p className="text-sm text-[#9b8585]">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-[#7b1113]">
                    {stat.value}
                  </h2>
                </div>

                {/* Icon */}
                <div className="rounded-xl bg-[#f8eeee] p-3 text-[#7b1113]">
                  <Icon
                    size={24}
                    strokeWidth={2}
                  />
                </div>

              </div>
            </Card>
          );
        })}

      </div>

      {/* Available Books */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-[#7b1113]">
          Available Books
        </h2>

        <p className="mt-1 text-sm text-[#9b8585]">
          Browse books available in the library.
        </p>
      </div>

    {/* My Reading Status */}
<Card className="mt-8 border border-[#ead2d2] bg-white">
  <div className="flex items-center justify-between">

    <div>
      <p className="text-sm font-medium text-[#9b8585]">
        My Reading Status
      </p>

      <h2 className="mt-2 text-2xl font-bold text-[#7b1113]">
        Currently Borrowed
      </h2>

      <p className="mt-1 text-3xl font-bold text-[#9f1d20]">
        {dashboardStats.find(
          (stat) => stat.title === "My Borrowed Books"
        )?.value || 0}{" "}
        Books
      </p>

      <p className="mt-2 text-sm text-[#9b8585]">
        Keep exploring and discover your next favorite book.
      </p>
    </div>

    <div className="rounded-2xl bg-[#f8eeee] p-4 text-[#7b1113]">
      <BookOpen size={34} strokeWidth={1.8} />
    </div>

  </div>
</Card>
    </div>
  );
}