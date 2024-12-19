import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "font-awesome/css/font-awesome.min.css";
import * as styles from "./styles/main.module.scss";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import ProductsPage from "./components/productPage/productsPage";
import HomePage from "./components/homePage/homePage";
import ProfilePage from "./components/profilePage/profilePage";

import { ROUTES } from "./routes";
import ErrorBoundary from "./components/errorBoundary";
import ProtectedRoute from "./components/protectedRoute";
import { AuthProvider, useAuth } from "./components/authContext";

function App() {
  const { userName, signIn } = useAuth();

  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <div className={styles.mainContent}>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route
              path={`${ROUTES.PRODUCTS}/:category`}
              element={
                <ProtectedRoute isAuthenticated={!!userName} onSignIn={signIn}>
                  <ProductsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.ABOUT}
              element={
                <ProtectedRoute isAuthenticated={!!userName} onSignIn={signIn}>
                  <div>About Page</div>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("app")!).render(
  <ErrorBoundary>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ErrorBoundary>,
);
