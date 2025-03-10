import styles from "../styles/pages/menu.module.scss";
import { IMenuItem } from "../utils/interface";

interface Props {
  item: IMenuItem
}

const MenuItem = ({ item }: Props) => {
  return (
    <>
      <article className={styles.fooditem}>
        <h2 className={styles.title}>{item.name}</h2>
        <div className={styles.line__dotted}></div>
        <h2 className={styles.price}>{item.price} SEK</h2>
        <p className={styles.desc}>
          {item.description}
        </p>
      </article>

      
    </>
  );
};

export default MenuItem;
