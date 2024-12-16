import { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as styles from "./styles/main.module.scss";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import ProductsPage from "./components/productPage/productsPage";
import HomePage from "./components/homePage/homePage";

import { ROUTES } from "./routes";
import ErrorBoundary from "./components/errorBoundary";

function Home() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

function Products() {
  return (
    <div>
      <ProductsPage />
    </div>
  );
}
function About() {
  return <div>About Page</div>;
}

function App() {
  // Manage the authenticated user state
  const [userName, setUserName] = useState<string | null>(null);

  // Callback to update the authenticated user
  const handleAuthUser = (user: string | null) => {
    setUserName(user);
  };

  return (
    <Router>
      <div className={styles.app}>
        {/* Pass userName and onAuthUser as props to Header */}
        <Header onAuthUser={handleAuthUser} userName={userName} />
        <div className={styles.mainContent}>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={`${ROUTES.PRODUCTS}/:category`} element={<Products />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("app")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
