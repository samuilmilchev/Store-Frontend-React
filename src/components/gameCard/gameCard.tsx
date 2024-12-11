import React from "react";
import classNames from "classnames";
import * as styles from "./gameCard.module.scss";

type GameCardProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  id: number;
  name: string;
  price: string;
  description: string;
  image?: string;
};

// eslint-disable-next-line react/function-component-definition
const GameCard: React.FC<GameCardProps> = ({ name, price, description, image }) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div className={styles.card} tabIndex={0}>
      <div className={classNames(styles.cardInner)}>
        <div className={classNames(styles.cardFront)} style={{ backgroundImage: `url(${image})` }}>
          <h3>{name}</h3>
          <p>{price}</p>
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
};

export default GameCard;
