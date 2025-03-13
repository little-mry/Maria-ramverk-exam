import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import styles from "../styles/pages/etascreen.module.scss";
import boxImg from "../assets/boxtop.svg";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import EtaCountdown from "../components/EtaCountDown";

const EtaScreen = () => {
  const orderINFO = useSelector((state: RootState) => state.order.order);
  

  const navigate = useNavigate();
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.orderinfo}>
          <figure className={styles.orderinfo__img}>
            <img src={boxImg} alt="Image of a foodbox from Yum Yum Gimme Sum" />
          </figure>
          {orderINFO.length > 0 ? (
            <>
            <p className={styles.orderinfo__title}>DINA WONTON TILLAGAS</p>
            <EtaCountdown eta={orderINFO[0].eta} />
            <p className={styles.orderinfo__id}>#{String(orderINFO[0].id).toLocaleUpperCase()}</p>
            </>
          ) : (
            <>
            <p className={styles.orderinfo__title}>Något gick fel...</p>
            <p className={styles.orderinfo__eta}></p>
            </>
          )}
        
        </section>
        <section className={styles.btn__con}>
          <button
            className={styles.neworder__btn}
            onClick={() => navigate("/")}
          >
            GÖR EN NY BESTÄLLNING
          </button>
          <button
            className={styles.receipt__btn}
            onClick={() => navigate("/receipt")}
          >
            SE KVITTO
          </button>
        </section>
      </main>
    </>
  );
};

export default EtaScreen;
