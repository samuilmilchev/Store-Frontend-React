import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider, useSelector, useDispatch } from "react-redux";
import store, { RootState } from "./redux/store";

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
import { signIn } from "./redux/userSlice";

function App() {
  const userName = useSelector((state: RootState) => state.auth.userName);
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleSignIn = (userName: string) => {
    dispatch(signIn(userName));
  };

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
                <ProtectedRoute isAuthenticated={!!userName} onSignIn={handleSignIn}>
                  <ProductsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.ABOUT}
              element={
                <ProtectedRoute isAuthenticated={!!userName} onSignIn={handleSignIn}>
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
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>,
);
