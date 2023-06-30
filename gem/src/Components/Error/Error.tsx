import React from "react";
import Modal from "react-modal";
import "./Error.css";

type ErrorProps = {
  message: string;
};

type PopupProps = {
  errors: ErrorProps[];
};

export default function Popup(Popup: PopupProps) {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Show Errors</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="Popup"
        overlayClassName="Overlay"
        contentLabel="Error Popup"
      >
        <h2>Errors</h2>
        <button onClick={closeModal}>Close</button>
        <div className="ErrorList">
          {Popup.errors.map((error) => (
            <Error key={error.message} message={error.message} />
          ))}
        </div>
      </Modal>
    </div>
  );
}

function Error(Error: ErrorProps) {
  return (
    <div className="Error">
      <span>{Error.message}</span>
    </div>
  );
}
