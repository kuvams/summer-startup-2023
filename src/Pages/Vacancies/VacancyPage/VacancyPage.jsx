import React, {useEffect, useState} from "react";
import s from "./VacancyPage.module.css"
import {useParams} from "react-router-dom";
import {Loader} from "@mantine/core";
import {IconMapPin} from "@tabler/icons-react";
import FavButton from "../Vacanda/FavButton/FavButton";
import parse from "html-react-parser"

const VacancyPage = () => {
    const [isLoading, setLoading] = useState(true);

    const vacancy = useParams()

    const [vacData, setVacData] = useState(0)

    let fetchVacancy = async () => {
        let URL = `https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/${vacancy.id}`
        let response = await fetch((URL)
            , {
                method: `GET`,
                headers: {
                    'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
                    'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem(`loginData`)).access_token}`,
                },
            });
        let data = await response.json();
        console.log(data);
        setVacData(await data);
        setLoading(false)
    };

    useEffect(() => {
        fetchVacancy();
        // eslint-disable-next-line
    }, [])

    const parseZpString = () => {
        let zp = 'з/п';
        if (vacData.payment_from === 0 && vacData.payment_to === 0) {
            zp = zp.concat(` договорная`)
        }
        if (vacData.payment_from !== 0) {
            zp = zp.concat(` от ${vacData.payment_from}`)
        }
        if (vacData.payment_to !== 0) {
            zp = zp.concat(` до ${vacData.payment_to}`)
        }
        return zp;
    }

    return (
        <>
            {isLoading ? <div className={s.loader}><Loader/></div> :
                <div className={s.fullInfo}>
                    <div className={s.VacancyInfo}>
                        <div className={s.vacancyCard}>
                            <div>
                                <div className={s.profession}>{vacData.profession}</div>
                                <div className={s.secStr}>
                                    <div className={s.zp}>{`${parseZpString()}`}</div>
                                    <div className={s.dot}>{` • `}</div>
                                    <div className={s.workType}>{`${vacData.type_of_work.title}`}</div>
                                </div>
                                <div className={s.location}>
                                    <IconMapPin color={'gray'} size={18}/>
                                    <div>{`${vacData.town.title}`}</div>
                                </div>
                            </div>
                            <FavButton className={s.favButton} id={vacData.id} favRender={() => fetchVacancy()}/>
                        </div>

                    </div>
                    <div className={s.detail}>
                        {
                            parse(vacData.vacancyRichText)
                        }
                    </div>
                </div>
            }

        </>
    )
}

export default VacancyPage;