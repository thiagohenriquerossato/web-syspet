import styles from './styles.module.scss'
import photo from  '../../../assets/blankPhoto.png'
import { FormEvent, useContext, useRef, useState } from 'react';
import { TutoresContext } from '../../contexts/tutores';
import { api } from '../../services/api';
import { Tutor } from '../../types/tutor';
import { useNavigate } from 'react-router-dom';



export function CreateTutor(){

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState<any>();
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()


  function handleInputImage(){
    hiddenFileInput.current?.click();
  }

  async function handleSubmit(event: FormEvent){
    
    event.preventDefault();

    const {data} = await api.post<Tutor>("/tutor",{name, email, phone, address});

    if(image){
      const  formData = new FormData()
      formData.append('avatar', image)
      const headers = {
        'headers':{
          'content-type': 'multipart/form-data'
        }
      }
      await api.patch(`/tutor/avatar/${data.id}`,formData, headers).then((response)=>{
      }).catch((response)=>{
        console.log(response)
      })
      
    }
    alert("Dados salvos com sucesso!")
    
    navigate(`/tutor/${data.id}`)

  }

  return(

    <div className={styles.createTutorWrapper}>
      <div className={styles.createTutorBox}>
        <form onSubmit={handleSubmit} className={styles.createTutorForm}>
          <div className={styles.avatar}>
            {image ? 
              <img src={URL.createObjectURL(image)} 
                alt="blank photo" 
                width={128} 
                onClick={handleInputImage}
              /> : 
              <img src={photo} 
                alt="blank photo" 
                width={128} 
                onClick={handleInputImage}
              />
            }
            <input type="file" name="avatar"className={styles.imageInput}
              ref={hiddenFileInput}
              onChange={event => setImage(event.target.files && event.target.files[0])}
            />
          </div>
          <label>Nome</label>
          <input
            type="text"
            onChange={event=>setName(event.target.value)}
            value={name}
          />
          <label>Email</label>
          <input 
            type="email"
            onChange={event=>setEmail(event.target.value)}
            value={email}
          />
          <label>Telefone</label>
          <input 
            type="text"
            onChange={event=>setPhone(event.target.value)}
            value={phone}
          />
          <label>Endereço</label>
          <input 
            type="text"
            onChange={event=>setAddress(event.target.value)}
            value={address}
          />
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div >
  )
}