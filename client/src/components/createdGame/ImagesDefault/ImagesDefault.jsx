import React,{useState} from 'react'
import imagesDefault from './images.js'
import styles from './Images.module.css';

export default function ImagesDefault(props) {

    const [images, setImages] = useState(imagesDefault)

  return (
    <div className={styles.containerImg}> 
        {images ? images.map(el => {
                    return (
                        <input
                          className= {styles.img}
                            type='image'
                            id='image'
                            name='image'
                            value={el}
                            src={el} 
                            alt="default"  
                            width='200px' 
                            height='250px'
                            onClick={props.handleChange}
                        />
                    )
                }) : null
                }
    </div>
  )
}
