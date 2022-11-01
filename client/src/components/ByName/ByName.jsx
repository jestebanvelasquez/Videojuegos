import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import Loading from '../Loading/Loading';
import Pagination from '../Pagination/Pagination'
import styles from './ByName.module.css';

export default function ByName(props) {

    const gamesxPage = 15;
    const byName = useSelector(state => state.byName)
    const [state, setState] = useState(byName)
    const [games, setGames] = useState([...state].splice(0, gamesxPage));

    useEffect(()=>{
        setState(byName)
        setGames([...state].splice(0, gamesxPage))
    },[state,byName])


    
    //Paginacion:

    const [page, setPage] = useState(0);
    const allpages = Math.ceil(state.length  / 15)
    const nextHandler = () =>{
        const vGames = Math.ceil(state.length / 15)
        const nextPage = page + 1;
        const index = nextPage * gamesxPage;
        // console.log(allpages)
        if(page === vGames -1  ) return;
        setGames([...state].splice(index, gamesxPage))
        setPage(nextPage);
    }

    const prevHandler = () =>{
        const prevPage = page -1;
        if( prevPage < 0) return;
        const index = prevPage * gamesxPage;
        setGames([...state].splice(index, gamesxPage))
        setPage(prevPage)
    }


    return (
        <div className={styles.contentName}>
            <div className={styles.title}>

                <h1>Busqueda Por Nombre</h1>
            </div>
            <div className={styles.pagination}>
                {
                    !games.length ? (
                        <div >
                            <div className={styles.error}>
                                <h3>Introduce un nombre a buscar valido</h3>
                            </div>
                            <Loading />
                        </div>)

                        :

                        <Pagination
                            games={games}
                            prevHandler={prevHandler}
                            nextHandler={nextHandler}
                            page={page + 1}
                            allpages={allpages}

                        />


                }
            </div>
        </div>
    )
}
