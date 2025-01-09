/* eslint-disable react/button-has-type */
import { useEffect, useState } from "react";
import { getProducts } from "@/api/searchApi";
import GameCard from "@/components/gameCard/gameCard";
import SearchField from "@/elements/searchField/searchField";
import useSpinner from "@/hooks/useSpinner";
import Spinner from "@/elements/spinner/spinner";
import * as styles from "./allProductsPage.module.scss";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

interface Product {
  id: number;
  name: string;
  category: string;
  genre: string;
  age: number;
  rating: number;
  description: string;
  price: number;
  dateAdded: string;
  image: string;
}

function ProductsPage() {
  const loading = useSpinner(500);
  const [products, setProducts] = useState<Product[]>([]);
  const [sortType, setSortType] = useState("rating");
  const [sortDir, setSortDir] = useState("asc");
  const [genre, setGenre] = useState("");
  const [age, setAge] = useState(100);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const debouncedSearchName = useDebounce(searchName, 500);

  const fetchProducts = async () => {
    try {
      const data = await getProducts(sortType, sortDir, genre, age, debouncedSearchName);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [sortType, sortDir, genre, age, debouncedSearchName]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleSortChange = (newSortType: string) => {
    setSortType(newSortType);
    setSortDir("asc");
  };

  const handleSortDirectionToggle = () => {
    setSortDir((prevDir) => (prevDir === "asc" ? "desc" : "asc"));
  };

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <div className={styles.SearchField}>
        <SearchField onSearch={setSearchName} />
      </div>
      <div className={styles.pageContent}>
        <div className={styles.filters}>
          <div className={styles.customContent}>
            <h3>Sort | Filer:</h3>
            <hr />
            <div className={styles.custom}>
              <select onChange={(e) => handleSortChange(e.target.value)} value={sortType}>
                <option value="rating">Sort by Rating</option>
                <option value="price">Sort by Price</option>
                <option value="name">Sort by Name</option>
              </select>
              <button onClick={handleSortDirectionToggle}>Sort Direction ↑ ↓</button>

              <select onChange={(e) => setGenre(e.target.value)}>
                <option value="">All Genres</option>
                <option value="Shooter">Shooter</option>
                <option value="Strategy">Strategy</option>
                <option value="Action">Action</option>
                <option value="RPG">RPG</option>
              </select>
              <select onChange={(e) => setAge(Number(e.target.value))}>
                <option value="100">All Ages</option>
                <option value="3">3+</option>
                <option value="6">6+</option>
                <option value="12">12+</option>
                <option value="18">18+</option>
              </select>
            </div>
          </div>
        </div>

        <hr />

        <div className={styles.productsContainer}>
          {currentProducts.map((product) => (
            <GameCard key={product.id} {...product} />
          ))}
        </div>

        <div className={styles.pagination}>
          <button disabled={currentPage === 1} onClick={handlePrevPage}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button disabled={currentPage === totalPages} onClick={handleNextPage}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
