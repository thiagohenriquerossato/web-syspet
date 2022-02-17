
import styles from "./styles.module.scss"
import logo from "../../../assets/logo.png"
import { FormEvent, useContext, useState } from "react"
import { AuthContext } from "../../contexts/auth"

export function Login() {

  const {signIn} = useContext(AuthContext)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event: FormEvent){

    event.preventDefault();
    if(!password.trim() && !name.trim()){
      alert("Digite o login e senha")
      return
    }

    signIn({name, password});

  }
  return(
    <div className={styles.loginWrapper}>
      <div className={styles.loginBox}>
        <div className={styles.syspetLogo}>
          <img src={logo} alt="logo"/>
          <h1>Syspet</h1>
        </div>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <input
            type='text'
            placeholder="Usuário"
            onChange={event=>setName(event.target.value)}
            value={name}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={event=>setPassword(event.target.value)}
            value={password}
          />
          <div className={styles.loginButton}>
            <button type="submit">Entrar</button>
          </div>
        </form>
      </div>
    </div >
  )
}