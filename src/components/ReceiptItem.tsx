import styles from '../styles/pages/receipt.module.scss'

const ReceiptItem = () => {
  return (
    <section className={styles.receiptitem}>
    <h2 className={styles.receiptitem__title}>KARLSTAD</h2>
    <div className={styles.receiptitem__dottedline}></div>
    <h2 className={styles.receiptitem__price}>9 SEK</h2>
    <p className={styles.receiptitem__amount}>1 stycken</p>

  </section>
  )
}

export default ReceiptItem