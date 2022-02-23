import {Calendar, momentLocalizer} from 'react-big-calendar'
import format from 'date-fns/format'
import moment from 'moment';
import 'moment/dist/locale/pt-br';
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import "react-big-calendar/lib/css/react-big-calendar.css"
import DatePicker from "react-datepicker"
import { useEffect, useState } from 'react'
import { api } from '../../services/api';
import { Appointment } from '../../types/Appointments';
import dayjs from 'dayjs';
import { PopUp } from '../PopUp/PopUp';
import { Animal } from '../../types/animal';

moment.locale('pt-br')
const localizer = momentLocalizer(moment);


type Event = {
  title:string,
  allDay?: boolean,
  start: Date,
  end: Date,
  desc?: string,
  type: string,
  pet: Animal,
}

const messages = {
  allDay: 'Dia Inteiro',
  previous: '<',
  next: '>',
  today: 'Hoje',
  month: 'Mês',
  week: 'Semana',
  day: 'Dia',
  agenda: 'Agenda',
  date: 'Data',
  time: 'Hora',
  event: 'Evento',
  showMore: (total:number) => `+ (${total}) Eventos`,
}




export function Schedule(){


  const [newEvent, setNewEvent] = useState<any>()
  const [allEvents, setAllEvents] = useState<any[] >([])
  const [trigger, setTrigger] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event>()
  

  function handleAddEvent(){
    setAllEvents([...allEvents, newEvent])
  }

  async function getAppointments (){
    const {data} = await api.get<Appointment[]>("/appointment");

    const events = data.map(appointment =>{
      const event: Event = {
        title: `${appointment.type} com ${appointment.animal.name}`,
        start: new Date(appointment.date),
        end: new Date(dayjs(appointment.date).add(1,'h').toDate()),
        desc: `${appointment.type} ${appointment.animal.name}`,
        type: appointment.type,
        pet: appointment.animal,
      }
      return event;
    });
    setAllEvents(events);
  }

  useEffect(()=>{
    getAppointments();

  },[])

  function handleSelectEvent(event: Event){
    setTrigger(true)
    setSelectedEvent(event)
    
  }
  function handleStyleProps(event:Event){
    
  }


  return (
    <>
      <Calendar 
        messages={messages}
        localizer={localizer}
        events={allEvents} 
        startAccessor="start" 
        endAccessor="end"
        style={{height:"75%", margin: "50px", color:"#363740"}}
        onDoubleClickEvent={event=>{handleSelectEvent(event)}}
        
        eventPropGetter={(event: Event) => {
          let bgColor;
          if(event.type==="Vacina") bgColor = "#4d9120"
          if(event.type==="Veterinária") bgColor = "#203e91"
          if(event.type==="Nutricional") bgColor = "#f59330"

          let newStyle
          if(dayjs(event.end).isBefore(dayjs(new Date()))){
            newStyle= {
              backgroundColor: bgColor,
              opacity: 0.5,
              borderRadius: '8px',
              minHeight: '10px',
            }
          }else {
            newStyle= {
              backgroundColor: bgColor,
              borderRadius: '8px',
              minHeight: '10px',
            }
          }
          return {
              style: newStyle,
          };
      }}
      />
      <PopUp setTrigger={setTrigger} trigger={trigger} >
        <span>{selectedEvent?.title}</span>
      </PopUp>
    </>
  )
}