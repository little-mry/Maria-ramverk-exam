import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import styles from "../styles/pages/receipt.module.scss";
import logo from "../assets/logo.svg";
import ReceiptItem from "../components/ReceiptItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { createReceiptThunk } from "../redux/slices/receiptSlice";

const Receipt = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const receipt = useSelector((state: RootState) => state.receipt);

  const orderId = useSelector((state: RootState) => state.order.order[0].id);


  useEffect(() => {
    if (orderId) {
      dispatch(createReceiptThunk({ orderId }));
    } else {
      console.log("Missing apiKey or orderId", { orderId });
    }
  }, [dispatch, orderId]);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.receipt}>
          <article className={styles.receipt__header}>
            <img
              className={styles.receipt__logo}
              src={logo}
              alt="Y Y G S logo"
            />
            <h1 className={styles.receipt__title}>KVITTO</h1>
            <p className={styles.receipt__id}>#{receipt.id}</p>
          </article>

          {receipt.items.map((item) => <ReceiptItem key={item.id} item={item}/>)}
          

          <article className={styles.total}>
            <p className={styles.total__title}>TOTALT</p>
            <p className={styles.total__desc}>inkl 20% moms</p>
            <p className={styles.total__price}>{receipt.orderValue} SEK</p>
          </article>
        </section>
        <button className={styles.neworder__btn} onClick={() => navigate("/")}>
          GÖR EN NY BESTÄLLNING
        </button>
      </main>
    </>
  );
};

export default Receipt;
