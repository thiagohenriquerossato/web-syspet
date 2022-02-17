import {Calendar, momentLocalizer} from 'react-big-calendar'
import format from 'date-fns/format'
import moment from 'moment';
import 'moment/dist/locale/pt-br';
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import "react-big-calendar/lib/css/react-big-calendar.css"
import DatePicker from "react-datepicker"
import { useState } from 'react'

moment.locale('pt-br')
const localizer = momentLocalizer(moment);


type Event = {
  title:string,
  allDay?: boolean,
  start: Date,
  end: Date
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

const events: Event[] = [
  {
    title: "Vacina Lola",
    start: new Date("2022-02-18T10:00"),
    end: new Date("2022-02-18T11:00")
  },
  {
    title: "Big event",
    allDay: true,
    start: new Date("02/03/2022"),
    end: new Date("02/03/2022")
  },
  {
    title: "Big event",
    allDay: true,
    start: new Date("02/04/2022"),
    end: new Date("02/04/2022")
  }
]



export function Schedule(){


  const [newEvent, setNewEvent] = useState<Event>()
  const [allEvents, setAllEvents] = useState<Event[] >(events)

  function handleAddEvent(){
    setAllEvents([...allEvents, newEvent])
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
        eventPropGetter={(event) => {
          return {
              style: {
                  backgroundColor: '#f59230',
                  borderRadius: '8px',
                  minHeight: '10px',
              },
          };
      }}
      />
    </>
  )
}