import React, { useState, useEffect } from 'react'
import allImages from './slider'
import style from './Header.module.css'
import {ReactComponent as ArrowRigth} from '../../../assets/icons/right.svg'
import {ReactComponent as ArrowLeft} from '../../../assets/icons/left.svg'
import Loading from '../../Loading/Loading'


export default function Header(props) {

    const [state, setState] = useState({
        images : allImages,
        totalImg: allImages.length-1,
        img: allImages[0],
        position: 1, 
    })

    const next = () => {
        console.log(state)
        if(state.position < state.totalImg){
        console.log(allImages,'hola')
        console.log(state.images)

            setState({
                ...state,
                img: state.images[state.position],
                position: state.position + 1,
                
            })
            
        }else if (state.position === state.totalImg){// aqui return para la paginacion
            console.log(2)
            setState({
                ...state,
                img: state.images[0],
                position: 1
            })
        }
    }

    const prev = () =>{
        if(state.position > 1 ){
            setState({
                ...state,
                img: state.images[state.position],
                position: state.position - 1,
            })
        }else if (state.position === 1){// aqui return para la paginacion
            setState({
                ...state,
                img: state.images[state.totalImg],
                position: state.totalImg
            })
        }
    }

    return (
        <div className={style.container}  >
        {
                !state ? <Loading/>  :
            <div className={style.slideShow}>
                <div className= {style.slide} key = {state.position}>
                    <img src= {state.img ? state.img : 'logo'  } alt='logo'/>
                </div>
                    
                <div className={style.textSlide}>
                    <h1> {props.title}</h1>
                </div> 
                <span>{state.position}</span>
                <div className={style.controller}>
                    <button className={`${style.btn} ${style.left}` } onClick={prev}> <ArrowLeft /> </button>
                    <button className={`${style.btn} ${style.rigth}`} onClick={next}> <ArrowRigth /> </button>
                </div>
            </div>
        }
        </div>
    )
}

