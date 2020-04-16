const express = require("express");
const assert = require("assert");
const { MongoClient, ObjectID } = require("mongodb");

const app = express();
app.use(express.json());

//Connecting to our database
const mongoURI =
  "mongodb+srv://saf:1234@cluster0-syvs8.mongodb.net/test?retryWrites=true&w=majority";
const dataBase = "list-contact";

MongoClient.connect(mongoURI, { useUnifiedTopology: true }, (err, client) => {
  assert.equal(err, null, "connection to database failed");

  const db = client.db(dataBase);
  app.post("/add_contact", (req, res) => {
    let newContact = req.body;
    db.collection("contacts").insertOne(newContact, (err, data) => {
      err ? console.log("cannot add contact") : res.send(data);
    });
  });
  app.get("/contacts", (req, res) => {
    db.collection("contacts")
      .find()
      .toArray((err, data) => {
        err ? console.log("cannot get contacts") : res.send(data);
      });
  });
  app.put("/edit_contact/:id", (req, res) => {
    let contact = req.params.id;
    db.collection("contacts").findOneAndUpdate(
      { _id: ObjectID(contact) },
      { $set: req.body },
      (err, data) =>
        err
          ? console.log("cannot modifie contact")
          : res.send("contact modified")
    );
  });
  app.delete("/delete_contact/:id", (req, res) => {
    let contact = req.params.id;
    db.collection("contacts").findOneAndDelete(
      { _id: ObjectID(contact) },
      (err, data) =>
        err
          ? console.log("cannot delete contact")
          : res.send("contact deleted ")
    );
  });
});

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  err ? console.log("error") : console.log(`server is running on ${port}...`);
});
