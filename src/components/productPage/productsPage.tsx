import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchProducts } from "src/api/searchApi";
import * as styles from "./productsPage.module.scss";

function Products() {
  const { category } = useParams();
  const [products, setProducts] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      setLoading(true);
      searchProducts("", category).then((result) => {
        setProducts(result);
        setLoading(false);
      });
    }
  }, [category]);

  const renderContent = () => {
    if (loading) {
      return <p className={styles.loadingMessage}>Loading products...</p>;
    }
    if (products.length > 0) {
      return (
        <ul className={styles.productList}>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      );
    }
    return <p className={styles.noProductsMessage}>No products found for {category}</p>;
  };

  return (
    <div className={styles.pageContent}>
      <h1 className={styles.pageTitle}>Products Page</h1>
      <hr />
      <p className={styles.categoryInfo}>Selected Category: {category?.toUpperCase()}</p>
      {renderContent()}
    </div>
  );
}

export default Products;
