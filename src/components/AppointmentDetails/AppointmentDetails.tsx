import dayjs from "dayjs";
import {confirm} from 'react-confirm-box'
import { api } from "../../services/api";
import { Animal } from "../../types/animal";
import { PopUp } from "../PopUp/PopUp";

type Event = {
  appointment_id: string,
  title:string,
  allDay?: boolean,
  start: Date,
  end: Date,
  desc?: string,
  type: string,
  pet: Animal,
}

type AppointmentProps ={
  trigger: boolean,
  setTrigger: (trigger: boolean)=>void,
  setReloadPage:(reload: boolean)=>void,
  event?: Event,
}

export function AppointmentDetails (props: AppointmentProps){


  async function handleCancelAppointment() {
    const result = await confirm("Deseja realmente cancelar agendamento?",
    {
      closeOnOverlayClick: false,
      labels: {
        confirmable: "Sim",
        cancellable: "Nao"
      }
    }
    );

    if(result){
      await api.post(`appointment/cancel/${props.event?.appointment_id}`).catch(err=>{
        console.log(err)
      })
    }
    props.setTrigger(false);
    props.setReloadPage(true);
    
  }
  return (
    <PopUp trigger={props.trigger} setTrigger={props.setTrigger}>
      <div>
        <span>{props.event?.title}</span><br/>
        <span>{dayjs(props.event?.start).format('[Data: ] YYYY-MM-DD[ às ]HH:mm')}</span>
      </div>
      <div>
        <button onClick={handleCancelAppointment}>Cancelar</button>
        <button>Executar</button>
      </div>
    </PopUp>
  )
}