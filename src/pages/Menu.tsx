import bgLeaf from "../assets/bg-leaf.svg";
import MenuItem from "../components/MenuItem";
import styles from "../styles/pages/menu.module.scss";
import Header from "../components/Header";
import SauceItem from "../components/SauceItem";

const Menu = () => {
  return (
    <section
      style={{ backgroundImage: `url("${bgLeaf}")` }}
      className={styles.menu}
    >
      <Header />
      <section className={styles.menu__con}>
        <h1 className={styles.menu__heading}>MENY</h1>
        <MenuItem />
        

        <article className={styles.sauceitems}>
          <h2 className={styles.title}>DIPSÅS</h2>
          <div className={styles.line__dotted}></div>
          <h2 className={styles.price}>19 SEK</h2>
          <div className={styles.sauceitem__con}>
            <SauceItem />
          </div>
        </article>
      </section>
    </section>
  );
};

export default Menu;
