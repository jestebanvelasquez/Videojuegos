const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const Videogames = require('./videogamesRoutes/videogamesRoutes.js')
const Genres = require('./routesGenre/genreRoutes.js');
const Platforms  = require('./routesPlatforms/routesPlatforms.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', Videogames)
router.use('/genres', Genres)
router.use('/platforms', Platforms)


module.exports = router;
