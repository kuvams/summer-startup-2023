import React from 'react';
import s from './Header.module.css';
import logo from './logo.png';
import {NavLink} from "react-router-dom";

const setActive = ({isActive}) => isActive ? s.activeButton : s.button;

const Header = () => {
    return (
        <div className={s.header}>
            <div className={s.headerIn}>
                <a href={'/vacancies'}><img className={s.logo} src={logo} alt="logo"/></a>
                <div className={s.buttons}>
                    <NavLink to='/vacancies' className={setActive}>Поиск Вакансий</NavLink>
                    <NavLink to='/favorites' className={setActive}>Избранное</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Header;