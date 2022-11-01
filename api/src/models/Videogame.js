const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Videogame', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        released: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            get() {
                //const rawValue = this.getDataValue() //.toLocaleString({ timeZone: 'UTC' });
                return this.getDataValue('released').toLocaleString({ timeZone: 'UTC' })
            }
        },
        rating: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        createDB: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: false,

    });
};