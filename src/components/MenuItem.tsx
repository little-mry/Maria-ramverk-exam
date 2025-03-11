import styles from "../styles/pages/menu.module.scss";
import { IMenuItem } from "../utils/interface";

interface Props {
  item: IMenuItem;
  addToCart: (item: IMenuItem) => void;
}

const MenuItem = ({ item, addToCart }: Props) => {
  return (
    <>
      <article className={styles.fooditem} onClick={() => addToCart(item)}>
        <h2 className={styles.title}>{item.name}</h2>
        <div className={styles.line__dotted}></div>
        <h2 className={styles.price}>{item.price} SEK</h2>
        <p className={styles.desc}>{item.description}</p>
      </article>
    </>
  );
};

export default MenuItem;
