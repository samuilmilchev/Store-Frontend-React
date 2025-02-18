/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
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

function GameCard({ id, name, price, description, image }: GameCardProps) {
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: Product) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
  };

  return (
    <div className={styles.card} tabIndex={0}>
      <div className={classNames(styles.cardInner)}>
        <div className={classNames(styles.cardFront)} style={{ backgroundImage: `url(${image})` }}>
          <h3>{name}</h3>
          <p>${price}</p>
        </div>
        <div className={classNames(styles.cardBack)}>
          <p>{description}</p>
          <button className={styles.addToCartButton} type="button" onClick={handleAddToCart}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
