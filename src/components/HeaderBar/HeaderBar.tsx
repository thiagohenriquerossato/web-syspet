import { FormEvent, useContext, useEffect, useState } from 'react';
import { MdOutlineLogout, MdOutlineMenu, MdSearch } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import NavContext from '../../contexts/NavContext';
import { PetsContext } from '../../contexts/pets';
import { TutoresContext } from '../../contexts/tutores';
import { CreateAppointment } from '../CreateAppointment/CreateAppointment';
import styles from './styles.module.scss'

export function HeaderBar () {
  const { nav, setNav } = useContext(NavContext);
  const{getTutoresByName, setIsLoading, tutor} = useContext(TutoresContext)
  const {pet} = useContext(PetsContext)
  const {signOut}= useContext(AuthContext)
  const [page, setPage] = useState('')
  const [createTutorActive, setCreateTutorActive] = useState(false)
  const [createPetActive, setCreatePetActive] = useState(false)
  const [createAppointment, setCreateAppointment] = useState(false)
  const [activePopUp, setActivePopUp] = useState(false)

  const [editActive, setEditActive] = useState(false)



  function handleLogOut(){
    signOut()
  }
  function handleCreateAppointment(){
    if(nav) setNav(!nav);
    setActivePopUp(true);
  }


  useEffect(()=>{
    const [,,,pagina] = window.location.href.split("/");
    switch(pagina) {
      case "tutores":
        setCreateTutorActive(true);
        setCreatePetActive(false);
        setEditActive(false);
        setCreateAppointment(false);
        setPage("tutor");
        break;
      case "tutor":
        setCreatePetActive(true);
        setCreateTutorActive(false);
        setEditActive(true);
        setCreateAppointment(false);
        setPage("tutor");

        break;
      case "pets":
        setCreatePetActive(false);
        setCreateTutorActive(false);
        setCreateAppointment(false);
        setEditActive(false);
        setPage("pet");
        break;
        case "pet":
        setCreatePetActive(false);
        setCreateTutorActive(false);
        setCreateAppointment(true);
        setEditActive(true);
        setPage("pet");
        break;
      default:
        setCreateTutorActive(false);
        setCreatePetActive(false);
        setEditActive(false);
        setCreateAppointment(false);

        break;
    }

    
  },[window.location.href])

  return (
    <div className={styles.container}>
      {/* BURGER */}
      <div
        className={styles.burger_container}
        onClick={() => {
          setNav(!nav);
        }}
      >
        <MdOutlineMenu />
      </div>
      

      {/* ACTIONS */}
      <div className={styles.actions}>
        <div>
          
          <span onClick={handleCreateAppointment} className={createAppointment ? styles.createEntry : styles.notActive}>Criar agendamento</span>
          
          <CreateAppointment petId={pet?.id} trigger={activePopUp} setTrigger={setActivePopUp}/>
          <NavLink to={editActive ?`/criar/pet/${tutor?.id}`:`/criar/${page}`} className={createTutorActive || createPetActive? styles.createEntry : styles.notActive}>
            <span>{!createPetActive?`Cadastrar ${page}`: 'Cadastrar Pet'}</span>
          </NavLink>
          <NavLink to={editActive && page==='tutor'?`/editar/${page}/${tutor?.id}`:`/editar/pet/${pet?.id}`} className={editActive? styles.createEntry : styles.notActive}>
            <span>{`Editar ${page}`}</span>
          </NavLink>
        </div>
        <MdOutlineLogout onClick={handleLogOut}/>
      </div>
    </div>
  );
}