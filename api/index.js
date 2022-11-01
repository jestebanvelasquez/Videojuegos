//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { getGenres } = require('./src/routes/routesGenre/controllerGenre')
const { getAllPlatforms } = require('./src/routes/routesPlatforms/controllerPlatforms');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
        getAllPlatforms()
        getGenres();
        server.listen(3002, () => {
            console.log('listening at 3002'); // eslint-disable-line no-console
        });
    })
    .catch(error => {
        console.log(error)
        return error
    })