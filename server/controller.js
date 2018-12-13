module.exports = {
  getAll: (req, res) => {
    const database = req.app.get("db");
    database
      .get_inventory()
      .then(products => {
        console.log("prod", products);
        res.status(200).send(products);
      })
      .catch(error => {
        res.status(500).send({ errorMessage: "Something went wrong w Get" });
        console.log(error);
      });
  },

  addItem: (req, res) => {
    const database = req.app.get("db");
    const { name, price, image_url } = req.body;
    database
      .create_product([name, price, image_url])
      .then(() => res.sendStatus(200))
      .catch(error => {
        res.status(500).send({ errorMessage: "Something went wrong w Add" });
        console.log(error);
      });
  },

  deleteItem: (req, res) => {
    const database = req.app.get("db");
    let { params } = req;
    database
      .delete_product(params.id)
      .then(() => res.sendStatus(200))
      .catch(error => {
        res.status(500).send({ errorMessage: "Something went wrong w Delete" });
        console.log(error);
      });
  },

  updateItem: (req, res) => {
    const database = req.app.get("db");
    let { params } = req;
    const { name, price, image_url } = req.body;
    console.log("req.body", req.body);
    database
      .update_product([params.id, name, price, image_url])
      .then(() => res.sendStatus(200))
      .catch(error => {
        res.status(500).send({ errorMessage: "Something went wrong w Edit" });
        console.log(error);
      });
  }
};
