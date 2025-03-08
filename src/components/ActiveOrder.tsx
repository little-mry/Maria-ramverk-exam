import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import logo from "../assets/boxtop.svg";
import "../styles/partials/_variables.scss";

const style: React.CSSProperties = {
    background: `rgba(238, 238, 238, 1) url("${logo}") no-repeat 50% 50%`,
    backgroundSize: '5rem 5rem',
    border: "1px solid black",
    boxShadow: "0px 0px 34px 0px rgba(0, 0, 0, 0.67)",
    borderRadius: "50%",
    width: "5.5rem",
    height: "5.5rem",
    position: "fixed",
    bottom: '7rem',
    right: '1rem',
    cursor: 'pointer'
}

const ActiveOrder = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const hasActiveOrder = useSelector((state: RootState) => state.order.activeOrder);

    if (!hasActiveOrder || location.pathname === '/eta') return null;

  return (
    <figure
      style={style}
      onClick={() => navigate('/eta')}
    >
    </figure>
  );
};

export default ActiveOrder;
