const mongoose = require("mongoose");

const Box = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    //indica que files eh um array do tipo file
    //e que sera aramazenado os ids dos files que que seram salvos na Box
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }]
  },
  {
    timestamps: true //faz com que esxistam os campos createdAt e updatedAt em cada registro da tabela
  }
);

//cria um model chamado box e exporta esse modulo Box
module.exports = mongoose.model("Box", Box);
