import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  userName: string | null;
  signIn: (userName: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react/function-component-definition
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(null);

  const signIn = (newUserName: string) => {
    setUserName(newUserName);
  };

  const signOut = () => {
    setUserName(null);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <AuthContext.Provider value={{ userName, signIn, signOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
