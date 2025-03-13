import styles from '../styles/pages/receipt.module.scss'
import { ICartItem } from '../utils/interface'

interface receiptProps {
  item: ICartItem;
}

const ReceiptItem = ({item}: receiptProps) => {
  return (
    <section className={styles.receiptitem}>
    <h2 className={styles.receiptitem__title}>{item.name}</h2>
    <div className={styles.receiptitem__dottedline}></div>
    <h2 className={styles.receiptitem__price}>{item.price} SEK</h2>
    <p className={styles.receiptitem__amount}>{item.quantity} stycken</p>

  </section>
  )
}

export default ReceiptItem