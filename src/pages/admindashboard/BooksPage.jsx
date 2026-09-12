// import React, { useState,useEffect } from "react";
// import { Pencil, Plus, Trash2 } from "lucide-react";

// import { Card } from "../../componenets/ui/Card";
// import { SearchBar } from "../../componenets/ui/SearchBar";
// import { Table } from "../../componenets/ui/Table";
// import { Badge } from "../../componenets/ui/Badge";
// import { Button } from "../../componenets/ui/Button";
// import { IconButton } from "../../componenets/ui/IconButton";
// import { getBooks,saveBooks } from "../../utils/borrowingStorage";

// import { AddBookModal } from "../../componenets/admin/books/AddBookModal";
// import { EditBookModal } from "../../componenets/admin/books/UpdateBook";

// import { bookColumns } from "../../data/common/bookColumns";

// import { DeleteBookModal } from "../../componenets/admin/books/DeleteBookModal";


// export function BooksPage() {
//   // -------------------------
//   // State
//   // -------------------------

//   const [bookList, setBookList] = useState([]);
//   const [search, setSearch] = useState("");

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [isEditModalOpen, setIsEditModalOpen] =
//     useState(false);
//   const [selectedBook, setSelectedBook] = useState(null);

//   const [isDeleteModalOpen, setIsDeleteModalOpen] =
//     useState(false);
//   const [bookToDelete, setBookToDelete] = useState(null);

//   useEffect(() => {
//   setBookList(getBooks());
// }, []);

//   // -------------------------
//   // Search
//   // -------------------------

//   const filteredBooks = bookList.filter((book) => {
//     const searchValue = search.toLowerCase();

//     return (
//       book.title.toLowerCase().includes(searchValue) ||
//       book.author.toLowerCase().includes(searchValue) ||
//       book.category.toLowerCase().includes(searchValue)
//     );
//   });

//   // -------------------------
//   // Add Book
//   // -------------------------

//   const handleAddBook = (book) => {
//     const newBook = {
//       id: Date.now(),
//       title: book.title,
//       author: book.author,
//       category: book.category,
//       quantity: Number(book.quantity),
//       available: Number(book.quantity),
//       status: "Available",
//     };

//      setBookList((prevBooks) => {
//     const updatedBooks = [...prevBooks, newBook];

//     saveBooks(updatedBooks);

//     return updatedBooks;
//   });
//   };

//   // -------------------------
//   // Edit Book
//   // -------------------------

//   const handleEditClick = (book) => {
//     setSelectedBook(book);
//     setIsEditModalOpen(true);
//   };

//   const handleUpdateBook = (updatedBook) => {
//     setBookList((prevBooks) =>
//       prevBooks.map((book) => {
//         if (book.id !== updatedBook.id) {
//           return book;
//         }

//         const borrowedBooks =
//           book.quantity - book.available;

//         const newAvailable =
//           updatedBook.quantity - borrowedBooks;

//         return {
//           ...updatedBook,
//           available: newAvailable,
//           status:
//             newAvailable > 0
//               ? "Available"
//               : "Unavailable",
//         };
//       })

//     );

//     setSelectedBook(null);
//   };

//   // -------------------------
//   // Delete Book
//   // -------------------------

//   const handleDeleteClick = (book) => {
//     setBookToDelete(book);
//     setIsDeleteModalOpen(true);
//   };

//   const handleDeleteBook = (book) => {
//     setBookList((prevBooks) =>
//       prevBooks.filter(
//         (item) => item.id !== book.id
//       )
//     );

//     setBookToDelete(null);
//   };

//   // -------------------------
//   // Table Data
//   // -------------------------

//   const tableData = filteredBooks.map((book) => ({
//     ...book,

//     status: (
//       <Badge
//         variant={
//           book.status === "Available"
//             ? "success"
//             : "danger"
//         }
//       >
//         {book.status}
//       </Badge>
//     ),

//     actions: (
//       <div className="flex items-center gap-1">
//         <IconButton
//           variant="primary"
//           title="Edit Book"
//           onClick={() => handleEditClick(book)}
//         >
//           <Pencil size={17} />
//         </IconButton>

//         <IconButton
//           variant="danger"
//           title="Delete Book"
//           onClick={() => handleDeleteClick(book)}
//         >
//           <Trash2 size={17} />
//         </IconButton>
//       </div>
//     ),
//   }));

//   const columnsWithActions = [
//     ...bookColumns,
//     {
//       key: "actions",
//       label: "Actions",
//     },
//   ];

//   // -------------------------
//   // UI
//   // -------------------------

//   return (
//     <div className="px-6 py-8 lg:px-8">

//       {/* Header */}
//       <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-[#7b1113]">
//             Books
//           </h1>

//           <p className="mt-2 text-sm text-[#9b8585]">
//             Manage all library books from here.
//           </p>
//         </div>

//         <Button onClick={() => setIsModalOpen(true)}>
//           <Plus size={19} />
//           Add Book
//         </Button>
//       </div>

//       {/* Search */}
//       <Card className="mb-6 p-5">
//         <SearchBar
//           placeholder="Search by book, author or category..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </Card>

//       {/* Books Table */}
//       <section>
//         <div className="mb-4">
//           <h2 className="text-xl font-bold text-[#4f3839]">
//             All Books
//           </h2>

//           <p className="mt-1 text-sm text-[#9b8585]">
//             List of all books available in the library.
//           </p>
//         </div>

//         <Table
//           columns={columnsWithActions}
//           data={tableData}
//         />
//       </section>

//       {/* Add Book Modal */}
//       <AddBookModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onAddBook={handleAddBook}
//       />

