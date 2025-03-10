import MenuItem from "../components/MenuItem";
import styles from "../styles/pages/menu.module.scss";
import Header from "../components/Header";
import SauceItem from "../components/SauceItem";

const Menu = () => {
  return (
    <>
      <section className={styles.menu}>
        <Header />
        <main className={styles.menu__con}>
          <h1 className={styles.menu__heading}>MENY</h1>

          <MenuItem />
          <SauceItem />
    
        </main>
      </section>
    </>
  );
};

export default Menu;
