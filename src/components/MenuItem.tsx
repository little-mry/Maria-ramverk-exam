import styles from "../styles/pages/menu.module.scss";

const MenuItem = () => {
  return (
    <>
      <article className={styles.fooditem}>
        <h2 className={styles.title}>KARLSTAD</h2>
        <div className={styles.line__dotted}></div>
        <h2 className={styles.price}>9 SEK</h2>
        <p className={styles.desc}>
          kantarell, scharlottenlök, morot, bladpersilja
        </p>
      </article>

      
    </>
  );
};

export default MenuItem;
