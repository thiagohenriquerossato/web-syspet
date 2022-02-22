import { FormEvent, ReactNode, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../../services/api"
import { Loading } from "../Loading/Loading"
import { PopUp } from "../PopUp/PopUp"
import styles from './styles.module.scss'

type CreateAppointmentProps = {
  petId?: string;
  trigger: boolean
  setTrigger: (trigger: boolean) => void;
}
export function CreateAppointment(props:CreateAppointmentProps ){
  

  const[date, setDate] = useState('')
  const[type, setType] = useState('Vacina')
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();


  async function handleSubmit(event: FormEvent){
    event.preventDefault();
    setIsSaving(true);

    const {data} = await api.post(`/appointment/${props.petId}`,{date,type});
    setIsSaving(false);
    console.log(data);

    props.setTrigger(!props.trigger)
  }
  

  
  return (
    <PopUp trigger={props.trigger} setTrigger={props.setTrigger}>
      {
        isSaving ? <Loading/> :

        <div className={styles.appointmentWrapper}>
          <form className={styles.appointmentForm} onSubmit={handleSubmit}>
            <label>Selecione data e hora</label>
            <input type="datetime-local" onChange={event => setDate(event.target.value)}
              value={date}
            />
            <label>Selecione o tipo de consulta</label>
            <select onChange={(event) => setType(event.target.value)}value={type}>
              <option>Vacina</option>
              <option>Veterinária</option>
              <option>Nutricional</option>
            </select>
            <button type="submit">Agendar</button>
          </form>
        </div>
      }
    </PopUp>
    )
}