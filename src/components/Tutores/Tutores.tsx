import styles from "./styles.module.scss"
import photo from '../../../assets/blankPhoto.png'
import { Card } from "../Cards/Card";
import { useContext, useEffect, useState } from "react";
import { TutoresContext } from "../../contexts/tutores";
import { Loading } from "../Loading/Loading";
import { baseURL } from "../../services/baseURL";

type TutoresList = {
  id: string;
  img: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  pets?: string[];
}

export function Tutores(){

  const {tutores, getTutores, isLoading} = useContext(TutoresContext)
  const [tutorsList, setTutorsList] = useState<TutoresList[]>([])

  // useEffect(()=>{
  //   getTutores()
  //   console.log("primeira vez")
  // },[]);

  useEffect(()=>{
    if(tutores.length>0){
      const tutors = tutores.map(tutor =>{
        return{
          id: tutor.id,
          img: tutor.avatar ? tutor.avatar: photo,
          name: tutor.name,
          phone: tutor.phone,
          email: tutor.email,
          address: tutor.address,
          pets: tutor.animals.map(pet=>{return pet.name})
        }
      })
      setTutorsList(tutors)
      
    }else{
      setTutorsList([])
    }
  },[tutores])
  
  return (
    <div className={styles.wrapper}>
      {
        isLoading ? <Loading/> : tutorsList.length >= 1 ?
        (
          tutorsList.map((tutor, index) =>{
            return(
              <Card
                tutor_id={tutor.id}
                key={index}
                img={tutor.img}
                name={tutor.name}
                phone={tutor.phone}
                email={tutor.email}
                address={tutor.address}
                pets={tutor.pets}
              />
            )
          })
        ): <p className={styles.noResult}>Não há correspondência com o termo buscado</p>
      }
    </div>
  )
}