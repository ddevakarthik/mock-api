var express = require("express");
var upload = require("./upload");

var app = express();

app.options("/upload_file", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization");
  res.sendStatus(204);
});

app.get("/download", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Expose-Headers", "Content-Disposition");
  res.download(
    "dummy.pdf",
    `${Math.floor(Math.random() * 10000 + 1).toString()}.pdf`
  );
});

app.post("/upload_file", upload.single("file"), function (req, res) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  if (!req.file) {
    //If the file is not uploaded, then throw custom error with message: FILE_MISSING
    throw Error("FILE_MISSING");
  } else {
    //If the file is uploaded, then send a success response.
    res.send({ status: "success" });
  }
});

const todoList = [
  {
    id: 1111,
    name: "Read Sprint",
  },
  {
    id: 2222,
    name: "Read Make Time",
  },
];

const myTodoList = {
  1111: {
    id: 1111,
    name: "Read Sprint",
  },
  2222: {
    id: 2222,
    name: "Read Make Time",
  },
};

app.options("/todos", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.sendStatus(204);
});

app.options("/mytodos", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.sendStatus(204);
});

app.options("/alltodos", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.sendStatus(204);
});

app.get("/todos", function (req, res, next) {
  setTimeout(() => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(todoList);
    //res.sendStatus(400);
  }, 3000);
});

app.get("/mytodos", function (req, res, next) {
  setTimeout(() => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(myTodoList);
    // res.sendStatus(400);
  }, 2000);
});

app.get("/mytodos/:id", function (req, res, next) {
  setTimeout(() => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(myTodoList[req.params.id]);
    // res.sendStatus(400);
  }, 2000);
});

app.get("/alltodos", function (req, res, next) {
  setTimeout(() => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(todoList);
    //res.sendStatus(400);
  }, 4000);
});

app.listen(8080, function () {
  console.log("Mock API listening on port 8080");
});
