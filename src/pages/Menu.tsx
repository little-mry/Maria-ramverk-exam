import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchApiKey } from "../redux/slices/authSlice";
import { fetchMenuThunk } from "../redux/slices/menuSlice";
import { RootState, AppDispatch } from "../redux/store";

import Header from "../components/Header";
import MenuItem from "../components/MenuItem";
import DipItems from "../components/DipItems";
import styles from "../styles/pages/menu.module.scss";
import DrinkItems from "../components/DrinkItems";

const Menu = () => {
  const dispatch = useDispatch<AppDispatch>();

  const apiKey = useSelector((state: RootState) => state.apiKey.key);
  const menu = useSelector((state: RootState) => state.menu.menu) || [];
  const menuStatus = useSelector((state: RootState) => state.menu.status);

  useEffect(() => {
    dispatch(fetchApiKey());
  }, [dispatch]);

  useEffect(() => {
    if (apiKey) {
      dispatch(fetchMenuThunk(apiKey));
    }
  }, [apiKey, dispatch]);

  const wontonItems = menu.filter((item) => item.type === "wonton");
  const dipItems = menu.filter((item) => item.type === "dip");
  const drinkItems = menu.filter((item) => item.type === "drink");

  return (
    <>
      <section className={styles.menu}>
        <Header />
        <main className={styles.menu__con}>
          <h1 className={styles.menu__heading}>MENY</h1>

          {menuStatus === "succeeded" &&
            wontonItems.map((item) => <MenuItem key={item.id} item={item} />)}

          <DipItems dips={dipItems} />
          <DrinkItems drinks={drinkItems} />
        </main>
      </section>
    </>
  );
};

export default Menu;
