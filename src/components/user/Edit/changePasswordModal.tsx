import React, { useState } from "react";
import { mockChangePassword } from "@/api/auth/mockChangePassword";
import InputText from "@/elements/user/inputText";
import Modal from "../modal";
import * as styles from "./edit.module.scss";

import "react-toastify/dist/ReactToastify.css";
// eslint-disable-next-line import/order
import { toast } from "react-toastify";

interface ChangePasswordModalProps {
  userName: string;
  onClose: () => void;
}

function ChangePasswordModal({ userName, onClose }: ChangePasswordModalProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== repeatNewPassword) {
      setError("New password and repeat password do not match.");
      return;
    }

    try {
      const response = await mockChangePassword(userName, oldPassword, newPassword);

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        onClose();
      } else {
        setError(response.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h2>Change Password</h2>
        <InputText label="Old Password" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
        <InputText label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <InputText
          label="Repeat New Password"
          type="password"
          value={repeatNewPassword}
          onChange={(e) => setRepeatNewPassword(e.target.value)}
        />
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit">Change Password</button>
      </form>
    </Modal>
  );
}

export default ChangePasswordModal;
