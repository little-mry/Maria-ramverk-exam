import styles from "../styles/components/header.module.scss";
import Cart from "./Cart";
import logo from "../assets/logo-bw.svg";

const Header = () => {
  const isMenuPage = location.pathname === '/'; 

  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo with Y Y G S" className={styles.logo} />
      {isMenuPage && <Cart />}
    </header>
  );
};

export default Header;
