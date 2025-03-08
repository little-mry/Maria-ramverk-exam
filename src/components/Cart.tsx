import { useState } from "react";
import cartIcon from "../assets/cart-icon.svg";
import CartItem from "./CartItem";
import styles from "../styles/components/cart.module.scss";

const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <section
        className={styles.icon__con}
        onClick={() => setIsCartOpen(!isCartOpen)}
      >
        <img src={cartIcon} alt="Cart icon" className={styles.icon} />
      </section>
      {isCartOpen && (
        <>
          <section className={styles.cart}>
            <article className={styles.cart__items}>
              <div className={styles.dottedline}></div>
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
            </article>

            <div>
              <article className={styles.total}>
                <p className={styles.total__title}>TOTALT</p>
                <p className={styles.total__price}>101 SEK</p>
              </article>
              <button className={styles.btn__purchase}>TAKE MY MONEY!</button>
            </div>
            
          </section>
        </>
      )}
    </>
  );
};

export default Cart;
