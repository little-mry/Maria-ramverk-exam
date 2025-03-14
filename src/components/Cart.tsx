import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

import cartIcon from "../assets/cart-icon.svg";
import CartItem from "./CartItem";
import { fetchOrderInfoThunk, submitOrderThunk } from "../redux/slices/orderSlice";
import { clearCart } from "../redux/slices/cartSlice";
import styles from '../styles/components/cart.module.scss'

const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  
  const itemIds = cartItems.reduce<number[]>((acc, item) => {
    for (let i = 0; i < item.quantity; i++) {
      acc.push(item.id);
    }
    return acc;
  }, []);
  
  const handleSubmit = async () => {
    const resultAction = await dispatch(submitOrderThunk(itemIds));
    
    if (submitOrderThunk.fulfilled.match(resultAction)) {
      dispatch(clearCart());
    /*   await dispatch(fetchOrderInfoThunk()); */
      navigate("/eta");
    } else {
      console.error("Ordern misslyckades:", resultAction);
    }


  };
  

  return (
    <>
      <section
        className={styles.icon__con}
        onClick={() => setIsCartOpen(!isCartOpen)}
      >
        {cartItems.length > 0 && <span className={styles.cart__quantity}>{totalItems}</span>}
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
