import React, { useState } from "react";

import { Modal } from "../../ui/Modal";
import { Input } from "../../ui/Input";
import { Select } from "../../ui/Select";
import { Button } from "../../ui/Button";

export function AddBookModal({ isOpen, onClose, onAddBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  const [errors, setErrors] = useState({
    title: "",
    author: "",
    category: "",
    quantity: "",
  });

  const validateForm = () => {
    const newErrors = {
      title: "",
      author: "",
      category: "",
      quantity: "",
    };

    if (title.trim() === "") {
      newErrors.title = "Book title is required";
    }

    if (author.trim() === "") {
      newErrors.author = "Author name is required";
    }

    if (category === "") {
      newErrors.category = "Please select a category";
    }

    if (quantity === "") {
      newErrors.quantity = "Quantity is required";
    } else if (Number(quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some(
      (error) => error !== ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const newBook = {
      title: title.trim(),
      author: author.trim(),
      category,
      quantity: Number(quantity),
        available: Number(quantity),
    };

    onAddBook(newBook);

    setTitle("");
    setAuthor("");
    setCategory("");
    setQuantity("");

    setErrors({
      title: "",
      author: "",
      category: "",
      quantity: "",
    });

    onClose();
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);

    if (errors.title) {
      setErrors((prev) => ({
        ...prev,
        title: "",
      }));
    }
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);

    if (errors.author) {
      setErrors((prev) => ({
        ...prev,
        author: "",
      }));
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);

    if (errors.category) {
      setErrors((prev) => ({
        ...prev,
        category: "",
      }));
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);

    if (errors.quantity) {
      setErrors((prev) => ({
        ...prev,
        quantity: "",
      }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Book"
    >
      <form
        className="space-y-5"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Book Title */}
        <div>
          <Input
            label="Book Title"
            name="title"
            placeholder="Enter book title"
            value={title}
            onChange={handleTitleChange}
          />

          {errors.title && (
            <p className="mt-1.5 text-xs font-medium text-[#a64b4b]">
              {errors.title}
            </p>
          )}
        </div>

        {/* Author */}
        <div>
          <Input
            label="Author"
            name="author"
            placeholder="Enter author name"
            value={author}
            onChange={handleAuthorChange}
          />

          {errors.author && (
            <p className="mt-1.5 text-xs font-medium text-[#a64b4b]">
              {errors.author}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <Select
            label="Category"
            name="category"
            value={category}
            onChange={handleCategoryChange}
            options={[
              {
                value: "fiction",
                label: "Fiction",
              },
              {
                value: "programming",
                label: "Programming",
              },
              {
                value: "finance",
                label: "Finance",
              },
              {
                value: "self-help",
                label: "Self Help",
              },
              {
                value: "fantasy",
                label: "Fantasy",
              },
            ]}
          />

          {errors.category && (
            <p className="mt-1.5 text-xs font-medium text-[#a64b4b]">
              {errors.category}
            </p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <Input
            label="Quantity"
            name="quantity"
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />

          {errors.quantity && (
            <p className="mt-1.5 text-xs font-medium text-[#a64b4b]">
              {errors.quantity}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button type="submit">
            Add Book
          </Button>
        </div>
      </form>
    </Modal>
  );
}