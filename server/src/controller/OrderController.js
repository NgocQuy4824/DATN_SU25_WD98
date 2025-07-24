const mongoose = require("mongoose");
const orderService = require("../services/OrderService");
const Order = require("../models/OrderModel");
const buildQueryOptions = require("../helpers/buildQueryOptions");

const getAllOrder = async (req, res) => {
  try {
    const { filter, options } = buildQueryOptions(req.query);
    const { search, searchField } = req.query;

    if (search && searchField) {
      if (searchField === "_id" && mongoose.Types.ObjectId.isValid(search)) {
        filter._id = search;
      } else {
        filter[searchField] = { $regex: search, $options: "i" };
      }
    }

    const orders = await Order.paginate(filter, options);

    return res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const createOrder = async (req, res, next) => {
  try {
    const result = await orderService.createOrder(req, res, next);
    return res.status(result.status).json(result);
  } catch (error) {
    console.log("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllOrder,
  createOrder,
};
