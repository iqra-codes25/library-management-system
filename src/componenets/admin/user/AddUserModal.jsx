import React, { useState } from "react";

import { Modal } from "../../ui/Modal";
import { Input } from "../../ui/Input";
import { Select } from "../../ui/Select";
import { Button } from "../../ui/Button";

export function AddUserModal({
  isOpen,
  onClose,
  onAddUser,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      role: "",
      status: "",
    };

    if (name.trim() === "") {
      newErrors.name = "Name is required";
    }

    if (email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = "Please enter a valid email";
    }

    if (phone.trim() === "") {
      newErrors.phone = "Phone number is required";
    }

    if (role === "") {
      newErrors.role = "Please select a role";
    }

    if (status === "") {
      newErrors.status = "Please select a status";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some(
      (error) => error !== ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newUser = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      role,
      status,
    };

    onAddUser(newUser);

    setName("");
    setEmail("");
    setPhone("");
    setRole("");
    setStatus("");

    setErrors({
      name: "",
      email: "",
      phone: "",
      role: "",
      status: "",
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add User"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        <Input
          label="Name"
          name="name"
          placeholder="Enter user name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);

            if (e.target.value.trim() !== "") {
              setErrors((prev) => ({
                ...prev,
                name: "",
              }));
            }
          }}
        />

        {errors.name && (
          <p className="-mt-3 text-xs text-red-600">
            {errors.name}
          </p>
        )}

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);

            if (e.target.value.trim() !== "") {
              setErrors((prev) => ({
                ...prev,
                email: "",
              }));
            }
          }}
        />

        {errors.email && (
          <p className="-mt-3 text-xs text-red-600">
            {errors.email}
          </p>
        )}

        <Input
          label="Phone"
          name="phone"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);

            if (e.target.value.trim() !== "") {
              setErrors((prev) => ({
                ...prev,
                phone: "",
              }));
            }
          }}
        />

        {errors.phone && (
          <p className="-mt-3 text-xs text-red-600">
            {errors.phone}
          </p>
        )}

        <Select
          label="Role"
          name="role"
          value={role}
          onChange={(e) => {
            setRole(e.target.value);

            if (e.target.value !== "") {
              setErrors((prev) => ({
                ...prev,
                role: "",
              }));
            }
          }}
          placeholder="Select role"
          options={[
            {
              value: "User",
              label: "User",
            },
            {
              value: "Admin",
              label: "Admin",
            },
          ]}
        />

        {errors.role && (
          <p className="-mt-3 text-xs text-red-600">
            {errors.role}
          </p>
        )}

        <Select
          label="Status"
          name="status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);

            if (e.target.value !== "") {
              setErrors((prev) => ({
                ...prev,
                status: "",
              }));
            }
          }}
          placeholder="Select status"
          options={[
            {
              value: "Active",
              label: "Active",
            },
            {
              value: "Inactive",
              label: "Inactive",
            },
          ]}
        />

        {errors.status && (
          <p className="-mt-3 text-xs text-red-600">
            {errors.status}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button type="submit">
            Add User
          </Button>
        </div>
      </form>
    </Modal>
  );
}