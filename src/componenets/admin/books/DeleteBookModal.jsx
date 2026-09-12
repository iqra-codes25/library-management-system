import React from "react";

import { Modal } from "../../ui/Modal";
import { Button } from "../../ui/Button";

export function DeleteBookModal({
  isOpen,
  onClose,
  book,
  onDeleteBook,
}) {
  const handleDelete = () => {
    if (!book) {
      return;
    }

    onDeleteBook(book);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Book"
    >
      <div className="space-y-6">
        <p className="text-sm leading-6 text-[#6f4a4b]">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-[#7b1113]">
            "{book?.title}"
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}