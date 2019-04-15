const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require('cors');

const app = express();

app.use(cors()); //define que qualquer endereço pode acessar essa aplicação
const server = require('http').Server(app);
const io = require('socket.io')(server);
//essas duas linhas fazem a variavel serve consguir "ouvir" requisições http e ws, mudando o listen para server
//mongoose é um tipo de orm para o mongo e node
//aqui estamos fazendo a conexão com o db no mongo atlas

io.on('connection', socket => {
  socket.on('connectRoom', box=>{
    socket.join(box);
    //cria salas com socket para cada usuario baseado no id da box que o mesmo esta usando
  })
});

mongoose.connect(
  "mongodb+srv://lincolntx:polivel22@cluster0-juhuh.mongodb.net/omnistack?retryWrites=true",
  { useNewUrlParser: true }
);
//serve para mostrar que qualquer rota era ter acesso ao io atraves do req
app.use((req,res, next) =>{
  req.io = io;
  return next();//passa para o restando das rotas
});
//ajuda o servidor a entender as requisições feistas em json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

//indicar o arquivo de rotas
app.use(require("./routes"));

server.listen(process.env.PORT || 3333);
