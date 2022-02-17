import { useContext, useEffect, useState } from "react"
import { AuthContext, AuthProvider } from "./contexts/auth"
import { Dashboard } from "./pages/dashboard/Dashboard"
import { Login } from "./pages/login/Login"
import styles from "./styles.module.scss"


function App() {
  const {authenticated} = useContext(AuthContext)
  const [logged, setLogged] = useState(false)

  useEffect(()=>{
    if(authenticated){
      setLogged(true)
    }

  },[authenticated])
 return (
   <div>
      { !authenticated ?  <Login/> : <Dashboard/>}
   </div>
 )
}

export default App
