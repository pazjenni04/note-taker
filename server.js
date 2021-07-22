const express = require("express"); //express package
const path = require("path"); //path package -- allows you to pave the path to join file/directory
const fs = require("fs");
let notes = require("./db/db.json"); //db json file

var counter = 1;

const app = express();
const PORT = process.env.PORT || 8000; //will choose between generated port from Herkoku or choose the hard-coded port

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

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

//posts
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = ++counter; //adding a new unique id to each object
  console.log(newNote);
  notes.push(newNote); //adds new object to array db.json
  fs.writeFileSync("./db/db.json", JSON.stringify(notes)); //should add onto db.json
});

//starts server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
