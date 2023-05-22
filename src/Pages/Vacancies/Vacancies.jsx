import React from "react";
import Vacanda from "./Vacanda/Vacanda";
import s from './Vacancies.module.css';
import {Group, Loader, Pagination} from "@mantine/core";

const Vacancies = (props) => {
    return (
        <>
            {
                (props.isLoading === true) ?
                    <div className={s.loader}><Loader/></div> :
                    <>
                        <Vacanda
                            className={s.vacancies}
                            vacancies={props.vacanicesList}
                            favRender={props.fetchVacanciesList}
                        />
                        <Pagination.Root
                            size={(window.innerWidth >= 768) ? 'md' : 'xs'}
                            boundaries={(window.innerWidth >= 768) ? 1 : 0}
                            value={props.activePage}
                            onChange={(num) => props.setPage(num)}
                            total={props.totalPage}
                        >
                            <Group
                                spacing={5}
                                position="center"
                                className={s.pagination}
                            >
                                <Pagination.Previous/>
                                <Pagination.Items/>
                                <Pagination.Next/>
                            </Group>
                        </Pagination.Root>
                    </>
            }
        </>
    )
}

export default Vacancies;