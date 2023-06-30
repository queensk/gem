import React, { useState } from "react";
import "./Gem.css";

interface PopupInputProps {
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
}

const PopupInput: React.FC<PopupInputProps> = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description);
  };

  return (
    <div className="popup-container">
      <div className="popup-backdrop" onClick={onClose} />
      <div className="popup-content">
        <h2>Gem</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="popup-buttons">
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupInput;
