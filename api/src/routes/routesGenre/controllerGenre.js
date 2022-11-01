require('dotenv').config();
const { API_KEY } = process.env;
const {Op} = require('sequelize');
const axios = require('axios');
const { Genre} = require('../../db')


const getGenres = async () => {
    const genresDb = await Genre.findAll();
    if(!genresDb.length){
        const allGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        await Genre.bulkCreate(allGenres.data.results);
    }
}

module.exports = {
    getGenres,
}

