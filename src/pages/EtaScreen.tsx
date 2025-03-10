import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import styles from "../styles/pages/etascreen.module.scss";
import boxImg from "../assets/boxtop.svg";


const EtaScreen = () => {
  const navigate = useNavigate()
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.orderinfo}>
        <figure className={styles.orderinfo__img}>
          <img
            src={boxImg}
            alt="Image of a foodbox from Yum Yum Gimme Sum"
          />
        </figure>
          <p className={styles.orderinfo__title}>DINA WONTON TILLAGAS</p>
          <p className={styles.orderinfo__eta}>ETA 5 MIN</p>
          <p className={styles.orderinfo__id}>#4LKADSÖLDFKASÖL</p>
        </section>
        <section className={styles.btn__con}>
          <button className={styles.neworder__btn} onClick={() => navigate('/')}>
            GÖR EN NY BESTÄLLNING
          </button>
          <button className={styles.receipt__btn} onClick={() => navigate('/receipt')}>
            SE KVITTO
          </button>
        </section>
      </main>
    </>
  );
};

export default EtaScreen;
