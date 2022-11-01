const { Router } = require('express');
const {validateCreate} = require ('../../expressValidator/VideoGame')

const router = Router();
const {
    getApi,
    getBb,
    postGame,
    getByName,
    byNameApi,
    byNameDb,
    getId,
    deleteGameBD

} = require("./controllerVideogames");


//----------------------------- Post: http://localhost:3002/videogames----------------------------

router.post('/', async(req, res, next) => {
    try {
        
        const { name, description, released, rating, image, platforms, genres } = req.body;
        
        const newGame = await postGame(name, description, released, rating, image, platforms, genres)
        if(newGame.response === 'succes'){
            res.status(200).json({ data:newGame.data , succes: ` El Videojuego ${name} Creado Correctamente ` });
        }else{

            res.status(400).json({message:newGame.message})
        }


        
        
    } catch (error) {
        // console.log(error)
        next(error)
        //  return error.message
    }
})

//----------------------------- Gets : http://localhost:3002/videogames----------------------------

router.get('/', async(req, res, next) => {
    try {

        const apiGames = await getApi();
        const dbGames = await getBb();
        // const allGames = [...dbGames, ...apiGames]

        res.status(200).json({ dataBd:dbGames,dataApi: apiGames })

    } catch (error) {
        next(error)
    }
})

//----------------------------- http://localhost:3001/videogames/database ----------------------------

router.get('/database', async(req, res, next) => {
    try {
        const allDb = await getBb()
        res.status(200).json({ data: allDb })
    } catch (error) {
        next(error)
    }
})

//---------------------------------http://localhost:3001/videogames/name?name=grand-theft-auto-v---------------

router.get('/name', async(req, res, next) => {
    try {
        const { name } = req.query;

        const byName = await getByName(name);
        res.status(200).json({ data: byName })

    } catch (error) {
        next(error)
    }
})

//-----------------------------http://localhost:3001/videogames/3498----------------------------

router.get('/:id', async(req, res, next) => {
    try {
        const { id } = req.params;
        const byId = await getId(id)
        res.status(200).json({ data: byId })
    } catch (error) {
        next(error)
    }
})






//------------------------------ Delete: http://localhost:3001/videogames -------------------------------------------//

router.delete('/:id', async ( req, res, next) => {
    const {id} = req.params
    try {
        const results = await deleteGameBD(id)
        res.status(200).json({data:results})
    } catch (error) {
        next(error)
    }
})



module.exports = router;