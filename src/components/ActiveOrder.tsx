import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { RootState } from "../redux/store";
import logo from "../assets/boxtop.svg";
import "../styles/partials/_variables.scss";

const ActiveOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasActiveOrder = useSelector(
    (state: RootState) => state.order.activeOrder
  );
  const [position, setPosition] = useState({
    x: window.innerWidth - 90,
    y: window.innerHeight - 150,
  });
  const [isMoving, setIsMoving] = useState(false);
  const [clickTimeOut, setClickTimeOut] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const handleTouch = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    const timeout = setTimeout(() => {
      setIsMoving(false);
    }, 200);

    setClickTimeOut(timeout);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!clickTimeOut) return;
    clearTimeout(clickTimeOut);
    setIsMoving(true);

    setPosition({
      x: event.clientX - 30,
      y: event.clientY - 30,
    });
  };

  const handleStopMoving = () => {
    if (clickTimeOut) {
      clearTimeout(clickTimeOut);
    }

    if (!isMoving) {
      handleClick();
    }
    setIsMoving(false);
  };

  const handleClick = () => {
    navigate("/eta");
  };

  React.useEffect(() => {
    if (isMoving) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleStopMoving);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleStopMoving);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleStopMoving);
    };
  }, [isMoving]);

  if (!hasActiveOrder || location.pathname === "/eta") return null;

  const style: React.CSSProperties = {
    position: "fixed",
    top: `${position.y}px`,
    left: `${position.x}px`,
    background: `rgba(238, 238, 238, 1) url("${logo}") no-repeat 50% 50%`,
    backgroundSize: "5rem 5rem",
    border: "1px solid black",
    boxShadow: "0px 0px 34px 0px rgba(0, 0, 0, 0.67)",
    borderRadius: "50%",
    width: "5.5rem",
    height: "5.5rem",
    cursor: "pointer",
  };
  return (
    <figure
      onMouseDown={handleTouch}
      onTouchStart={handleTouch}
      style={style}
      onClick={(e) => e.preventDefault()}
    ></figure>
  );
};

export default ActiveOrder;
