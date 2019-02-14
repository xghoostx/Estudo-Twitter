const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);// Serve para extrair o servidor criador pelo express
const io = require('socket.io')(server); // e necessario para que o servidor entendar tambem o protocolo WS do web socket, dessa forma ele entende as requisicoes real-time


mongoose.connect('mongodb://admin:admin123@ds121455.mlab.com:21455/twitter-clone-xghoostx',
{
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io; // aqui damos acesso ao 'io' atraves do req, sendo possivel acessar de outros lugares da aplicacao
    return next(); // informa que pode ir ao proximo passo , que nesse caso sera a tratativa da rota
});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(3000, ()=>{
    console.log(' Server started on port 3000 ');
});