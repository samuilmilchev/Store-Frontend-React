import React, { useState } from "react";
import InputText from "@/elements/user/inputText";
import Modal from "./modal";

interface SignInModalProps {
  onClose: () => void;
  onSignIn: (userName: string) => void;
}

function SignInModal({ onClose, onSignIn }: SignInModalProps) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userName && password) {
      // Simulate API Call
      fetch("/api/auth/signIn", {
        method: "POST",
        body: JSON.stringify({ userName, password }),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        if (response.status === 200) {
          onSignIn(userName);
          onClose();
        } else {
          setError("Invalid credentials");
        }
      });
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
        {error && <div className="error">{error}</div>}
        <button type="submit">Sign In</button>
      </form>
    </Modal>
  );
}

export default SignInModal;
