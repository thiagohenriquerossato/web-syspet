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

  const [searchActive, setSearchActive] = useState(false)
  const [editActive, setEditActive] = useState(false)

  const[searchTerm, setSearchTerm] = useState('')


  function handleLogOut(){
    signOut()
  }
  function handleCreateAppointment(){
    if(nav) setNav(!nav);
    setActivePopUp(true);
  }

  async function handleSearch(event: FormEvent){
    event.preventDefault();
    if(!searchTerm.trim()){
      return;
    }
    if(page==="tutor") getTutoresByName(searchTerm)
    if(page==="pet") alert("função nao ativa")
    setIsLoading(true);
    setSearchTerm('')
  }


  useEffect(()=>{
    const [,,,pagina] = window.location.href.split("/");
    switch(pagina) {
      case "tutores":
        setCreateTutorActive(true);
        setCreatePetActive(false);
        setSearchActive(true);
        setEditActive(false);
        setCreateAppointment(false);
        setPage("tutor");
        break;
      case "tutor":
        setCreatePetActive(true);
        setCreateTutorActive(false);
        setSearchActive(false);
        setEditActive(true);
        setCreateAppointment(false);
        setPage("tutor");

        break;
      case "pets":
        setCreatePetActive(false);
        setCreateTutorActive(false);
        setSearchActive(true);
        setCreateAppointment(false);
        setEditActive(false);
        setPage("pet");
        break;
        case "pet":
        setCreatePetActive(false);
        setCreateTutorActive(false);
        setSearchActive(false);
        setCreateAppointment(true);
        setEditActive(true);
        setPage("pet");
        break;
      default:
        setCreateTutorActive(false);
        setCreatePetActive(false);
        setSearchActive(false);
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
        <div className={searchActive ? styles.searchInput : styles.notActive}>
          <form onSubmit={handleSearch}>
            <input type="text" 
              placeholder={`Procurar ${page}`}
              onChange={event=>{setSearchTerm(event.target.value)}}
              value={searchTerm}
            />
            <button>
              <MdSearch/>
            </button>
              
          </form>
        </div>
        <div>
          <div onClick={handleCreateAppointment} className={createAppointment ? styles.createEntry : styles.notActive}>
            <span>Criar agendamento</span>
          </div>
          <CreateAppointment petId={pet?.id} trigger={activePopUp} setTrigger={setActivePopUp}/>
          <NavLink to={editActive && !searchActive?`/criar/pet/${tutor?.id}`:`/criar/${page}`} className={createTutorActive || createPetActive? styles.createEntry : styles.notActive}>
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