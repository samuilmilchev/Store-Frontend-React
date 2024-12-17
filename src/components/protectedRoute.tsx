import { ReactNode, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import SignInModal from "@/components/user/signInModal";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  onSignIn: (userName: string) => void;
  children: ReactNode;
}

function ProtectedRoute({ isAuthenticated, onSignIn, children }: ProtectedRouteProps) {
  const [showSignIn, setShowSignIn] = useState(!isAuthenticated);
  const location = useLocation();

  if (isAuthenticated) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  return (
    <>
      {showSignIn && (
        <SignInModal
          onClose={() => setShowSignIn(false)}
          onSignIn={(userName) => {
            onSignIn(userName);
            setShowSignIn(false);
          }}
        />
      )}

      {!showSignIn && <Navigate to="/" state={{ from: location }} replace />}
    </>
  );
}

export default ProtectedRoute;
