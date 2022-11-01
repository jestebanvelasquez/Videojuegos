import React,{ useEffect, useState} from 'react';
import Pagination from '../Pagination/Pagination';


export default function VideoGames({dataGames}) {
    const gamesxPage = 15;
    const [state, setState] = useState(dataGames);
    const [games, setGames] = useState([...state].splice(0, gamesxPage));
    const [page, setPage] = useState(0);
    
    useEffect(()=>{
        setState(dataGames)
        setGames([...state].splice(0, gamesxPage))
        setPage(0)
    },[dataGames, state,])

    // Paginacion:

    const totalPages = Math.ceil(state.length  / 15)
    const nextHandler = () =>{
        const vGames = Math.ceil(state.length / 15)
        const nextPage = page + 1;
        const index = nextPage * gamesxPage;
        if(page === vGames -1  ) return;
        setGames([...state].splice(index, gamesxPage))
        setPage(nextPage);
    }

    const prevHandler = () =>{
        const prevPage = page-1 // -1; 3 -1 =  2 //gamesactual = 45
        if( prevPage < 0) return;
        const index = prevPage * gamesxPage; //2 * 15 = 30
        setGames([...state].splice(index, gamesxPage))
        setPage(prevPage)
    }

    return (
        <div>
            <Pagination 
                games={games}  
                prevHandler={prevHandler} 
                nextHandler={nextHandler} 
                page={page+1} 
                allpages={totalPages}  
            />
        </div>
    ) 
}
