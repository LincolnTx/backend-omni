const express = require("express");
const multer = require("multer");
const multerConfig = require("./config/multer");
const routes = express.Router();

const BoxController = require("./controllers/BoxController");
const FileController = require("./controllers/FileController");

routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);
routes.post(
  "/boxes/:id/files",
  multer(multerConfig).single("file"), //single indica que so pode ser upado um arquivo por vz e o nome do campo que o client deve usar
  FileController.store
);

module.exports = routes;
