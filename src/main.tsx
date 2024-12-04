import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/main.scss";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { ROUTES } from "./routes";

function Home() {
  return <div className="page-content">Home Page</div>;
}
function Products() {
  return <div className="page-content">Products Page</div>;
}
function About() {
  return <div className="page-content">About Page</div>;
}

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main-content">
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
