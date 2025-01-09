import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchField from "src/elements/searchField/searchField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindows, faPlaystation, faXbox } from "@fortawesome/free-brands-svg-icons";
import { getTopGames } from "src/api/searchApi";
import GameCard from "src/components/gameCard/gameCard";
import * as styles from "./home.module.scss";

function Home() {
  const navigate = useNavigate();
  const [topGames, setTopGames] = useState<
    {
      id: number;
      name: string;
      category: string;
      description: string;
      price: number;
      dateAdded: string;
      image: string;
    }[]
  >([]);

  useEffect(() => {
    async function fetchTopGames() {
      const games: {
        id: number;
        name: string;
        category: string;
        description: string;
        price: number;
        dateAdded: string;
        image: string;
      }[] = await getTopGames();
      setTopGames(games);
    }

    fetchTopGames();
  }, []);

  const handleCategoryClick = (category: string) => {
    navigate(`/products/${category}`);
  };

  return (
    <div>
      <SearchField />
      <div className={styles.pageContent}>
        <div className={styles.categoryContent}>
          <h1>Categories:</h1>
          <hr />
          <div className={styles.categories}>
            <button
              className={styles.category}
              onClick={() => handleCategoryClick("pc")}
              tabIndex={0}
              aria-label="Navigate to PC products"
              type="button"
            >
              <FontAwesomeIcon icon={faWindows} className={styles.icon} />
              <p className={styles.categoryText}>PC</p>
            </button>
            <button
              className={styles.category}
              onClick={() => handleCategoryClick("xbox")}
              tabIndex={0}
              aria-label="Navigate to Xbox products"
              type="button"
            >
              <FontAwesomeIcon icon={faXbox} className={styles.icon} />
              <p className={styles.categoryText}>Xbox</p>
            </button>
            <button
              className={styles.category}
              onClick={() => handleCategoryClick("playstation")}
              tabIndex={0}
              aria-label="Navigate to PlayStation products"
              type="button"
            >
              <FontAwesomeIcon icon={faPlaystation} className={styles.icon} />
              <p className={styles.categoryText}>PlayStation</p>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.topGames}>
        <h1>Top 3 Games:</h1>
        <div className={styles.cardsContainer}>
          {topGames.map((game) => (
            <GameCard key={game.id} {...game} image={game.image || "https://via.placeholder.com/150"} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
