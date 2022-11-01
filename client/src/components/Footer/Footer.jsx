import React from 'react'
import styles from './Footer.module.css';
import gmail from '../../assets/gmail.png'
import linkedin from '../../assets/linkedin.png'
import github from '../../assets/github.png'

export default function Footer() {


  

  
  return (
    <div className={styles.footer}>

      <h1>Creado Por Esteban Velasquez </h1>

      <div>
      <div className={styles.footerContent}>
        <img src={linkedin} alt="logo-linkedin" />
        <p>www.linkedin.com/in/esteban-velasquez-martinez</p>
      </div>

      <div className={styles.footerContent}>
        <img src={gmail} alt="logo-gmail" />
        <p>Jestebanvelasquez22@gmail.com</p>
      </div>


      <div className={styles.footerContent}>
        <img src={github} alt="logo-giithub" />
        <p>jestebanvelasquez</p>
      </div>

      </div>

    </div>
  )
}
