import React from "react";
// import s from './Page.module.css';
import {Routes, Route} from "react-router-dom";
import Favorites from "./Favorites/Favorites";
import state from "../store/store";
import VacanciesPage from "./Vacancies/VacanciesPage";
import s from "./Page.module.css"
import VacancyPage from "./Vacancies/VacancyPage/VacancyPage";

const Page = () => {

    return (
        <div className={s.page}>
            <Routes>
                <Route path="/vacancy/:id" element={<VacancyPage />}/>
                <Route path="/" element={<VacanciesPage vacancies={state.fetchedVacancies}/>}/>
                <Route path="/vacancy" element={<VacanciesPage vacancies={state.fetchedVacancies}/>}/>
                <Route path='/vacancies' element={<VacanciesPage vacancies={state.fetchedVacancies}/>}/>
                <Route path='/favorites' element={<Favorites/>}/>
            </Routes>
        </div>
    )
}
export default Page;