import { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";
import { Animal } from "../types/animal";
import { Tutor } from "../types/tutor";


type TutoresProvider = {
  children: ReactNode;
}
type TutoresContextData ={
  tutores: Tutor[];
  tutor: Tutor | undefined;
  isLoading: boolean
  setIsLoading: (isLoading: boolean)=>void
  getTutores: ()=>void;
  getTutoresByID:(id: string)=>void;
  getTutoresByName: (name: string)=>void;
  createTutor: (name: string, email: string, phone: string, address: string) => void;
}
export const TutoresContext = createContext({} as TutoresContextData);

export  function TutoresProvider(props: TutoresProvider){
  
  const [tutores, setTutores] = useState<Tutor[]>([]);
  const [tutor, setTutor] = useState<Tutor>()
  const [isLoading, setIsLoading] = useState(true)

  async function getTutores() {
    const { data } = await api.get<Tutor[]>('/tutor');
    setTutores(data)
    setIsLoading(false)
  }

  async function getTutoresByName(name:string) {
    const { data } = await api.get<Tutor[]>(`/tutor/name/${name}`);
    setTutores(data);
    setIsLoading(false)
  }

  async function getTutoresByID(id:string) {
    const { data } = await api.get<Tutor>(`/tutor/id/${id}`);
    setTutor(data);
    setIsLoading(false)
  }

  async function createTutor(name: string, email: string, phone: string, address: string){
    const {data} = await api.post<Tutor>('/tutor', {name, email, phone, address});
    setTutor(data);
  }

  return (
    <TutoresContext.Provider value={{tutores, 
      getTutoresByID,
      getTutores, 
      getTutoresByName, 
      tutor, 
      createTutor,
      isLoading,
      setIsLoading
      }}>
      {props.children}
    </TutoresContext.Provider>
  )
}
