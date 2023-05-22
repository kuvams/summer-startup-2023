import React from "react";
import s from './Vacanda.module.css';
import FavButton from "./FavButton/FavButton";
import {IconMapPin} from "@tabler/icons-react";
import frame from "./Frame.png"
import {Button} from "@mantine/core";

const Vacanda = (props) => {
    if (props.vacancies === 'EMPTY') {
        return (
            <div className={s.empty}>
                <img alt="can not find anything" src={frame}/>
                <div className={s.ups}>Упс, здесь еще ничего нет!</div>
                <Button component='a' href='/vacancies' variant={"light"}>Поиск Вакансий</Button>
            </div>
        )
    }


    let vacancies = (props.vacancies).map(r => {
                let zp = 'з/п';
                if (r.payment_from === 0 && r.payment_to === 0) {
                    zp = zp.concat(` договорная`)
                }
                if (r.payment_from !== 0) {
                    zp = zp.concat(` от ${r.payment_from}`)
                }
                if (r.payment_to !== 0) {
                    zp = zp.concat(` до ${r.payment_to}`)
                }
                return (
                    <div data-elem={`vacancy-${r.id}`} className={s.vacancie}>
                        <div>
                            <a href={`/vacancy/${r.id}`} className={s.profession}>{r.profession}</a>
                            <div className={s.zp}>{`${zp} • ${r.type_of_work.title}`}</div>
                            <div className={s.location}>
                                <IconMapPin color={'gray'} size={18}/>
                                <div>{`${r.town.title}`}</div>
                            </div>
                        </div>
                        <FavButton className={s.favButton} id={r.id} favRender={props.favRender}/>
                    </div>
                )
            }
        )
    ;
    return (
        <div className={s.vacanciesList}>
            {vacancies}
        </div>
    )
}

export default Vacanda;