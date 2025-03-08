import Header from "../components/Header";
import styles from "../styles/pages/receipt.module.scss";
import logo from "../assets/logo.svg";
import ReceiptItem from "../components/ReceiptItem";
const Receipt = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.receipt}>
          <img className={styles.receipt__logo} src={logo} alt="Y Y G S logo" />
          <h1 className={styles.receipt__title}>KVITTO</h1>
          <p className={styles.receipt__id}></p>

          <ReceiptItem />

          <article className={styles.total}>
            <p className={styles.total__title}>TOTALT</p>
            <p className={styles.total__desc}>inkl 20% moms</p>
            <p className={styles.total__price}>101 SEK</p>
          </article>
        </section>
        <button className={styles.neworder__btn}>
            GÖR EN NY BESTÄLLNING
          </button>
      </main>
    </>
  );
};

export default Receipt;
