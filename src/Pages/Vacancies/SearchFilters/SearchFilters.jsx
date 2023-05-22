import React from "react";
import s from "./SearchFilters.module.css";
import {Button, NumberInput, Select} from "@mantine/core";
import {IconChevronDown, IconSelector, IconX} from "@tabler/icons-react";

const SearchFilters = (props) => {
    let clearFilter = () => {
        props.setCurCatalog('')
        props.setSalarFilterFrom('')
        props.setSalarFilterTo('')
    };

    const startSearch = () => {
        props.setLoading(true);
        props.fetchVacanciesList()
    }
    return (
        <>
            <div className={s.filtersBoxOut}>
                <div className={s.filtersBoxIn}>
                    <div className={s.fBoxHeader}>
                        <div className={s.filtersHeader}>Фильтры</div>
                        <Button onClick={clearFilter} variant="subtle" color="gray" rightIcon={<IconX size={12}/>}
                                compact>{(window.innerWidth >= 1440) ? 'Сбросить все' : ''}</Button>
                    </div>
                    <div className={s.filters}>
                        <div className={s.catalogues}>
                            <Select
                                data-elem="industry-select"
                                value={props.curCatalog}
                                onChange={(num) => props.setCurCatalog(num)}
                                label="Отрасль"
                                placeholder="Выберите отрасль"
                                disabled={props.catLoading}
                                rightSection={<IconChevronDown color="gray"/>}
                                data={props.catLoading ? [] : props.cataloguesList}
                            />
                        </div>
                        <div className={s.salaries}>
                            <NumberInput className={s.salaryFrom}
                                         data-elem="salary-from-input"
                                         min={0}
                                         step={1000}
                                         stepHoldDelay={500}
                                         stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                                         thousandsSeparator=","
                                         label="Оклад"
                                         value={props.salarFilterFrom}
                                         type="number"
                                         onKeyDown={event => {
                                             if (event.key === 'Enter') {
                                                 startSearch()
                                             }
                                         }}
                                         onChange={(num) => props.setSalarFilterFrom(num)}
                                         placeholder="От"
                                         rightSection={<IconSelector color="gray" size={20}/>}
                            />
                            <NumberInput className={s.salaryTo}
                                         data-elem="salary-to-input"
                                         min={0}
                                         step={1000}
                                         stepHoldDelay={500}
                                         stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                                         thousandsSeparator=","
                                         value={props.salarFilterTo}
                                         type="number"
                                         onKeyDown={event => {
                                             if (event.key === 'Enter') {
                                                 startSearch()
                                             }
                                         }}
                                         onChange={(num) => props.setSalarFilterTo(num)}
                                         placeholder="До"
                                         rightSection={<IconSelector color="gray" size={20}/>}
                            />
                        </div>
                        <Button data-elem="search-button" onClick={() => startSearch()}
                                className={s.acceptButton}>Применить</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchFilters;


