import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { clearstate, getDetailGame } from '../../redux/actions/root-actions'
import styles from './Detail.module.css';
import Loading from '../Loading/Loading'

export default function Detail() {
    const dispatch = useDispatch()
    const params = useParams()
    const detail = useSelector((state) => state.byId)
    console.log(detail)
    // const [state, setState] = useState(detail)
    
    useEffect(() => {
        // setState(detail)
        dispatch(getDetailGame(params.id))
        
        
    }, [dispatch, params])
    
    useEffect(() => {
        
        return () => {
            dispatch(clearstate('byId'))
        }
    },[dispatch])
    


    return (
        <div className={styles.containerDetail}>
            { !detail ? <Loading /> :

                <div>


                    <div className={styles.header}>
                        <h1> Detalle Del Videojuego</h1>
                    </div>

                    <div className={styles.head}>
                        <div className={styles.poster}>
                            <img src={detail.image} alt="logo" width='200px' height='250px' />
                        </div>

                        <div className={styles.content}>
                            <h2>{detail.name}</h2>
                            <span>Descripcion: </span>
                            <p> {detail.description}</p><br />
                            <span>Año de Lanzamiento: </span>
                            <h3>{detail.released}</h3>

                            <span>Puntuacion: </span>

                            <h3>{detail.rating}</h3>

                            <span>Plataformas Soportadas: </span>

                            <h3>{`${detail.platforms}`}</h3>

                            <span>Generos: </span>

                            <h3>{`${detail.genres}`}</h3>
                        </div>

                    </div>

                </div>
            }
        </div>
    )
}
