import styles from './styles.module.scss'
import photo from  '../../../assets/blankPhoto.png'
import { useNavigate } from 'react-router-dom'

type CardsProps = {
  tutor_id?: string;
  pet_id?: string;
  img?: string;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  pets?: string[];
  species?: string;
  breed?: string;
  gender?: string;
  tutor?: string;
}

export function Card ({img, name, phone, email, address, pets, species, breed, gender, tutor, tutor_id, pet_id}: CardsProps) {

  const navigate = useNavigate()

  function handleClickCard(){
    if(pet_id){
      navigate(`/pet/${pet_id}`)

    }else{
      navigate(`/tutor/${tutor_id}`)
    }
  }
  return(
    <div onClick={handleClickCard} className={styles.card}>
      <img className={styles.cardImg} src={img ? img : photo} alt={name}/>
      <div className={styles.cardBody}>
        <h2 className={styles.cardName}>{name}</h2>
        <h4 className={styles.cardPhoneSpecies}>{phone || species}</h4>
        <h4 className={styles.cardEmailBreed}>{email || breed}</h4>
        <h4 className={styles.cardAddressGender}>{address || gender}</h4>
        <div className={styles.cardLinks}>
          { !tutor ?
            pets?.map((pet,index)=>{
              return(
                <a key={index}href="">{pet}</a>
              )
            }) :
            <a href=''>{tutor}</a>
          }
        </div>
      </div>
    </div>
  )
}