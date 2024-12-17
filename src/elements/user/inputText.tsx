import React from "react";

interface InputTextProps {
  type: "text" | "password" | "email";
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

function InputText({ type, label, value, onChange, error }: InputTextProps) {
  const inputId = `input-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input id={inputId} type={type} value={value} onChange={onChange} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default InputText;
