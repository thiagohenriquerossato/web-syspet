import { createContext, ReactNode, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { api } from '../services/api'



type AuthProvider = {
  children: ReactNode;
}
type RequestData = {
  name: string;
  password: string
}
type ResponseData = {
  token: string;
  refresh_token: string
}

type AuthContextData ={
  authenticated: boolean
  signOut: ()=>void;
  signIn: ({}: RequestData ) => {};
}

export const AuthContext = createContext({} as AuthContextData)


export function AuthProvider(props: AuthProvider ) {

  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(false);

  function signOut(){
    localStorage.removeItem('@sysPet:token')
    setAuthenticated(false);
    window.history.pushState({},'',"/login")
  }

  useEffect(()=>{
    const token = localStorage.getItem('@sysPet:token')

    if(token){
      const decodedJWT = JSON.parse(atob(token.split('.')[1]));
      
      if(decodedJWT.exp * 1000 < Date.now()){
        alert("token expirado")
        localStorage.removeItem('@sysPet:token')
        setAuthenticated(false);

      } else {
        setAuthenticated(true);

      }
    } else {

      setAuthenticated(false);

    }

  },[])

  async function signIn({name, password}: RequestData){

    try {
      const {data} = await api.post<ResponseData>("/session",{name, password});
      const {token, refresh_token} = data;

      localStorage.setItem('@sysPet:token', token);
      setAuthenticated(true);
      navigate("/agenda")
    } catch (error) {
      alert("Usuário ou senha incorretos!")
    }
    
    

  }


  return (
    <AuthContext.Provider value={{ signOut, signIn, authenticated}}>
      {props.children}  
    </AuthContext.Provider>
  )

}