const { generateKey } = require('crypto');
const {Router} = require('express');
const router = Router();
const {getGenres} = require('./controllerGenre');
const {Genre} = require('../../db');


router.get('/', async (req, res, next) => {
    const allGenres = await Genre.findAll();

    res.status(200).json({data:allGenres});
})

module.exports = router;

