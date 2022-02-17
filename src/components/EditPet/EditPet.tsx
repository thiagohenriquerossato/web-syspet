import styles from './styles.module.scss'
import photo from  '../../../assets/blankPhoto.png'
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { TutoresContext } from '../../contexts/tutores';
import { api } from '../../services/api';
import { Tutor } from '../../types/tutor';
import { useNavigate, useParams } from 'react-router-dom';
import { Animal } from '../../types/animal';
import dayjs from 'dayjs';



export function EditPet(){

  const today = dayjs(new Date()).format("YYYY-MM-DD");

  const [name, setName] = useState('');
  const [species, setSpecie] = useState('');
  const [weight, setWeight] = useState<Number>();
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('MACHO');
  const [birth, setBirth] = useState(today);
  const [diseases, setDiseases] = useState(['']);

  const [image, setImage] = useState<File>();
  const hiddenFileInput = useRef(null);
  const navigate = useNavigate();
  const {pet_id}= useParams();
  const [animal, setAnimal] = useState<Animal>();;


  function handleInputImage(){
    hiddenFileInput.current.click();
  }
  async function getAnimal () {
    const { data } = await api.get<Animal>(`/animal/id/${pet_id}`);
    setAnimal(data)
  }
  useEffect(()=>{
    getAnimal();
    
    if(animal){
      const date = dayjs(animal?.birth).format("YYYY-MM-DD")
      setSpecie(animal?.species || '')
      setName(animal?.name || '')
      setWeight(animal?.weight || 0)
      setBreed(animal?.breed || '')
      setGender(animal?.gender || 'MACHO')
      setBirth(date||today)
    }
    

  },[animal?.id])

  async function handleSubmit(event: FormEvent){
    
    event.preventDefault();

    const {data} = await api.put<Animal>
      (`/animal/${pet_id}`,
      {name, species, weight, breed, gender, birth, pre_existing_diseases: diseases});

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
    alert("Dados alterados com sucesso!")
    navigate(`/pet/${data.id}`)

  }

  return(

    <div className={styles.createTutorWrapper}>
      <div className={styles.createTutorBox}>
        <form onSubmit={handleSubmit} className={styles.createTutorForm}>
          <div className={styles.avatar}>
            {image ? 
              <img src={URL.createObjectURL(image)} 
                alt={name} 
                width={64} 
                onClick={handleInputImage}
              /> : 
              <img src={animal?.avatar? `https://syspet-backend-alfa.herokuapp.com/animal/${animal.avatar}` : photo} 
                alt="blank photo" 
                width={64} 
                onClick={handleInputImage}
              />
            }
            <input type="file" name="avatar"className={styles.imageInput}
              ref={hiddenFileInput}
              onChange={event => setImage(event.target.files[0])}
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