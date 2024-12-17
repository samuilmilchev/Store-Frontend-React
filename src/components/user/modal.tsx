/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import ReactDOM from "react-dom";
import * as styles from "./modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  return ReactDOM.createPortal(
    <div
      className={styles.modalOverlay}
      role="button"
      tabIndex={0}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === " ") {
          onClose();
        }
      }}
    >
      <div
        className={styles.modalContent}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onClose();
          }
          e.stopPropagation();
        }}
        tabIndex={-1}
      >
        <button className={styles.closeButton} onClick={onClose} aria-label="Close Modal" type="button">
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!,
  );
};

export default Modal;
