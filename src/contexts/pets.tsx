import { createContext, ReactNode, useState } from "react"
import { api } from "../services/api";
import { Animal } from "../types/animal"

type PetsProvider = {
  children: ReactNode;
}

type PetsContextData = {
  pets: Animal[];
  pet: Animal | undefined;
  isLoading: boolean;
  getPets: ()=>void;
  getPetByID: (id: string)=>void;
  createPet: ()=>void;
}

export const PetsContext = createContext({} as PetsContextData);

export function PetsProvider (props: PetsProvider) {

  const[pets, setPets] = useState<Animal[]>([])
  const[pet, setPet] = useState<Animal>()
  const [isLoading, setIsLoading] = useState(true)

  async function getPets() {
    const {data} = await api.get<Animal[]>("/animal");
    setPets(data);
    setIsLoading(false)
  }

  async function getPetByID(id: string) {
    const {data} = await api.get<Animal>(`/animal/id/${id}`)
    setPet(data)
  }

  async function createPet() {
    
  }

  return(
    <PetsContext.Provider value={{pets, getPetByID, pet, isLoading, getPets, createPet}}>
      {props.children}
    </PetsContext.Provider>
  )


}