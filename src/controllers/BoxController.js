const Box = require("../models/Box");

class BoxController {
  async store(req, res) {
    const box = await Box.create(req.body);
    return res.json(box);
  }

  async show(req, res) {
    const box = await Box.findById(req.params.id).populate({
      path: "files",
      options: { sort: { createdAt: -1 } }
    });
    //.populate serve para indicar um relacionamento.
    //path indica o parametro eh o nome da tabela que ira relacionar
    //sort indica a forma de ordenar e o parametro de ordem
    //sendo ordenado de data de criacao e -1 indica q eh ordem decrescente
    //dessa forma a resposata indica todos os dados no file e nao so o id

    return res.json(box);
  }
}
//new serve para retorna a instacia de uma classe
//permitindo acesso as metodos dessa classe
module.exports = new BoxController();
