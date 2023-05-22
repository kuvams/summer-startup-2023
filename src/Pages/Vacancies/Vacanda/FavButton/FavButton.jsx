import React from "react";
import s from './FavButton.module.css'
import {ActionIcon} from "@mantine/core";
import {IconStar, IconStarFilled} from "@tabler/icons-react";


const FavButton = (props) => {
    if (!localStorage.favoriteVacancies) {
        localStorage.favoriteVacancies = JSON.stringify([])
    }

    let favs = JSON.parse(localStorage.favoriteVacancies);
    let isFavorited = !!favs.includes(props.id);
    let icon = isFavorited ?
        <ActionIcon
            size="xs"
            color="#5e96FC"
            variant="transparent"
            onClick={() => changeFavStatus(props.id, props.favRender)}
        >
            <IconStarFilled/>
        </ActionIcon>
        :
        <ActionIcon className={s.notFav}
            size="xs"
            color="gray"
            variant="transparent"
            onClick={() => changeFavStatus(props.id, props.favRender)}
        >
            <IconStar/>
        </ActionIcon>;

    const changeFavStatus = (idForChange, render) => {
        if (isFavorited) {
            let favs = JSON.parse(localStorage.favoriteVacancies);
            favs = favs.filter(id => (id !== idForChange));
            localStorage.favoriteVacancies = JSON.stringify(favs);
            render();
        } else {
            let favs = JSON.parse(localStorage.favoriteVacancies);
            favs = new Set(favs);
            favs.add(idForChange)
            favs = Array.from(favs);
            localStorage.favoriteVacancies = JSON.stringify(favs);
            render();
        }

    };


    return (
        <div>
            {icon}
        </div>
    )
}

export default FavButton;