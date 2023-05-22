import React from "react";
import s from "./SearchForm.module.css"
import {Button, TextInput} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react"

const SearchForm = (props) => {
    const startSearch = () => {
        props.setLoading(true);
        props.fetchVacanciesList()
    }


    return (
        <div className={s.searchForm}>
            <TextInput
                data-elem="search-input"
                placeholder="Введите название вакансии"
                value={props.searchTextArea}
                onChange={(event) => props.setSearchTextArea(event.currentTarget.value)}
                onKeyDown={event => {
                    if (event.key === 'Enter') {
                        startSearch()
                    }
                }}
                icon={<IconSearch color="#ced4da" size={16}/>}
                rightSection={<Button data-elem="search-button" onClick={() => startSearch()}>Поиск</Button>}
            />
        </div>
    )
}
export default SearchForm;