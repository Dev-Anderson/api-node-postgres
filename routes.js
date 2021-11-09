//acessando o banco de dados
const Pool = require('pg').Pool; 
const pool = new Pool({
    user: 'postgres', 
    host: 'localhost', 
    database: 'api', 
    password: 'postgres', 
    port: 5432
}); 

//Consulta todos os usuários do banco
const getUsers = (request, response) => {
    pool.query('select * from users order by id asc', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows); 
    }); 
}; 

//Consultando um usuário
const getUserById = (request, response) => {
    const id = parseInt(request.params.id); 

    pool.query('select * from users where id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows); 
    }); 
}; 

//Criando um usuário
const createUser = (request, response) => {
    const { name, email } = request.body; 

    pool.query('insert into users (name, email) values($1, $2)', [name, email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Usuário criado com sucesso.`); 
    }); 
}; 

//Alterando um usuário 
const updateUser = (request, response) => {
    const id = parseInt(request.params.id); 
    const { name, email } = request.body; 

    pool.query('update users set name = $1, email = $2 where id = $3', [name, email, id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Usuário modificado com sucesso, id: ${id}`); 
    }); 
}; 

//Deletando um usuário
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id); 

    pool.query('delete from users where id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Usuário deletado com sucesso, id: ${id}`); 
    }); 
}; 

module.exports = {
    getUsers, getUserById, createUser, updateUser, deleteUser, 
}