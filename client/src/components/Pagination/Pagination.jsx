import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Game from '../Game/Game.jsx';
import style from './Pagination.module.css'
import {ReactComponent as PageNext} from '../../assets/icons/pagenext.svg'
import {ReactComponent as PagePrev} from '../../assets/icons/pageprev.svg'
import Loading from '../Loading/Loading.jsx';
import { getDetailGame } from '../../redux/actions/root-actions.js';





export default function Pagination(props) {
// console.log(games)
  // let numbers = []
  // let i = 1;
  // while (i < allpages) {
  //     numbers.push(i)
  // }
  // console.log(numbers)
    

  
  return (
    <div className={style.pagination} >
      
        <div className={style.container}>
          <div className={style.title}>
            <span > Pagina Actual: <br /> {props.page} </span>
            <span > Total Paginas: <br />{props.allpages} </span>
          </div>
          <div className={style.controller}>
            <button onClick={props.prevHandler} className={`${style.btn} ${style.left}` }> <PagePrev/> </button>
            <button onClick={props.nextHandler} className={`${style.btn} ${style.rigth}` }>  <PageNext/> </button>
          </div>
        </div>

        <div className={style.gameContainer} key={props.games.id}>
        


        {/* <Loading/> */}

          {
          !props.games.length ?  <Loading/>   : props.games.map(game => {

            
            return (
              <div className={style.game} key={game.id}>
                <Game
                  id={game.id}
                  image={game.image}
                  name={game.name}
                  genres={game.genres ? game.genres.map(el => el) : null}
                  platforms= {game.platforms ? game.platforms.map(el => el ) : null}
                  createDB = {game.createDB}
                />

              </div>
          )})
          }
        </div>
    </div>
  )
}
