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
  return (
    <Router>
      <div className={styles.app}>
        <Header />
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