//       {/* Edit Book Modal */}
//       <EditBookModal
//         isOpen={isEditModalOpen}
//         onClose={() => {
//           setIsEditModalOpen(false);
//           setSelectedBook(null);
//         }}
//         book={selectedBook}
//         onUpdateBook={handleUpdateBook}
//       />

//       {/* Delete Book Modal */}
//       <DeleteBookModal
//         isOpen={isDeleteModalOpen}
//         onClose={() => {
//           setIsDeleteModalOpen(false);
//           setBookToDelete(null);
//         }}
//         book={bookToDelete}
//         onDeleteBook={handleDeleteBook}
//       />
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { Card } from "../../componenets/ui/Card";
import { SearchBar } from "../../componenets/ui/SearchBar";
import { Table } from "../../componenets/ui/Table";
import { Badge } from "../../componenets/ui/Badge";
import { Button } from "../../componenets/ui/Button";
import { IconButton } from "../../componenets/ui/IconButton";

import { getBooks, saveBooks } from "../../utils/borrowingStorage";

import { AddBookModal } from "../../componenets/admin/books/AddBookModal";
import { EditBookModal } from "../../componenets/admin/books/UpdateBook";
import { DeleteBookModal } from "../../componenets/admin/books/DeleteBookModal";

import { bookColumns } from "../../data/common/bookColumns";

export function BooksPage() {
  // -------------------------
  // State
  // -------------------------

  const [bookList, setBookList] = useState([]);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  // -------------------------
  // Load Books
  // -------------------------

  useEffect(() => {
    const savedBooks = getBooks();
    setBookList(savedBooks);
  }, []);

  // -------------------------
  // Search
  // -------------------------

  const filteredBooks = bookList.filter((book) => {
    const searchValue = search.toLowerCase();

    return (
      book.title.toLowerCase().includes(searchValue) ||
      book.author.toLowerCase().includes(searchValue) ||
      book.category.toLowerCase().includes(searchValue)
    );
  });

  // -------------------------
  // Add Book
  // -------------------------

  const handleAddBook = (book) => {
    const newBook = {
      id: Date.now(),
      title: book.title,
      author: book.author,
      category: book.category,
      quantity: Number(book.quantity),
      available: Number(book.quantity),
      status: "Available",
    };

    setBookList((prevBooks) => {
      const updatedBooks = [...prevBooks, newBook];

      // Save updated books to localStorage
      saveBooks(updatedBooks);

      return updatedBooks;
    });
  };

  // -------------------------
  // Edit Book
  // -------------------------

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  };

  const handleUpdateBook = (updatedBook) => {
    setBookList((prevBooks) => {
      const updatedBooks = prevBooks.map((book) => {
        if (book.id !== updatedBook.id) {
          return book;
        }

        const borrowedBooks =
          book.quantity - book.available;

        const newAvailable =
          updatedBook.quantity - borrowedBooks;

        return {
          ...updatedBook,
          available: newAvailable,
          status:
            newAvailable > 0
              ? "Available"
              : "Unavailable",
        };
      });

      // Save updated books to localStorage
      saveBooks(updatedBooks);

      return updatedBooks;
    });

    setIsEditModalOpen(false);
    setSelectedBook(null);
  };

  // -------------------------
  // Delete Book
  // -------------------------

  const handleDeleteClick = (book) => {
    setBookToDelete(book);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteBook = (book) => {
    setBookList((prevBooks) => {
      const updatedBooks = prevBooks.filter(
        (item) => item.id !== book.id
      );

      // Save updated books to localStorage
      saveBooks(updatedBooks);

      return updatedBooks;
    });

    setIsDeleteModalOpen(false);
    setBookToDelete(null);
  };

  // -------------------------
  // Table Data
  // -------------------------

  const tableData = filteredBooks.map((book) => ({
    ...book,

    status: (
      <Badge
        variant={
          book.status === "Available"
            ? "success"
            : "danger"
        }
      >
        {book.status}
      </Badge>
    ),

    actions: (
      <div className="flex items-center gap-1">
        <IconButton
          variant="primary"
          title="Edit Book"
          onClick={() => handleEditClick(book)}
        >
          <Pencil size={17} />
        </IconButton>

        <IconButton
          variant="danger"
          title="Delete Book"
          onClick={() => handleDeleteClick(book)}
        >
          <Trash2 size={17} />
        </IconButton>
      </div>
    ),
  }));

  const columnsWithActions = [
    ...bookColumns,
    {
      key: "actions",
      label: "Actions",
    },
  ];

  // -------------------------
  // UI
  // -------------------------

  return (
    <div className="px-6 py-8 lg:px-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#7b1113]">
            Books
          </h1>

          <p className="mt-2 text-sm text-[#9b8585]">
            Manage all library books from here.
          </p>
        </div>

        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={19} />
          Add Book
        </Button>
      </div>

      {/* Search */}
      <Card className="mb-6 p-5">
        <SearchBar
          placeholder="Search by book, author or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Card>

      {/* Books Table */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-[#4f3839]">
            All Books
          </h2>

          <p className="mt-1 text-sm text-[#9b8585]">
            List of all books available in the library.
          </p>
        </div>

        <Table
          columns={columnsWithActions}
          data={tableData}
        />
      </section>

      {/* Add Book Modal */}
      <AddBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddBook={handleAddBook}
      />

      {/* Edit Book Modal */}
      <EditBookModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedBook(null);
        }}
        book={selectedBook}
        onUpdateBook={handleUpdateBook}
      />

      {/* Delete Book Modal */}
      <DeleteBookModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setBookToDelete(null);
        }}
        book={bookToDelete}
        onDeleteBook={handleDeleteBook}
      />

    </div>
  );
}

