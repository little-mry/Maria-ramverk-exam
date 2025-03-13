import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";

import { fetchMenuThunk } from "../redux/slices/menuSlice";
import { addToCart } from "../redux/slices/cartSlice";

import Header from "../components/Header";
import MenuItem from "../components/MenuItem";
import DipItems from "../components/DipItems";
import DrinkItems from "../components/DrinkItems";
import styles from "../styles/pages/menu.module.scss";
import { IMenuItem } from "../utils/interface";
import { createNewTenant } from "../redux/slices/tenantSlice";

const Menu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const menu = useSelector((state: RootState) => state.menu.menu) || [];
  const menuStatus = useSelector((state: RootState) => state.menu.status);
  const apiKey = useSelector((state: RootState) => state.apiKey.key);
  const tenantId = useSelector((state: RootState) => state.tenant.id);
  
  const wontonItems = menu.filter((item) => item.type === "wonton");
  const dipItems = menu.filter((item) => item.type === "dip");
  const drinkItems = menu.filter((item) => item.type === "drink");


  useEffect(() => {
    dispatch(fetchMenuThunk());

}, [dispatch]); 

  useEffect(() => {
    const getTenant = async () => {
      let currentTenantId = tenantId ?? localStorage.getItem("tenantId");
      console.log('tenantid:', currentTenantId);
      
      if (!currentTenantId && apiKey) {
        try {
          const result = await dispatch(createNewTenant("LILLAMRYS")).unwrap();
          currentTenantId = result.id;
        
    
        } catch (error) {
          console.error("Kunde inte hämta tenant:", error);
        }
      }
    };
  
    getTenant();
  }, [tenantId, apiKey, dispatch]);


  const handleAddToCart = (item: IMenuItem) => {
    dispatch(addToCart({...item, quantity: 1}));
  };

  return (
    <>
      <section className={styles.menu}>
        <Header />
        <main className={styles.menu__con}>
          <h1 className={styles.menu__heading}>MENY</h1>

          {menuStatus === "succeeded" &&
            wontonItems.map((item) => <MenuItem key={item.id} item={item} addToCart={handleAddToCart}/>)}

          <DipItems dips={dipItems} addToCart={handleAddToCart}/>
          <DrinkItems drinks={drinkItems} addToCart={handleAddToCart}/>
        </main>
      </section>
    </>
  );
};

export default Menu;
