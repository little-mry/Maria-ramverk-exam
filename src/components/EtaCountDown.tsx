import { useEffect, useState } from "react";
import styles from '../styles/pages/etascreen.module.scss'
interface EtaProps {
  eta: string; 
}

const EtaCountdown = ({ eta }: EtaProps) => {
  const [minutesLeft, setMinutesLeft] = useState<number>(0);

  useEffect(() => {
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
  }, [eta]);

  return (
    <p className={styles.orderinfo__eta}>
      {minutesLeft} {minutesLeft === 1 ? "minut" : "minuter"} kvar
    </p>
  );
};

export default EtaCountdown;