import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getAllGenres, getAllPlatforms, byAllPlatf, getAllGames } from '../../redux/actions/root-actions';
import Preview from './Preview/Preview.jsx';
import Filter from '../Filter/Filter';
import Formulario from './Formulario/Formulario';
import { Validate } from './Formulario/Validate';
import ImagesDefault from './ImagesDefault/ImagesDefault';
import img from '../../assets/image1.png'
import { useHistory } from 'react-router-dom';
import styles from './Create.module.css'
import keanu from '../../assets/headers/keanu.jpg'
import Swal from "sweetalert2";

export default function Create() {
    const dispatch = useDispatch()
    const history = useHistory();

    useEffect(() => {
        dispatch(getAllPlatforms())
        dispatch(getAllGames())
        dispatch(getAllGenres())
        dispatch(byAllPlatf())
    },[ dispatch ])

    // const byUpdate = useSelector(state => state.byId) // probando el Update 
    // const [update, setUpdate] = useState(byUpdate)

    //------------Filter----------------------
    // const dispatch = useDispatch()
    const allGenres = useSelector(state => state.allGenres);
    const allPlatforms = useSelector(state => state.allPlatforms)
    const [filterBy, setFilterby] = useState(allPlatforms) 
    const [state, setState] = useState(allGenres);

    
    //------------State----------------------
    
    // let create = {// tartando de crear el update
    //         name: '',
    //         description: '',
    //         released: '',
    //         rating: 0,
    //         image: `${img}`,
    //         platforms: [],
    //         platformsName: [],
    //         genres: [],
    //         genresName: []
    //     }
    
    //      if (byUpdate.createDB = true ) {//pensarlo como todo un estado!!
    //         const [input, setInput] = useState(byUpdate)
    
    //     }  else{
        //         const [input, setInput] = useState(
            //             {
                //         name: '',
                //         description: '',
                //         released: '',
                //         rating: 0,
                //         image: `${img}`,
                //         platforms: [],
                //         platformsName: [],
                //         genres: [],
                //         genresName: []
                //     }
                //         )
                //     } 
                
                
                
    const [input, setInput] = useState({
        name: '',
        description: '',
        released: '',
        rating: 0,
        image: `${img}`,
        platforms: [],
        platformsName: [],
        genres: [],
        genresName: []
    })
    
    useEffect(() => {
        setState(allGenres)
        setFilterby(allPlatforms)
        // if ( update.createBD === true ){
        //     setInput(byUpdate)
        // }
        // setInput(input)

    }, [allGenres, allPlatforms, input])

//-------------------------------------------- State Errors -----------------------------//

    const [errors, setErrors] = useState({
        name: 'name is required',

    })

//-------------------------------------------- Changes ---------------------------------//

    const handleChange = (e) => {
        
        setInput({
            ...input,
            [e.target.name]: e.target.value.toLowerCase()
        })
        let errorsResult = Validate({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(errorsResult)
    }
    const handleRange = (e) => {
        setInput({
            ...input,
            rating : e.target.value
        })
        let errorsResult = Validate({
            ...input,
            rating: e.target.value
        })
        setErrors(errorsResult)
    }

    const onChangefilterby = (e) => {
        console.log(e)
        console.log(e.id)
        console.log(e.value)

        setInput(() => {

            let platformsId = [...input.platforms, e.id] 
                platformsId = [...new Set(platformsId)]
            let platformsfilterName = [...input.platformsName, e.value ]
                platformsfilterName = [...new Set(platformsfilterName)]
            return {
                    ...input,
                    platforms : [...platformsId],
                    platformsName : [...platformsfilterName]
            }
        })
        let errorsResult = Validate({
            ...input,
            platforms:[ e.value],
        })
        setErrors(errorsResult)
    }

    const onChangeGenres = (e) => {
        setInput(() => {
            let genresId = [...input.genres, e.id] 
                genresId = [...new Set(genresId)]
            let genresFilterName = [...input.genresName, e.value]
                genresFilterName = [...new Set(genresFilterName)]
                return {
                    ...input,
                    genres: [...genresId],
                    genresName : [...genresFilterName ]
                }
        })
        let errorsResult = Validate({
            ...input,
            genres: [e.value]
        })
        setErrors(errorsResult)
    }

/////////////////////////////////////////-- resets: --/////////////////////////////////////////////////////////////

    const resetGenres = () => {
        setInput({
            ...input,
            genres: [],
            genresName:[]
        }) 
        let errorsResult = Validate({
            ...input,
            genres: undefined
        })
        setErrors(errorsResult)
    }

    const resetPlatforms = () => {
        setInput({
            ...input,
            platforms: [],
            platformsName:[],
        })
        let errorsResult = Validate({
            ...input,
            platforms: undefined
        })
        setErrors(errorsResult)
    }

    const reset = () => {
        setInput({
            name: '',
            description: '',
            released: '',
            rating: 0,
            image: `${img}`,
            platforms: [],
            platformsName:[],
            genres: [],
            genresName:[]
        })
    }

//------------------------------  Enviar info!!  -----------------------------------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const data = {...input}
        try {
        
            //const response = 
            await axios({
                url: 'https://videojuegos-production.up.railway.app/videogames',
                method: 'POST',
                data
            })

            Swal.fire({ 
                position: 'center',
                icon: 'success',
                title: `El Videojuego ${input.name} Creado correctamente`,
                showConfirmButton: false,
                timer: 1500
            })
            reset()
            history.push('/home/database')
        } catch (error) {
            Swal.fire(error.response.data.message)
        }
        
    }
    

    
    return (
        
// {/*/////////////////////////////////----------- presentation -----------///////////////////////////////////////////////*/}

        <div>
            <div className={styles.title}>
            {/* update.createBD = true ? 'modifica tu videojuego' :  */} 
                <h1> crea tu videogame  </h1>
            </div>
                <section className={styles.firstImage} >
                    <img src={keanu} alt=" logo" />
                </section>

{/*/////////////////////////////////----------- Previsual -----------///////////////////////////////////////////////*/}

            <div className={styles.containerCreate}>
                <div className={styles.preview}>
                    <div className={styles.filters}>
                        <div key={input.id}   >
                            <Preview
                                id={input.id}
                                input={input}
                                resetGenres={resetGenres}
                                resetPlatforms={resetPlatforms}
                                reset={reset}
                            />
                        </div>
                    </div>
                </div>

{/*/////////////////////////////////----------- images default -----------///////////////////////////////////////////////*/}
                <div className={styles.contentForm}>

                    <div className={styles.contentImages}>
                        <p className={styles.imagestitle} htmlFor="released"> Imagenes Predefinidas:</p>
                        <ImagesDefault handleChange={handleChange} />
                    </div>

{/*/////////////////////////////////----------- Formulario -----------///////////////////////////////////////////////*/}

                    <div>
                        <Formulario input={input} errors={errors} handleChange={handleChange} handleSubmit={handleSubmit} handleRange={handleRange} />
                    </div>
                </div>
            </div>
{/*/////////////////////////////////----------- selects -----------///////////////////////////////////////////////*/}

            <div className={styles.filters}>
                <div className={styles.filterstitle}>
                    <h3> Agrega Las Plataformas:</h3>
                    <Filter
                        filterBy={filterBy}
                        onChangefilterby={onChangefilterby}
                    />
                    {errors && errors.platforms ? <span className={styles.danger}> {errors.platforms} </span> : null}

                </div>
                <div className={styles.filterstitle}>
                    <h3> Agrega Los Generos:</h3>
                    <Filter
                        filterBy={state}
                        onChangefilterby={onChangeGenres}
                    />

                    {errors && errors.genres ? <span className={styles.danger}> {errors.genres} </span> : null}
                </div>

            </div>

        </div>
    )
}