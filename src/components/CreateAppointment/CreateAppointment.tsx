import { FormEvent, ReactNode, useState } from "react"
import { useParams } from "react-router-dom"
import { PopUp } from "../PopUp/PopUp"
import styles from './styles.module.scss'

type CreateAppointmentProps = {
  petId?: string;
  trigger: boolean
  setTrigger: (trigger: boolean) => void;
}

export function CreateAppointment(props:CreateAppointmentProps ){

  const[date, setDate] = useState(new Date().toDateString)
  const[type, setType] = useState()


  function handleSubmit(event: FormEvent){
    event.preventDefault();

  }
  

  
  return (
    <PopUp trigger={props.trigger} setTrigger={props.setTrigger}>
      <div className={styles.appointmentWrapper}>
        <form className={styles.appointmentForm} onSubmit={handleSubmit}>
          <label>Selecione data e hora</label>
          <input type="datetime-local" onChange={event => setDate(event.target.value)}
            value={date}
          />
          <label>Selecione o tipo de consulta</label>
          <select>
            <option>Vacina</option>
            <option>Veterinária</option>
            <option>Nutricional</option>
          </select>
          <button type="submit">Agendar</button>
        </form>
      </div>
    </PopUp>
    )
}