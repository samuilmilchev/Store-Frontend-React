import React, { useState } from "react";
import InputText from "@/elements/user/inputText";
import Modal from "./modal";

interface SignUpModalProps {
  onClose: () => void;
  onSignUp: (userName: string) => void;
}

function SignUpModal({ onClose, onSignUp }: SignUpModalProps) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userName && password) {
      // Simulate API Call
      fetch("/api/auth/signUp", {
        method: "PUT",
        body: JSON.stringify({ userName, password }),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        if (response.status === 201) {
          onSignUp(userName);
        } else {
          setError("Sign Up failed. Try again.");
        }
      });
    } else {
      setError("All fields are required");
    }
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <InputText type="text" label="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <InputText type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div className="error">{error}</div>}
        <button type="submit">Sign Up</button>
      </form>
    </Modal>
  );
}

export default SignUpModal;
