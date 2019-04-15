const multer = require("multer");
const path = require("path");
const crypto = require("crypto"); //serve para gerar hashs
module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp"), //destino dos arquivos
  storage: multer.diskStorage({
    //disksotore indica que os arquivos seram salvo no disco
    destination: (req, fil, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);
        //file.key recebe um hash aleatorio de 16 bytes-nomeoriginal do arquivo
        //evitando assim que arquivos com nomes iguais sejam sobreescritos
        file.key = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, file.key);
      });
    }
  })
};
