import styles from "../styles/components/cart.module.scss";
import trashCan from "../assets/trashcan.svg";
import minus from "../assets/minus.svg";
import plus from "../assets/plus.svg";

import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/slices/cartSlice";
import { ICartItem } from "../utils/interface";

interface Props {
  item: ICartItem;
}

const CartItem = ({ item }: Props) => {
  const dispatch = useDispatch();
  const totalPrice = item.price * item.quantity

  return (
    <section className={styles.cartitem}>
      <h2 className={styles.cartitem__title}>{item.name}</h2>
      <div className={styles.cartitem__dottedline}></div>
      <h2 className={styles.cartitem__price}>{totalPrice} SEK</h2>

      <article className={styles.cartitem__amount__con}>
        <img
          src={minus}
          alt="Minus icon"
          className={styles.icon}
          onClick={() => dispatch(decreaseQuantity(item.id))}
        />
        <p className={styles.amount}>{item.quantity}</p>
        <img
          src={plus}
          alt="Plus icon"
          className={styles.icon}
          onClick={() => dispatch(increaseQuantity(item.id))}
        />
      </article>
      <img
        src={trashCan}
        alt="Trash can icon"
        className={styles.trashicon}
        onClick={() => dispatch(removeFromCart(item.id))}
      />
    </section>
  );
};

export default CartItem;
