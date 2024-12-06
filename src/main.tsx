import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as styles from "./styles/main.module.scss";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { ROUTES } from "./routes";

function Home() {
  return <div className={styles.pageContent}>Home Page</div>;
}
function Products() {
  return <div className={styles.pageContent}>Products Page</div>;
}
function About() {
  return <div className={styles.pageContent}>About Page</div>;
}

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <div className={styles.mainContent}>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.PRODUCTS} element={<Products />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("app")!).render(<App />);
