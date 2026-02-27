import { Outlet } from "react-router-dom"
import { UserContextProvider } from "./util/UserContext"

function App() {

  return (
    <UserContextProvider>
      <Outlet />
    </UserContextProvider>
  )
}

export default App
