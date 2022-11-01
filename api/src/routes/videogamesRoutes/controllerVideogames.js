const { Videogame, Genre, Platform } = require('../../db');
require('dotenv').config();
const { API_KEY } = process.env;
const { Op } = require('sequelize');
const axios = require('axios');


//------------------------------------metodo post: New-Game ---------------------------------
const postGame = async(name, description, released, rating, image, platforms, genres) => {
    name = name.trim().replace(/\s\s+/g, ' ')//quitar espacios delante del string y dobles
    const arrayVacio = (arr) => !Array.isArray(arr) || arr.length === 0// validador de array vacio
    
    const ifname = await Videogame.findAll({
        where:{
            name : name
        }
    }) 

/////////////////////////////////////// Validate ///////////////////////////////////////////Math.ceil(rating) >= 0 || Math.round(rating) > 5 ||

    if(ifname.length > 0){
        return {message: ` El Videojuego Con Nombre ${name} Ya Existe! `}
    }
    // else if (typeof rating !== 'number') {
    //     return {message: ` Validar que el ${rating} sea menor que 5, mayor que 1 y no sea de tipo string `}
    // }
    else if (description.length < 10 || description.length > 980){
    }else if(arrayVacio(platforms)) {
        return {message: ` La propiedad Platforms esta vacia `}
    }else if(arrayVacio(genres)) {
        return {message: ` La propiedad genres esta vacia `}
    }
    else{
        
        const newGame = await Videogame.create({
                name,
                description,
                released,
                rating,
                image,
                // platforms
            })
            // console.log(platforms)
            // await newGame.addPlatforms(platforms)
        await newGame.addPlatforms(platforms)
        await newGame.addGenres(genres)

        return {response:'succes', data:newGame} //'created!'

    }


}

//------------------------------------metodo get: All-Api ---------------------------------

const getApi = async() => {
    let allpages = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    let nextUrl = allpages.data.next
    let dataApi = [...allpages.data.results];
    let i = 1;
    while (i <= 5) {
        let api = await axios.get(nextUrl)
        dataApi.push(api.data.results)
        nextUrl = api.data.next
        i++
    }
    dataApi = dataApi.flat()

    dataApi = dataApi.map((game) => {

        return {
            id: game.id,
            name: game.name.toLowerCase(),
            slug: game.slug,
            image: game.background_image,
            rating: game.rating,
            platforms: game.platforms.map((el) => el.platform.name),
            genres: game.genres.map((el) => el.name),
            createDB: false
        };
    });

    // console.log(dataApi.data.createDB)
    return dataApi;
}

//------------------------------------metodo get: DataBase ---------------------------------

