import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  return ReactDOM.createPortal(
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      className="modal-content"
      role="dialog"
      aria-modal="true"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0} // Makes it focusable
      onClick={(e) => e.stopPropagation()} // Prevents click propagation
      onKeyDown={(e) => {
        // Optionally handle keys if needed
        if (e.key === "Enter") {
          e.stopPropagation();
        }
      }}
    >
      <button
        className="close-button"
        onClick={onClose}
        aria-label="Close Modal"
        type="button" // Ensures compatibility and avoids warning
      >
        &times;
      </button>
      {children}
    </div>,
    document.getElementById("modal-root")!,
  );
};

export default Modal;
