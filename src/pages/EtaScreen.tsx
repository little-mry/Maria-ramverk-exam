import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import styles from "../styles/pages/etascreen.module.scss";
import boxImg from "../assets/boxtop.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";

import { fetchOrderInfoThunk, clearOrder } from "../redux/slices/orderSlice";

const EtaScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const orderINFO = useSelector((state: RootState) => state.order.order);
  const eta = orderINFO?.[0]?.eta || "";

  const [minutesLeft, setMinutesLeft] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
     dispatch(fetchOrderInfoThunk());
    }, 5000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (orderINFO && orderINFO[0] && orderINFO[0].state === "completed") {
      dispatch(clearOrder());
    }
  }, [orderINFO, dispatch]);

  useEffect(() => {
    if (!eta) return;
    const targetTime = new Date(eta).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;
      const minutes = difference > 0 ? Math.floor(difference / 60000) : 0;
      setMinutesLeft(minutes);
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  });

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
              <p className={styles.orderinfo__title}>DINA WONTON ÄR PÅVÄG...</p>
              <p className={styles.orderinfo__eta}>
                {minutesLeft} {minutesLeft === 1 ? "minut" : "minuter"} kvar
              </p>
              <p className={styles.orderinfo__id}>
                #{String(orderINFO[0].id).toLocaleUpperCase()}
              </p>
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
