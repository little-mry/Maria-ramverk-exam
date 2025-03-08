import { Outlet } from "react-router-dom"
import ActiveOrder from "./components/ActiveOrder"

function App() {
  return (
    <>
      <ActiveOrder />
      <Outlet />  
    </>
  )
}

export default App
