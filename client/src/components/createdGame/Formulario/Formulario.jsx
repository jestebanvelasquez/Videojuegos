import React, { useEffect, useState } from 'react'
import styles from './formhenry.module.css';

export default function Formulario({handleSubmit, input, errors, handleChange, handleRange }) {

    




    return (
        <div className={styles.form} >

            <form onSubmit={(e) => handleSubmit(e)} className={styles.formContainer}>


                {/* ---------------------- inputs ---------------------- */}

                {/* ---------------------------------- images entry ----------------------------------------------*/}

                <div>
                    <p>Agrega La Url De La Imagen</p>
                    <input
                        className={styles.contentInput}
                        placeholder='inserta la url de la imagen....'
                        type='text'
                        name='image'
                        value={input.image}
                        onChange={(e) => handleChange(e)}
                    />
                    {errors && errors.image ? <span className={styles.danger}> {errors.image} </span> : null}
                </div>


                <div>
                    <p htmlFor="name">Nombre del Juego </p>
                    <input
                        className={styles.contentInput}
                        placeholder=' escribe el nombre del juego...'
                        type="text"
                        name='name'
                        value={input.name}
                        onChange={handleChange}
                    />
                    {errors && errors.name ? <span className={styles.danger}> {errors.name} </span> : null}
                </div>

                <div>
                    <p htmlFor="description"> Descripción:</p>
                    <textarea
                        placeholder=' su descripción  ....'
                        className={styles.contentArea}
                        name='description'
                        value={input.description}
                        onChange={handleChange}
                    />
                    {errors && errors.description ? <span className={styles.danger}> {errors.description} </span> : null}
                </div>

                <div>
                    <p htmlFor="released"> Fecha de Creacion:</p>
                    <input
                        className={styles.contentInput}
                        type="date"
                        name='released'
                        value={input.released}
                        onChange={handleChange}
                    />
                    {errors && errors.released ? <span className={styles.danger}> {errors.released} </span> : null}

                </div>

                <div>
                    <p htmlFor="rating"> Puntuacion (de 1 a 5):</p>
                    <input
                        className={styles.contentInput}
                        type="range" 
                        min="1" 
                        max="5" 
                        step="0.1" 
                        onChange={ handleRange}
                    />
                    {errors && errors.rating ? <span className={styles.danger}> {errors.rating} </span> : null}
                </div>

                <div className={styles.containerBton}>
                    <button 
                        className={styles.bton}
                        type='submit'
                        disabled={Object.keys(errors).length === 0 ? false : true}
                         >¡Crearlo!</button> 
                </div>
            </form>

        </div>
    )
}
