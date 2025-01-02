import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputText from "@/elements/user/inputText";
import { mockSignUp } from "@/api/auth/mockSignUp";
import { signUp } from "@/redux/userSlice";
import Modal from "./modal";
import * as styles from "./modal.module.scss";

interface SignUpModalProps {
  onClose: () => void;
  // eslint-disable-next-line react/no-unused-prop-types
  onSignUp: (userName: string) => void;
}

function SignUpModal({ onClose }: SignUpModalProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userName || !password || !repeatPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (!/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(password)) {
      setError("Password must contain at least one alphanumeric character.");
      return;
    }

    try {
      const response = await mockSignUp(userName, password);
      if (response.status === 201) {
        dispatch(signUp(userName)); // Dispatch signUp action
        onClose();
        navigate("/profile");
      } else if (response.status === 400) {
        setError("User already exists");
      } else {
        setError("Sign Up failed. Try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <InputText type="text" label="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />

        <InputText type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <InputText type="password" label="Repeat Password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit">Sign Up</button>
      </form>
    </Modal>
  );
}

export default SignUpModal;
