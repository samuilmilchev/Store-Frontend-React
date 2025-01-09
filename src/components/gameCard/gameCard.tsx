import classNames from "classnames";
import * as styles from "./gameCard.module.scss";

export type Product = {
  id: number;
  name: string;
  category?: string;
  genre?: string;
  age?: number;
  rating?: number;
  description: string;
  price: number;
  dateAdded?: string;
  image?: string;
};

type GameCardProps = Pick<Product, "id" | "name" | "price" | "description" | "image">;

function GameCard({ name, price, description, image }: GameCardProps) {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div className={styles.card} tabIndex={0}>
      <div className={classNames(styles.cardInner)}>
        <div className={classNames(styles.cardFront)} style={{ backgroundImage: `url(${image})` }}>
          <h3>{name}</h3>
          <p>${price}</p>
        </div>
        <div className={classNames(styles.cardBack)}>
          <p>{description}</p>
          <button className={styles.addToCartButton} type="button" onClick={() => {}}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
