import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { searchProducts } from "../../api/searchApi";
import * as styles from "./searchField.module.scss";

// eslint-disable-next-line react/function-component-definition
const SearchField: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async (searchText: string) => {
    if (!searchText.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await searchProducts(searchText);
      setResults(response);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(debounce(fetchResults, 300), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    debouncedFetch(value);
  };

  const handleResultClick = (productName: string) => {
    alert(`Got product: ${productName}`);
  };

  return (
    <div className={styles.searchField}>
      <div className={styles.inputWrapper}>
        <input type="text" placeholder="Search products..." value={query} onChange={handleInputChange} className={styles.searchInput} />
        {loading ? <div className={styles.spinner} /> : <span className={styles.magnifier}>🔍</span>}
      </div>
      {results.length > 0 && (
        <ul className={styles.dropdown}>
          {results.map((result) => (
            <li key={result.id} className={styles.dropdownItem}>
              <button type="button" onClick={() => handleResultClick(result.name)} className={styles.dropdownButton}>
                {result.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchField;
