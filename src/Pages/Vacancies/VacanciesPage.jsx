import React, {useEffect, useState} from "react";
import Vacancies from "./Vacancies";
import SearchForm from "./SearchForm/SearchForm";
import SearchFilters from "./SearchFilters/SearchFilters";
import s from "./Vacancies.module.css"


const VacanciesPage = (props) => {

    const [curCatalog, setCurCatalog] = useState(33)
    const [salarFilterFrom, setSalarFilterFrom] = useState('');
    const [salarFilterTo, setSalarFilterTo] = useState('');
    const [catLoading, setCatLoading] = useState(true);
    const [cataloguesList, setCatalogues] = useState(null);


    const [searchTextArea, setSearchTextArea] = new useState('');

    const [isLoading, setLoading] = useState(true);

    const [vacanicesList, setVacanciesList] = useState(null);
    const [activePage, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(125);

    let fetchVacanciesList = async () => {
        let URL = `https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?published=1&count=4&page=${activePage - 1}`
        if (salarFilterFrom) {
            URL = URL.concat(`&payment_from=${salarFilterFrom}`)
        }
        if (salarFilterTo) {
            URL = URL.concat(`&payment_to=${salarFilterTo}`)
        }
        if (searchTextArea) {
            URL = URL.concat(`&keyword=${searchTextArea}`)
        }
        if (curCatalog) {
            URL = URL.concat(`&catalogues=${curCatalog}`)
        }
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
        window.vaca = await data.objects;

        setVacanciesList(await data.objects);
        setLoading(false)
        if (data.total <= 500) {
            setTotalPage(Math.ceil(data.total / 4))
        }

    };
    let fetchCatalogues = async () => {
        setCatLoading(true);
        let response = await fetch(
            `https://startup-summer-2023-proxy.onrender.com/2.0/catalogues/`,
            {
                method: `GET`,
                headers: {
                    'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
                    'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem(`loginData`)).access_token}`,
                },
            });
        let data = await response.json();
        window.cata = await data;
        console.log(data);
        let maped = data.map(cat => {
            let obj = {};
            obj.value = cat.key;
            obj.label = cat.title_rus;
            return obj;
        })
        console.log(maped);
        setCatalogues(maped);
        setCatLoading(false);
    };

    useEffect(() => {
        fetchCatalogues()
    }, [])

    useEffect(() => {
        fetchVacanciesList(activePage);
    }, [activePage]) // eslint-disable-line no-use-before-define

    return (
        <div className={s.vacanciesPage}>
            <SearchFilters
                fetchVacanciesList={fetchVacanciesList}
                curCatalog={curCatalog}
                setCurCatalog={setCurCatalog}
                salarFilterFrom={salarFilterFrom}
                setSalarFilterFrom={setSalarFilterFrom}
                salarFilterTo={salarFilterTo}
                setSalarFilterTo={setSalarFilterTo}
                catLoading={catLoading}
                setCatLoading={setCatLoading}
                cataloguesList={cataloguesList}
                setLoading={setLoading}

            />
            <div className={s.vacanciesArea}>
                <SearchForm
                    fetchVacanciesList={fetchVacanciesList}
                    searchTextArea={searchTextArea}
                    setLoading={setLoading}
                    setSearchTextArea={setSearchTextArea}
                />
                <Vacancies
                    isLoading={isLoading}
                    setLoading={setLoading}
                    vacanicesList={vacanicesList}
                    setVacanciesList={setVacanciesList}
                    activePage={activePage}
                    setPage={setPage}
                    fetchVacanciesList={fetchVacanciesList}
                    vacancies={props.vacancies}
                    totalPage={totalPage}
                />
            </div>
        </div>
    )
}

export default VacanciesPage;