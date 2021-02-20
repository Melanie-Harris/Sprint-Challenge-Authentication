const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development)

module.exports = {
    findUser, // get full list of users
    findBy, //login - finds specific user
    addUser,  //create a new user
}

function findUser() {
    return db('users')

} //get full list of created users (restricted)


function findBy(body) {
    return db('users').where(body)
} //login


function addUser(users) {
    return db('users')
        .insert(users)
        .then(ids => ({
            id: ids[0]
        }))
} //create user

