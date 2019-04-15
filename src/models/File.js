const mongoose = require("mongoose");

const File = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true, //faz com que esxistam os campos createdAt e updatedAt em cada registro da tabela
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

//campo virtual para retornar url de acesso pra o client
File.virtual("url").get(function() {
  // nao pode usar arrow function para poder acessar o this
  return `http://localhost:3333/files/${encodeURIComponent(this.path)}`;
});

//cria um model chamado box e exporta esse modulo File
module.exports = mongoose.model("File", File);
