const express = require('express'); 
const bodyParser = require('body-parser'); 
const routes = require('./routes'); 
const { Pool } = require('pg'); 


const app = express(); 
const port = 3000; 

app.use(bodyParser.json()); 
app.use(
    bodyParser.urlencoded({
        extended: true
    })
); 

app.get('/', (request, response) => {
    response.json({ info: "Tudo certo!" });
}); 

app.get('/users', routes.getUsers); 
app.get('/users/:id', routes.getUserById); // localhost:port/users/id
app.post('/users', routes.createUser);
app.put('/users/:id', routes.updateUser); 
app.delete('/users/:id', routes.deleteUser); 

app.listen(port, () => {
    console.log('API rodando')
}); 