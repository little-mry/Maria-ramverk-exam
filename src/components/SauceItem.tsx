import styles from "../styles/pages/menu.module.scss";

const SauceItem = () => {
  return (
    <>
      <article className={styles.sauceitems}>
        <h2 className={styles.title}>DIPSÅS</h2>
        <div className={styles.line__dotted}></div>
        <h2 className={styles.price}>19 SEK</h2>

        <div className={styles.sauceitem__con}>
          <article className={styles.sauceitem}>
            <p className={styles.sauceitem__name}>sweet chili</p>
          </article>
        </div>
      </article>
    </>
  );
};

export default SauceItem;
