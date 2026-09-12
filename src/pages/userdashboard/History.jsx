
// import React, { useState } from "react";

// import { Card } from "../../componenets/ui/Card";
// import { SearchBar } from "../../componenets/ui/SearchBar";
// import { Badge } from "../../componenets/ui/Badge";

// import { recentBorrowings } from "../../data/common/recentBorrowings";

// export function History() {
//   const [search, setSearch] = useState("");

//   // Get current logged-in user
//   const currentUser = JSON.parse(
//     localStorage.getItem("currentUser")
//   );

//   // Get current user's borrowing history
//   const myHistory = recentBorrowings.filter(
//     (item) => item.userId === currentUser?.id
//   );

//   // Search history
//   const filteredHistory = myHistory.filter((item) =>
//     `${item.book} ${item.user} ${item.status}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-[#faf7f7] px-6 py-8">

//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold text-[#7b1113]">
//           Borrowing History
//         </h1>

//         <p className="mt-2 text-sm text-[#9b8585]">
//           View your complete borrowing history, including borrowed and returned books.
//         </p>
//       </div>

//       {/* Search */}
//       <div className="mt-6 max-w-md">
//         <SearchBar
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search borrowing history..."
//         />
//       </div>

//       {/* History */}
//       <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

//         {filteredHistory.map((item) => (
//           <Card
//             key={item.id}
//             className="transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(123,17,19,0.10)]"
//           >

//             {/* Book Header */}
//             <div className="flex items-start justify-between gap-4">
//               <div>
//                 <h2 className="text-lg font-bold text-[#7b1113]">
//                   {item.book}
//                 </h2>

//                 <p className="mt-1 text-sm text-[#6f4a4b]">
//                   Borrowed by: {item.user}
//                 </p>
//               </div>

//               <Badge
//                 variant={
//                   item.status === "Returned"
//                     ? "success"
//                     : "danger"
//                 }
//               >
//                 {item.status}
//               </Badge>
//             </div>

//             {/* Details */}
//             <div className="mt-5 space-y-2 text-sm text-[#9b8585]">

//               <p>
//                 <span className="font-medium text-[#6f4a4b]">
//                   Issue Date:
//                 </span>{" "}
//                 {item.issueDate}
//               </p>

//               <p>
//                 <span className="font-medium text-[#6f4a4b]">
//                   Return Date:
//                 </span>{" "}
//                 {item.returnDate}
//               </p>

//             </div>

//           </Card>
//         ))}

//       </div>

//       {/* No Results */}
//       {filteredHistory.length === 0 && (
//         <div className="mt-10 text-center text-sm text-[#9b8585]">
//           No borrowing history found.
//         </div>
//       )}

//     </div>
//   );
// }

import React, { useEffect, useState } from "react";

import { Card } from "../../componenets/ui/Card";
import { SearchBar } from "../../componenets/ui/SearchBar";
import { Badge } from "../../componenets/ui/Badge";

import { getBorrowings } from "../../utils/borrowingStorage";

export function History() {
  const [search, setSearch] = useState("");
  const [borrowings, setBorrowings] = useState([]);

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  useEffect(() => {
    setBorrowings(getBorrowings());
  }, []);

  const myHistory = borrowings.filter(
    (item) => item.userId === currentUser?.id
  );

  const filteredHistory = myHistory.filter((item) =>
    `${item.book} ${item.user} ${item.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#faf7f7] px-6 py-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#7b1113]">
          Borrowing History
        </h1>

        <p className="mt-2 text-sm text-[#9b8585]">
          View your complete borrowing history, including borrowed and returned books.
        </p>
      </div>

      {/* Search */}
      <div className="mt-6 max-w-md">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search borrowing history..."
        />
      </div>

      {/* History */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {filteredHistory.map((item) => (
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

              <Badge
                variant={
                  item.status === "Returned"
                    ? "success"
                    : "danger"
                }
              >
                {item.status}
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

          </Card>
        ))}

      </div>

      {/* No Results */}
      {filteredHistory.length === 0 && (
        <div className="mt-10 text-center text-sm text-[#9b8585]">
          No borrowing history found.
        </div>
      )}

    </div>
  );
}