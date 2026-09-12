import React, { useState } from "react";
import { Plus, Pencil, Trash2  } from "lucide-react";

import { Card } from "../../componenets/ui/Card";
import { SearchBar } from "../../componenets/ui/SearchBar";
import { Table } from "../../componenets/ui/Table";
import { Badge } from "../../componenets/ui/Badge";
import { Button } from "../../componenets/ui/Button";
import { IconButton } from "../../componenets/ui/IconButton";

import { users } from "../../data/userdata/Users";
import { userColumns } from "../../data/userdata/userColumns";

import { AddUserModal } from "../../componenets/admin/user/AddUserModal";
import { EditUserModal } from "../../componenets/admin/user/UpdateModal";
import { DeleteUserModal } from "../../componenets/admin/user/DeleteUserModal";

export function UsersPage() {
  const [userList, setUserList] = useState(users);
  const [search, setSearch] = useState("");

  // Add User Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Edit User Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Add User
  const handleAddUser = (user) => {
    const newUser = {
      id: Date.now(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
    };

    setUserList((prevUsers) => [
      ...prevUsers,
      newUser,
    ]);
  };

  // Edit User - Open Modal
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  // Edit User - Update Data
  const handleUpdateUser = (updatedUser) => {
    setUserList((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id
          ? updatedUser
          : user
      )
    );

    setSelectedUser(null);
  };

  // Search Users
  const filteredUsers = userList.filter((user) => {
    const searchValue = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue) ||
      user.phone.includes(searchValue)
    );
  });

  const handleDeleteClick = (user) => {
  setUserToDelete(user);
  setIsDeleteModalOpen(true);
};

const handleDeleteUser = (user) => {
  setUserList((prevUsers) =>
    prevUsers.filter((item) => item.id !== user.id)
  );

  setUserToDelete(null);
};

  // Table Data
  const tableData = filteredUsers.map((user) => ({
    ...user,

    role: (
      <Badge variant="neutral">
        {user.role}
      </Badge>
    ),

    status: (
      <Badge
        variant={
          user.status === "Active"
            ? "success"
            : "danger"
        }
      >
        {user.status}
      </Badge>
    ),

   actions: (
  <div className="flex items-center gap-1">
    <IconButton
      variant="primary"
      title="Edit User"
      onClick={() => handleEditClick(user)}
    >
      <Pencil size={17} />
    </IconButton>

    <IconButton
      variant="danger"
      title="Delete User"
      onClick={() => handleDeleteClick(user)}
    >
      <Trash2 size={17} />
    </IconButton>
  </div>
),
  }));

  // Add Actions Column
  const columnsWithActions = [
    ...userColumns,
    {
      key: "actions",
      label: "Actions",
    },
  ];

  return (
    <div className="px-6 py-8 lg:px-8">

      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-[#7b1113]">
            Users
          </h1>

          <p className="mt-2 text-sm text-[#9b8585]">
            Manage all registered library users from here.
          </p>
        </div>

        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={19} />
          Add User
        </Button>

      </div>

      {/* Search */}
      <Card className="mb-6 p-5">
        <SearchBar
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Card>

      {/* Users Table */}
      <section>

        <div className="mb-4">
          <h2 className="text-xl font-bold text-[#4f3839]">
            All Users
          </h2>

          <p className="mt-1 text-sm text-[#9b8585]">
            List of all registered users in the library.
          </p>
        </div>

        <Table
          columns={columnsWithActions}
          data={tableData}
        />

      </section>

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddUser={handleAddUser}
      />

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onUpdateUser={handleUpdateUser}
      />
     <DeleteUserModal
  isOpen={isDeleteModalOpen}
  onClose={() => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  }}
  user={userToDelete}
  onDeleteUser={handleDeleteUser}
/>
    </div>
  );
}