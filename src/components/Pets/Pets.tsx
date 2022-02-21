import { useContext, useEffect, useState } from "react";
import { PetsContext } from "../../contexts/pets";
import { baseURL } from "../../services/baseURL";
import { Card } from "../Cards/Card";
import { Loading } from "../Loading/Loading";
import styles from "./styles.module.scss"

type PetsList = {
  id: string;
  tutor_id: string;
  img: string;
  name: string;
  breed: string;
  species: string;
  gender: string;
  tutor: string;
}

export function Pets(){

  const {pets, isLoading, getPets} = useContext(PetsContext)
  const [petsList, setPetsList] = useState<PetsList[]>([])

  useEffect(()=>{
    if(pets.length>0){
      const animals = pets.map(pet=>{
        return {
          id: pet.id,
          img: pet.avatar? pet.avatar : '',
          name: pet.name,
          breed: pet.breed,
          species: pet.species,
          gender: pet.gender,
          tutor: pet.tutor.name,
          tutor_id: pet.tutor_id,
        }
      })
      
      setPetsList(animals)
    }
  },[pets])
  return (
    <div className={styles.wrapper}>

      {
        isLoading ? <Loading/> : 
        (
          petsList.map((pet, index)=>{
            return (
              <Card
                key={index}
                tutor_id={pet.tutor_id}
                pet_id={pet.id}
                img={pet.img}
                name={pet.name}
                species={pet.species}
                breed={pet.breed}
                gender={pet.gender}
                tutor={pet.tutor}
              />
            )
          })
        )
      }
    </div>
  )
} 