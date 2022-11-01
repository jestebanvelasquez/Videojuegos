import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getByName } from '../../../redux/actions/root-actions';
import search from './Search.module.css';
import Swal from "sweetalert2";




export default function SearchBar() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [state, setState] = useState('');
    
   



    const handleChange = (e) =>{
      setState(e.target.value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!state.length ){
      Swal.fire('Ingresa un Nombre de Busqueda')
    }else {
      dispatch(getByName(state))
      setState('')//validar caracteres raros
      history.push('/home/name')
    }
  }
  /// recordar validarlo!!!!
  
  
  return (
    <div className={search.container}>
      
      <form
        className={search.contentForm}
        onSubmit={(e) => handleSubmit(e)}>
        <div className={search.contentInput}>
        <input
          type='text'
          placeholder='search game...'
          value={state}
          onChange={(e) => handleChange(e)}
        />

        </div>
        <div className={search.containerBton}>

        <button className={search.bton} >Search To Game </button>
        </div>
      </form>
    </div>
  )
}
