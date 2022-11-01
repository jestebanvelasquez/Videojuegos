import React from 'react'
import { useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteGameApi, deleteGameDB, getDetailGame} from '../../redux/actions/root-actions'
import style from './Game.module.css'
import Swal from "sweetalert2";


export default function Game(props) {
    const dispatch = useDispatch()


    // const update = () => { //probando update
    //     dispatch(getDetailGame(props.id))
    //     history.push('/home/create')
    // }



    




    const deleteGame = () => {
        console.log(props.createDB)
        let name = props.name.toUpperCase()
        if (props.createDB) {
            Swal.fire({
                title: ` Estas Seguro de Eliminar El  Videogame :  ${name} ?`,
                showDenyButton: true,
                // showCancelButton: true,
                confirmButtonText: 'delete',
                denyButtonText: `Don't delete`,
                background: '#1c1d1d',
                color:'#eae9e9',
                confirmButtonColor: '#feb202'
            }).then((result) => {

                if (result.isConfirmed) {
                dispatch(deleteGameDB(props.id))
                    Swal.fire(` Videogame ${name} Delete Date Base!`, '', 'success')
                } else if (result.isDenied) {
                    Swal.fire({timer: 0.1}) //(` Videogame ${props.name} Don't delete  Date Base!`, '', 'info')
                    
                }
            })

        } else {
            dispatch(deleteGameApi(props.id))
            Swal.fire({ //style alert! 
                title: ` Videogame ${props.name} Delete local Store!`,
                icon: 'success',
                confirmButtonText: 'Perfect!',
                background: '#1c1d1d',
                color:'#eae9e9',
                confirmButtonColor: '#feb202'
            })
        }
    }

    return (
        <div className={style.cardContainer} key={props.id} >
            <div className={style.card}>
                <img className={style.cardImage} src={props.image} alt="logo" />
                <div className={style.cardInfo}>
                    <Link to={`/home/detail/${props.id}`}>
                        <h1 className={style.title} >{props.name }  </h1>
                    </Link>
                        <span className={style.genres}>Generos :</span>
                    {
                        props.genres.map((el, i) =>{
                            return (
                                <span className={style.genres} key={i}> {el}</span>
                            )
                        })
                    }
                    {/* <div> //probando update!
                        {
                            props.createDB ?( 
                                <div>
                                    <button onClick={update}> editar juego </button>
                                </div> ) : null
                        }
                    </div> */}
                    <div className={style.containerBton}>
                        <button className={style.bton} onClick={deleteGame}> X </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
