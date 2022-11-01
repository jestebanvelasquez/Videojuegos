import axios from 'axios'
import {
    GET_VIDEO_GAMES,
    GET_GENRES,
    GET_BY_NAME,
    GET_PLATFORMS,
    GET_BY_ID,
    GET_DATA_BASE,
    BY_FILTER,
    BY_GENRE,
    BY_ALL_PLATF,
    DELETE_GAME_DB,
    DELETE_GAME_API,

    RESET_STATE,
    ERRORS
} from './action-types'

export const getAllGames = () => dispatch =>{
    
    return fetch('https://videojuegos-production.up.railway.app/')
                .then(r => r.json())
                .then(json =>{
                    console.log(json)
                    dispatch({
                        type:GET_VIDEO_GAMES,
                        payload:json
                    })
                })
                .catch(error => {
                    dispatch({
                        type: ERRORS,
                        payload: error
                    })
                })
}

export const getAllGenres = () => dispatch =>{
    
    return fetch('https://videojuegos-production.up.railway.app/genres')
                .then(r => r.json())
                .then(json =>{
                    dispatch({
                        type:GET_GENRES,
                        payload:json.data
                    })
                })
                .catch(error => {
                    dispatch({
                        type: ERRORS,
                        payload: error
                    })
                })
}

export const getAllPlatforms = () => dispatch => {
    return fetch('https://videojuegos-production.up.railway.app/platforms')
                .then(r => r.json())
                .then(json => {
                    dispatch({
                        type: GET_PLATFORMS,
                        payload: json.data
                    })
                })
                .catch(error => {
                    dispatch({
                        type: ERRORS,
                        payload: error
                    })
                })
}

export const getByName = (name) => dispatch =>{
    
    return fetch(`https://videojuegos-production.up.railway.app/name?name=${name}`)
                .then(r => r.json())
                .then(json =>{
                    dispatch({
                        type:  GET_BY_NAME,
                        payload:json.data
                    })
                })
                .catch(error =>{
                    //setear el error en un estado de redux!!
                    dispatch({
                        type: ERRORS,
                        payload:error
                    })
                })
}

export const getDetailGame = (id) => dispatch => {

    return fetch(`https://videojuegos-production.up.railway.app/${id}`)
                .then(r => r.json())
                .then(json => {
                    dispatch({
                        type: GET_BY_ID,
                        payload: json.data
                    })
                })
                .catch(error => {
                    dispatch({
                        type: ERRORS,
                        payload: error
                    })
                })
}

export const getDataBase = (id) => dispatch => {
    return fetch(`https://videojuegos-production.up.railway.app/database`)
                .then(r => r.json())
                .then(json => {
                    dispatch({
                        type: GET_DATA_BASE,
                        payload: json.data
                    })
                })
                .catch(error => {
                    dispatch({
                        type: ERRORS,
                        payload: error
                    })
                })
}

export const deleteGameDB = (id) => dispatch => {
    return axios.delete(`https://videojuegos-production.up.railway.app/${id}`)
                .then(json => {
                    dispatch({
                        type: DELETE_GAME_DB,
                        payload: json.data.data
                    })
                })
                .catch(error => {
                    dispatch({
                        type: ERRORS,
                        payload: error
                    })
                })
}


///--------------------------------------------- Local Actions  ---------------------------------------------------------------/// 


export const byFilter = (payload) => dispatch =>{
        dispatch({
            type: BY_FILTER,
            payload: payload
        })
}

export const byGenre = (payload) => dispatch =>{
        dispatch({
            type: BY_GENRE,
            payload: payload
        })
}

export const byAllPlatf = () => dispatch =>{
        dispatch({
            type: BY_ALL_PLATF,
            payload: 'BY_ALL_PLATF'
        })
}

export const deleteGameApi = (id) => dispatch =>{
        dispatch({
            type: DELETE_GAME_API,
            payload: id
        })
}

export const clearstate = (state) => dispatch =>{
    dispatch({
        type: RESET_STATE,
        payload: state
    })
} 







