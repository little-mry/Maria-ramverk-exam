import styles from "../styles/pages/menu.module.scss";
import { IMenuItem } from "../utils/interface";

interface DrinkItemProps {
  drinks: IMenuItem[];
  addToCart: (item: IMenuItem) => void;
}

const DrinkItems = ({ drinks, addToCart }: DrinkItemProps) => {
  const drinkPrice = drinks.length > 0 ? drinks[0].price : 0;

  return (
    <article className={styles.extraitems}>
      <h2 className={styles.title}>DRYCKER</h2>
      <div className={styles.line__dotted}></div>
      <h2 className={styles.price}>{drinkPrice} SEK</h2>

      <div className={styles.extraitem__con}>
      {drinks.map((item) => (
          <article key={item.id} className={styles.extraitem} onClick={() => addToCart(item)}>
            <p className={styles.extraitem__name}>{item.name}</p>
          </article>
      ))}
        </div>
    </article>
  );
};

export default DrinkItems;
