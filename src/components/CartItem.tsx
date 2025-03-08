import styles from "../styles/components/cart.module.scss";
import trashCan from "../assets/trashcan.svg";
import minus from "../assets/minus.svg";
import plus from "../assets/plus.svg";

const CartItem = () => {
  return (
    <section className={styles.cartitem}>
      <h2 className={styles.cartitem__title}>KARLSTAD</h2>
      <div className={styles.cartitem__dottedline}></div>
      <h2 className={styles.cartitem__price}>9 SEK</h2>

      <article className={styles.cartitem__amount__con}>
        <img src={minus} alt="Minus icon" className={styles.icon} />
        <p className={styles.amount}>1</p>
        <img src={plus} alt="Plus icon" className={styles.icon} />
        </article>
        <img
          src={trashCan}
          alt="Trash can icon"
          className={styles.trashicon}
        />
    </section>
  );
};

export default CartItem;
