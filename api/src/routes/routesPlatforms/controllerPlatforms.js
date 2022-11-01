const {Platform} = require('../../db');

const  {
    getApi,
}  = require("../videogamesRoutes/controllerVideogames");

const getAllPlatforms = async () =>{
    try {
        const allPlatforms = await Platform.findAll()
        if(!allPlatforms.length) {
            let platforms = await getApi()
            platforms = platforms.map(el => el.platforms).flat()
            platforms = [...new Set(platforms.sort())]
            platforms = platforms.map(el => {return {name : el}})

            await Platform.bulkCreate(platforms)

        }

    } catch (error) {
        return error
    }
}



module.exports = {
    getAllPlatforms,
}