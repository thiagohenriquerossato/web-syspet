import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { TutoresContext } from "../../contexts/tutores"
import { baseURL } from "../../services/baseURL"
import { Card } from "../Cards/Card"
import styles from "./styles.module.scss"


export function TutorDetails(){
  const{tutor_id} = useParams()
  const {tutor, getTutoresByID} = useContext(TutoresContext)

  useEffect(()=>{
    getTutoresByID(tutor_id ||'')
  },[])
  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.detailsContainer}>
        <img className={styles.photo} src={tutor?.avatar? `${baseURL}/tutores/${tutor.avatar}` : "/assets/blankPhoto.png"} alt={tutor?.name}/>
        <h4>Nome:</h4>
        <span>{tutor?.name}</span>
        <h4>Email:</h4>
        <span>{tutor?.email}</span>
        <h4>Telefone:</h4>
        <span>{tutor?.phone}</span>
        <h4>Endereço:</h4>
        <span>{tutor?.address}</span>
      </div>
      <div className={styles.petsList}>
        {
          tutor?.animals.map((pet, index)=>{
            return(
              <Card
                key={index}
                tutor_id={pet.tutor_id}
                pet_id={pet.id}
                img={pet.avatar? `${baseURL}/animal/${pet.avatar}`: ""}
                name={pet.name}
                species={pet.species}
                breed={pet.breed}
                gender={pet.gender}
              />
            )
          })
        }
      </div>
      
    </div>
  )
}