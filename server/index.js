const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");

//-------------------------DOTENV SERVER SET UP-------------------------
const dotenv = require("dotenv");
dotenv.config();
const controller = require("./controller");

const app = express();
app.use(bodyParser.json());

//-------------------------MASSIVE DATABASE SET UP------------------
massive(process.env.CONNECTION_STRING)
  .then(database => {
    app.set("db", database);
  })
  .catch(error => {
    console.log("error with massive", error);
  });

app.get("/api/inventory", controller.getAll);
app.post("/api/product", controller.addItem);
app.delete("/api/product/:id", controller.deleteItem);
app.put("/api/product/:id", controller.updateItem);

//----------------------NODEMON----------------------
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Sever listening on PORT ${PORT}`);
});
