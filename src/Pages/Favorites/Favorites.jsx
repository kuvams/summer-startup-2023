import React, {useEffect, useState} from "react";
import Vacanda from "../Vacancies/Vacanda/Vacanda";
import {Loader} from "@mantine/core";
import s from './Favorite.module.css';

const Favorites = () => {

    const [favVacanicesList, setFavVacanciesList] = useState(null)

    let fetchVacanciesList = async () => {
        let favorites = JSON.parse(localStorage.getItem(`favoriteVacancies`));
        if (favorites.length) {

            let query = new URLSearchParams(favorites.map(id => [`ids[]`, id])).toString();
            console.log(query);
            let response = await fetch(`https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?${query}`, {
                method: `GET`,
                headers: {
                    'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
                    'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem(`loginData`)).access_token}`,
                },
            });
            let data = await response.json();
            // console.log(`state: ` + state.fetchedVacancies);
            window.favVaca = await data.objects;
            setFavVacanciesList(data.objects);
        } else {
            setFavVacanciesList(`EMPTY`);
        }
    };
    // debugger;
    useEffect(() => {
        if (favVacanicesList === null) {
            fetchVacanciesList();
        }
    })

    return (
        (favVacanicesList === null) ?
            <div className={s.loader}><Loader/></div> :
            <div className={s.favoritesPage}>
                <Vacanda
                    vacancies={favVacanicesList}
                    favRender={fetchVacanciesList}/>
            </div>
    )
}
export default Favorites;