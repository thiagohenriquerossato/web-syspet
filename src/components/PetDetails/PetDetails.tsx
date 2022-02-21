import dayjs from 'dayjs'
import { useContext, useEffect, useState } from 'react'
import photo from "../../../assets/blankPhoto.png"
import { useParams } from 'react-router-dom'
import { PetsContext } from '../../contexts/pets'
import { baseURL } from '../../services/baseURL'
import styles from './styles.module.scss'


export function PetDetails(){
  const{pet_id} = useParams()
  const [age, setAge] = useState('');
  const {pet, getPetByID} = useContext(PetsContext)

  function getAge(){
    let months = dayjs().diff(pet?.birth, 'M');
    const years = Math.trunc(months/12);

  
    months = (months%12);
    let agee

    if(years>=1){

      agee = `${years} anos`;

      if(years===1){
        agee = '1 ano';
      }

      if(months>1){
        agee = agee + ` e ${months} meses`;
      }

      if(months===1){
        agee = agee + " e 1 mês";
      }

    }else {
      if(months>1){
        agee =`${months} meses`;
      }

      if(months===1){
        agee ="1 mês";
      }
    }
    setAge(agee ||'')
    
  }

  useEffect(()=>{

    getPetByID(pet_id ||'');
    getAge()
    
  },[])
  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.detailsContainer}>
        <img className={styles.photo} src={pet?.avatar? pet.avatar : photo} alt={pet?.name}/>
        <h4>Espécie:</h4>
        <span>{pet?.species}</span>
        <h4>Raça:</h4>
        <span>{pet?.breed}</span>
        <h4>Nome:</h4>
        <span>{pet?.name}</span>
        <h4>Gênero:</h4>
        <span>{pet?.gender}</span>
        <h4>Idade:</h4>
        <span>{age}</span>
        <h4>Doenças Pré-existentes:</h4>
        <span>{pet?.pre_existing_diseases}</span>

      </div>
      <div className={styles.petsList}>
       <h1>Vacinas</h1>
       <h1>Consultas Veterinárias</h1>
       <h1>Consultas Nutricionais</h1>
      </div>
      
    </div>
  )
}