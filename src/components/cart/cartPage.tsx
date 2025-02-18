/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable radix */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import * as style from "./cartPage.module.scss";

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

interface CartItem extends Product {
  quantity: number;
}

function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(storedCart);
      setLoading(false);
    }, 1000);
  }, []);

  const handleRemove = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    const updatedCart = cart.map((item) => (item.id === id ? { ...item, quantity } : item));
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleBuy = () => {
    setCart([]);
    localStorage.removeItem("cart");
    alert("Thank you for your purchase!");
  };

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className={style.cartContainer}>
      <h1>Your Cart</h1>

      {loading ? (
        <div>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={40} sx={{ marginBottom: 2 }} />
          ))}
        </div>
      ) : cart.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  />
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => handleRemove(item.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={style.emptyCartMessage}>Your cart is empty.</p>
      )}

      {cart.length > 0 && (
        <>
          <div className={style.totalAmount}>
            <h2>Total: ${getTotalAmount()}</h2>
          </div>
          <button className={style.buyButton} onClick={handleBuy}>
            Buy
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;
