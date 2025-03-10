import styles from "../styles/pages/menu.module.scss";
import { IMenuItem } from "../utils/interface";

const DipItems = ({ dips }: { dips: IMenuItem[] }) => {
  const dipPrice = dips.length > 0 ? dips[0].price : 0;
  
  return (
    <article className={styles.extraitems}>
      <h2 className={styles.title}>DIPSÅS</h2>
      <div className={styles.line__dotted}></div>
      <h2 className={styles.price}>{dipPrice} SEK</h2>

      <div className={styles.extraitem__con}>
      {dips.map((item) => (
          <article className={styles.extraitem}>
            <p className={styles.extraitem__name}>{item.name}</p>
          </article>
      ))}
      </div>
    </article>
  );
};

export default DipItems;