const getBb = async() => {
    try {
        const byDb = await Videogame.findAll({

            include: [{
                    model: Genre,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Platform,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            ]
        })

        const gamesDb = byDb.map(el => {
            return {
                id: el.id,
                name: el.name.toLowerCase(),
                image: el.image,
                rating: el.rating,
                platforms: el.Platforms.map(el => el.name),
                genres: el.Genres.map(el => el.name),
                createDB: el.createDB


            }
        })

        return gamesDb

    } catch (error) {
        return error
    }
}

//------------------------------------metodo get: Name ---------------------------------

const byNameDb = async(name) => {
    try {
        let dbName = await Videogame.findAll({
            where: {
                name: {
                    // [Op.substring]:name,
                    [Op.iLike]: `%${name}%`
                },
            },
            include: [{
                    model: Genre,
                    through: { attributes: [] },

                },
                {
                    model: Platform,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            ],
        })

        const gamesDb = dbName.map(el => {
            return {
                id: el.id,
                name: el.name,
                image: el.image,
                rating: el.rating,
                platforms: el.Platforms.map(el => el.name),
                genres: el.Genres.map(el => el.name),
                createDB: el.createDB

            }
        })


        return gamesDb;
    } catch (error) {
        return error
    }
}

const byNameApi = async(name) => {
    // const element = name.toLowerCase;
    try {
        const apiAll = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`)

        const apiName = apiAll.data.results.map((game) => {
            return {
                id: game.id,
                name: game.name,
                slug: game.slug,
                image: game.background_image,
                rating: game.rating,
                genres: game.genres.map(el => el.name),
                createDB: false

            }
        })

        return apiName;

    } catch (error) {
        return 'no hay datos con ese nombre'
    }

}

const getByName = async(name) => {
    try {
        let api = await byNameApi(name);
        let dataBase = await byNameDb(name);
        if (api) return dataBase.concat(api)

    } catch (error) {
        return error
    }
}

//------------------------------------metodo get: ID ---------------------------------

const getId = async(id) => {
    // console.log(id.length)
    try {
        if (id.length === 36) {

            let idBd = await Videogame.findByPk(id, {
                include: [{
                        model: Genre,
                        through: { attributes: [] },

                    },
                    {
                        model: Platform,
                        attributes: ['name'],
                        through: {
                            attributes: []
                        }
                    }
                ]
            })
            idBd = {
                id: idBd.id,
                name: idBd.name,
                image: idBd.image,
                released: idBd.released,
                rating: idBd.rating,
                description: idBd.description,
                platforms: idBd.Platforms.map(el => el.name),
                genres: idBd.Genres.map(el => el.name),
                createDB: idBd.createDB


            }

            // console.log(idBd)
            return idBd;

        } else {
            let idApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
                // console.log(idApi)
            idApi = {
                id: idApi.data.id,
                name: idApi.data.name,
                image: idApi.data.background_image,
                description: idApi.data.description_raw,
                rating: idApi.data.rating,
                released: idApi.data.released,
                genres: idApi.data.genres.map(el => el.name),
                platforms: idApi.data.platforms.map(el => el.platform.name),
                createDB: false

            }

            return idApi;

        }

    } catch (error) {
        return error
    }

}

const ordenRating = async (num) => {
    try {
        const byIdApi = await getApi()
        const byIdBD = await getBb()
        let  allGames = [byIdBD,...byIdApi]
        
        
        ratingMenor = allGames.filter( el => el.rating < num)
        ratingMayor = allGames.filter(el => el.rating > num)
        if(ratingMenor.length > 1){
            return { response: 'ratingMenor', data: ratingMenor}
        }else if (ratingMayor.length > 1 ){
            return {response: 'ratingMayor', data: ratingMayor}
        }else {
            return {message: 'no se encontraron ratings menores o mayores al numero pasado '}
        }

        

    } catch (error) {
        
    }
}











//probando expressValidator:


// const createItem = async (req, res) => {
//     try {
//         const {name, age, email} = req.body
//         const resDetail = await Videogame.create({
//             name, age, email
//         })
//         res.send({data:resDetail})
//     } catch (error) {
//         next(error)
//     }
// }






const deleteGameBD = async(id) => {
    try {
        await Videogame.destroy({
            where: { id }
        })
        const newdB = await getBb()
        return newdB

    } catch (error) {
        return error
    }
}


module.exports = {
    getApi,
    getBb,
    getByName,
    getId,
    postGame,
    byNameDb,
    byNameApi,
    deleteGameBD,
    
    // createItem

}

// //-------------------------------- Put/:id = http://localhost:3002/videogames/ --------------------------------//

// router.put('/:idDog', async (req, res, next) => {
//     const idDog = req.params.idDog;

//     const { name, description, released, rating, image, platforms, genres } = req.body
//     try {
//         let game = await   Videogame.update({
//             name,
// description,
// released,
// rating,
// image,
//         }, {
    //             where: {
        //                 id: id
        //             }
        //         })
        
        //         res.status(200).json({ data: game })
        
        //     } catch (error) {
            //         next(error);
            //     }
            // })
            
            // //-------------------------------- Delete/:id = http://localhost:3002/dogs/idDb --------------------------------//
            
            // router.delete('/:id', async (req, res, next) => {
                //     const id = req.params.id
                //     try {
                    //         await Dog.destroy({
                        //             where: { id }
                        //         })
                        //         res.status(204).json({ data: 'ok' })
                        
                        //     } catch (error) {
                            //         next(error)
                            //     }
                            // })



