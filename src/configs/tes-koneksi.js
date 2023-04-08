let { sequelize } = require('./mysql-conn');

(async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
    await sequelize.close()
})()