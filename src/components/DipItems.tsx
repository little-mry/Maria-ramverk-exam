import styles from "../styles/pages/menu.module.scss";
import { IMenuItem } from "../utils/interface";

interface DipItemProps {
  dips: IMenuItem[];
  addToCart: (item: IMenuItem) => void;
}


const DipItems = ({ dips, addToCart }: DipItemProps) => {
  const dipPrice = dips.length > 0 ? dips[0].price : 0;
  
  return (
    <article className={styles.extraitems}>
      <h2 className={styles.title}>DIPSÅS</h2>
      <div className={styles.line__dotted}></div>
      <h2 className={styles.price}>{dipPrice} SEK</h2>

      <div className={styles.extraitem__con}>
      {dips.map((item) => (
          <article className={styles.extraitem} onClick={() => addToCart(item)}>
            <p className={styles.extraitem__name}>{item.name}</p>
          </article>
      ))}
      </div>
    </article>
  );
};

export default DipItems;
