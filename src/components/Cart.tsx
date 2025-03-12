import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import cartIcon from "../assets/cart-icon.svg";
import CartItem from "./CartItem";
import { submitOrderThunk } from "../redux/slices/orderSlice";
import styles from '../styles/components/cart.module.scss'

const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  
  const handleSubmit = () => {
    submitOrderThunk()
    navigate("/eta")
  }

  return (
    <>
      <section
        className={styles.icon__con}
        onClick={() => setIsCartOpen(!isCartOpen)}
      >
        {cartItems.length && <span className={styles.cart__quantity}>{totalItems}</span>}
        <img src={cartIcon} alt="Cart icon" className={styles.icon} />
      </section>

      {isCartOpen && (
        <section className={styles.cart}>
          <article className={styles.cart__items}>
            <div className={styles.dottedline}></div>
            {cartItems.length > 0 ? (
              cartItems.map((item) => <CartItem item={item} key={item.id}/>)
            ) : (
              <p className={styles.empty__msg}>Varukorgen är tom</p>
            )}
          </article>

          {cartItems.length > 0 && (
            <div>
              <article className={styles.total}>
                <p className={styles.total__title}>TOTALT</p>
                <p className={styles.total__price}>
                  {cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}{" "}
                  SEK
                </p>
              </article>
              <button
                className={styles.btn__purchase}
                onClick = {handleSubmit}
      
              >
                TAKE MY MONEY!
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default Cart;
