import { Outlet } from "react-router-dom"
import { UserContextProvider } from "./util/UserContext"
import { ToastContainer } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <UserContextProvider>
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      // transition={Bounce}
      />
    </UserContextProvider>
  )
}

export default App
