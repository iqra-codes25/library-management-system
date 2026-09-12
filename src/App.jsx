import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoginPage } from "./pages/login/LoginPage";
import { AdminDashboard } from "./pages/admindashboard/AdminDashboard";
import { BooksPage } from "./pages/admindashboard/BooksPage";
import { UsersPage } from "./pages/admindashboard/UsersPage";
import { BorrowedBooksPage } from "./pages/admindashboard/BorrowedBooksPage";

import { AdminLayout } from "./componenets/admin/books/AdminLayout";

import { UserDashboard } from "./pages/userdashboard/userDashboard";
import { UserLayout } from "./componenets/user/UserLayout";
import { AvailableBooksPage } from "./pages/userdashboard/AvailableBooksPage";
import { MyBorrowedBooks } from "./pages/userdashboard/myBorrowedbooks";
import { History } from "./pages/userdashboard/History";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<LoginPage />} />

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>

          <Route index element={<AdminDashboard />} />

          <Route path="books" element={<BooksPage />} />

          <Route path="users" element={<UsersPage />} />

          <Route
            path="borrowed-books"
            element={<BorrowedBooksPage />}
          />

        </Route>

        <Route path="/user" element={<UserLayout />}>
  <Route index element={<UserDashboard />} />
   <Route path="books" element={<AvailableBooksPage />} />
   <Route path="borrowed-books" element={< MyBorrowedBooks />} />
   <Route path="history" element={< History />} />
</Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;