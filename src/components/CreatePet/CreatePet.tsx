import dayjs from "dayjs";
import photo from  '../../../assets/blankPhoto.png'

import { FormEvent, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";
import { Animal } from "../../types/animal";
import styles from "./styles.module.scss"

export function CreatePet(){

  const {tutor_id} = useParams()

  const today = dayjs(new Date()).format("YYYY-MM-DD")


  const [name, setName] = useState('');
  const [species, setSpecie] = useState('');
  const [weight, setWeight] = useState<Number>();
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('MACHO');
  const [birth, setBirth] = useState(today);
  const [diseases, setDiseases] = useState(['']);
  const [image, setImage] = useState<any>();
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()


  function handleInputImage(){
    hiddenFileInput.current?.click();
  }



  async function handleSubmit(event: FormEvent){
    
    event.preventDefault();

    const {data} = await api.post<Animal>(`/animal/${tutor_id}`,{
      name, species, weight, breed, gender, birth, pre_existing_diseases: diseases
    })
    if(image){
      const  formData = new FormData()
      formData.append('avatar', image)
      const headers = {
        'headers':{
          'content-type': 'multipart/form-data'
        }
      }
      await api.patch(`/animal/avatar/${data.id}`,formData, headers).then((response)=>{
      }).catch((response)=>{
        console.log(response)
      })
      
    }
    alert("Dados salvos com sucesso!")
    
    navigate(`/pet/${data.id}`)

  }

  return(

    <div className={styles.createTutorWrapper}>
      <div className={styles.createTutorBox}>
        <form onSubmit={handleSubmit} className={styles.createTutorForm}>
          <div className={styles.avatar}>
            {image ? 
              <img src={URL.createObjectURL(image)} 
                alt="blank photo" 
                width={100} 
                onClick={handleInputImage}
              /> : 
              <img src={photo} 
                alt="blank photo" 
                width={100} 
                onClick={handleInputImage}
              />
            }
            <input type="file" name="avatar"className={styles.imageInput}
              ref={hiddenFileInput}
              onChange={event => setImage(event.target.files && event.target.files[0])}
            />
          </div>
          <label>Espécie</label>
          <input 
            type="text"
            onChange={event=>setSpecie(event.target.value)}
            value={species}
          />
          <label>Raça</label>
          <input 
            type="text"
            onChange={event=>setBreed(event.target.value)}
            value={breed}
          />
          <label>Nome</label>
          <input
            type="text"
            onChange={event=>setName(event.target.value)}
            value={name}
          />
          <label>Gênero</label>
          <select onChange={event=>setGender(event.target.value)} value={gender}>
            <option>MACHO</option>
            <option>FEMEA</option>
          </select>
          <label>Peso</label>
          <input 
            type="text"
            onChange={event=>setWeight(Number(event.target.value))}
            value={weight?.toString()}
          />
          <label>Data de nascimento</label>
          <input 
            type="date"
            onChange={event=>setBirth(event.target.value)}
            value={birth}
          />
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div >
  )
}