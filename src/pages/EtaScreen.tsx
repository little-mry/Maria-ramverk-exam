import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import styles from "../styles/pages/etascreen.module.scss";
import boxImg from "../assets/boxtop.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useRef, useState } from "react";

import { fetchOrderInfoThunk, clearOrder } from "../redux/slices/orderSlice";

const EtaScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const orderINFO = useSelector((state: RootState) => state.order.order);
  const eta = orderINFO?.[0]?.eta || "";

  const [minutesLeft, setMinutesLeft] = useState<number>(0);

  const pollingIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    dispatch(fetchOrderInfoThunk());
    pollingIntervalRef.current = window.setInterval(() => {
      dispatch(fetchOrderInfoThunk());
    }, 5000);

    return () => {
      if (pollingIntervalRef.current !== null) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [dispatch]);

  useEffect(() => {
    if (orderINFO.length === 0 && pollingIntervalRef.current !== null) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  }, [orderINFO]);

  useEffect(() => {
    if (orderINFO.length === 0 && pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  }, [orderINFO]);

  useEffect(() => {
    if (!eta || orderINFO.length === 0) return;
    const targetTime = new Date(eta).getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = targetTime - now;
      if (diff <= 0) {
        setMinutesLeft(0);
        dispatch(clearOrder());
      } else {
        setMinutesLeft(Math.floor(diff / 60000));
      }
    };

    updateCountdown();
    const countdownInterval = window.setInterval(updateCountdown, 1000);
    return () => clearInterval(countdownInterval);
  }, [eta, orderINFO, dispatch]);

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
              <p className={styles.orderinfo__title}>DINA WONTON ÄR KLARA</p>
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
