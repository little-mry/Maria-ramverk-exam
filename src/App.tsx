import { Outlet } from "react-router-dom"
import ActiveOrder from "./components/ActiveOrder"

const App = () => {
  return (
    <>
      <ActiveOrder />
      <Outlet />  
    </>
  )
}

export default App
