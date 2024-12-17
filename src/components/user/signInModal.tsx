import React, { useState } from "react";
import InputText from "@/elements/user/inputText";
import { mockSignIn } from "@/api/auth/mockSignIn";
import Modal from "./modal";
import * as styles from "./modal.module.scss";

interface SignInModalProps {
  onClose: () => void;
  onSignIn: (userName: string) => void;
}

function SignInModal({ onClose, onSignIn }: SignInModalProps) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userName && password) {
      try {
        const response = await mockSignIn(userName, password);
        if (response.status === 200) {
          onSignIn(userName);
          onClose();
        } else {
          setError("Invalid credentials");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-shadow
      } catch (error) {
        setError("Invalid credentials");
      }
    } else {
      setError("All fields are required");
    }
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <InputText type="text" label="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <InputText type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit">Sign In</button>
      </form>
    </Modal>
  );
}

export default SignInModal;
