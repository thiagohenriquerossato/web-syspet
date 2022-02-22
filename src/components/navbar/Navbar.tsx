import {NavLink} from 'react-router-dom'
import logo from "../../../assets/logo.png"

import styles from './styles.module.scss';

import {FaTimes} from 'react-icons/fa'



import {
  MdPets, MdCalendarToday, MdGroup, MdLogout, MdOutlineDashboard, MdMenu, MdKeyboardBackspace, MdSearch
} from 'react-icons/md'
import { FormEvent, useContext, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import NavContext from '../../contexts/NavContext';
import { TutoresContext } from '../../contexts/tutores';
import { PetsContext } from '../../contexts/pets';


type NavUrlProps = {
  url: string;
  icon: any;
  description: string;
}

export function Navbar(){

  const { nav, setNav } = useContext(NavContext);
  const{getTutores, getTutoresByName} = useContext(TutoresContext)
  const {getPets} = useContext(PetsContext)
  const [searchActive, setSearchActive] = useState(false)
  const [page, setPage] = useState('')
  const[searchTerm, setSearchTerm] = useState('')

  useEffect(()=>{
  const [,,,pagina] = window.location.href.split("/");
  setPage(pagina);
    switch(pagina) {
      case "agenda":
        setSearchActive(false);
        break;
      default:
        setSearchActive(true);
        break;
    }
    console.log(searchActive)
  },[window.location.href])


  async function checkWindowSize(url: string){
    if(window.innerWidth <1024) setNav(!nav)
    if(url==="/tutores") getTutores();
    if(url==="/pets") getPets()
  }

  async function handleSearch(event: FormEvent){
    if(!nav){
      setNav(!nav)
    }
    event.preventDefault();
    if(!searchTerm.trim()){
      return;
    }
    if(page==="tutores") getTutoresByName(searchTerm)
    if(page==="pets") alert("função nao ativa")
    // setIsLoading(true);
    setSearchTerm('')
    setNav(!nav)
  }

  function NavUrl({url, icon, description}: NavUrlProps){
    return (
      <li className={styles.liNavLink}>
        <NavLink
         to={`${url}`}
         onClick={()=>checkWindowSize(url)}
         className={({isActive})=>(isActive ? styles.active : '')}
        >
          {icon}
          <span className={styles.description}>{description}</span>
        </NavLink>
      </li>
    )
  }

  return (
    <div className={`${styles.navbarContainer} ${nav ? styles.navBarMobileActive : ''}`}>
      <nav className={nav ? '' : styles.navSmall}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" className={styles.logoIcon}/>
          <FaTimes className={styles.mobileCancelIcon} 
            onClick={()=>setNav(!nav)}
          />
        </div>
        <ul className={styles.menuContainer}>
          <NavUrl
            url='/agenda'
            icon={<MdCalendarToday/>}
            description='Agenda'
          />
          <NavUrl
            url='/tutores'
            icon={<MdGroup/>}
            description='Tutores'
          />
          <NavUrl
            url='/pets'
            icon={<MdPets/>}
            description='Pets'
          />
        </ul>
        <div className={searchActive ? '' : styles.notActive}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <button type='submit'>
              <MdSearch/>
            </button>
            <input type="text" 
              placeholder={`Procurar ${page}`}
              onChange={event=>{setSearchTerm(event.target.value)}}
              value={searchTerm}
              className={styles.searchInput}
            />
          </form>
        </div>
        <div className={styles.logout}
            onClick={()=>{
              setNav(!nav)
            }}
        >
            <MdKeyboardBackspace/>
        </div>  
      </nav>

      <div
        className={nav ? styles.mobile_nav_background_active : undefined}
        onClick={() => {
          setNav(!nav);
        }}
      ></div>
    </div>
  )
}

function getTutoresByName(searchTerm: any) {
  throw new Error('Function not implemented.');
}
