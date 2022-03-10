import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { CreateAppointment } from "../../components/CreateAppointment/CreateAppointment";
import { CreatePet } from "../../components/CreatePet/CreatePet";
import { CreateTutor } from "../../components/CreateTutor/CreateTutor";
import { CreateVaccine } from "../../components/CreateVaccine/CreateVaccine";
import { EditPet } from "../../components/EditPet/EditPet";
import { EditTutor } from "../../components/EditTutor/EditTutor";
import { HeaderBar } from "../../components/HeaderBar/HeaderBar";
import { Navbar } from "../../components/navbar/Navbar";
import { PetDetails } from "../../components/PetDetails/PetDetails";
import { Pets } from "../../components/Pets/Pets";
import { Schedule } from "../../components/Schedule/Schedule";
import { TutorDetails } from "../../components/TutorDetails/TutorDetails";
import { Tutores } from "../../components/Tutores/Tutores";
import NavContext from "../../contexts/NavContext";
import { PetsProvider } from "../../contexts/pets";
import { TutoresProvider } from "../../contexts/tutores";
import styles from './styles.module.scss'

export function Dashboard(){

  const [nav, setNav] = useState(false);
  const value = { nav, setNav };

  
  return(
    <div className={styles.mainContainer}>
      <TutoresProvider>
        <PetsProvider>
          <NavContext.Provider value={value}>
          <Navbar/>
          <Container
            headerBar={<HeaderBar/>}
            content={
              <Routes>
                <Route path="/agenda" element={<Schedule/>}/>
                <Route path="/tutores" element={<Tutores/>}/>
                <Route path="/pets" element={<Pets/>}/>
                <Route path="/tutor/:tutor_id" element={<TutorDetails/>}/>
                <Route path="/pet/:pet_id" element={<PetDetails/>}/>
                <Route path="/criar/tutor" element={<CreateTutor/>}/>
                <Route path="/editar/tutor/:tutor_id" element={<EditTutor/>}/>
                <Route path="/criar/pet/:tutor_id" element={<CreatePet/>}/> 
                <Route path="/editar/pet/:pet_id" element={<EditPet/>}/>   
                <Route path="/criar/vacina/:pet_id" element={<CreateVaccine/>}/>
              </Routes>
            }
          />
          </NavContext.Provider>
        </PetsProvider>
      </TutoresProvider>
    </div>
  )
}