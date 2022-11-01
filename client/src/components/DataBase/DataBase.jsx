import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataBase } from '../../redux/actions/root-actions';
import Game from '../Game/Game';
import styles from './DataBase.module.css';




export default function DataBase() {
  const dispatch = useDispatch();
  const dataBase = useSelector((state) => state.byDataBase);

  useEffect(() => {
      dispatch(getDataBase())
      return () =>{

      }
  },[])
  

    console.log(dataBase)

  return (
    <div className={styles.containerDb}>
      <div className={styles.title}>
        <h1>Videojuegos Creados</h1>

      </div>

      <div className={styles.containerDataBase}>
        {
          dataBase.map(game => {
            return (
              <div key={game.id} className={styles.game}>
                <Game
                  id={game.id}
                  image={game.image}
                  name={game.name}
                  genres={game.genres}
                  platforms={game.platforms}
                  createDB={game.createDB}
                />

              </div>
            )
          })
        }
      </div>
    </div>
  )
}
