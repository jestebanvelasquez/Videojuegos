import React from 'react'
import styles from './Loading.module.css';

export default function Loading() {
    return (
        <div className={styles.loadingContainer}>

            <div className={styles.loading}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.shadow}></div>
                <div className={styles.shadow}></div>
                <div className={styles.shadow}></div>
            </div>

        </div>
    )
}


