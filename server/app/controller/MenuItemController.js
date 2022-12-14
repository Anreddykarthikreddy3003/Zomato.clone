let MenuItemsModel = require("../model/MenuItemsModel");
let menuitems = require("../resources/menu_items.json");

let MenuItemController = {
  getMenuItem: async function (req, res) {
    let id = req.query.rid;
    id = id ? id : 0;

    try {
      let result = await MenuItemsModel.find({ restaurantId: id });
      res.status(200).send({
        status: true,
        menu_items: result,
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  addMenuItem: async function (req, res) {
    try {
      let result = await MenuItemsModel.insertMany(menuitems);
      res.status(200).send({
        status: true,
        message: "MenuItemsModel added successfully",
        result,
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
};

module.exports = MenuItemController;
