const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname +'/data.db'
})

const Todos = db.define('todo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    title: {
        type: Sequelize.STRING(100),
        allowNull: false
    },

    description: {
        type: Sequelize.STRING(100),
    },

    due:{
        type : Sequelize.DATE,
        allowNull: false
    },

    priority: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    // notes: {
    //     type: Sequelize.ARRAY(Sequelize.TEXT)
    // }
})

module.exports = {
    db, Todos
}