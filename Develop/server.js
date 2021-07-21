const express = require("express"); //express package
const path = require("path"); //path package -- allows you to pave the path to join file/directory
const fs = require("fs");

const app = express();
const PORT = 8000;

//middleware - sets the express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public")); //tells the server that has static apps coming from public folder

//server call for notes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

//posts
app.post("api/notes", (req, res) => {
  const newNote = req.body;
});

//starts server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
