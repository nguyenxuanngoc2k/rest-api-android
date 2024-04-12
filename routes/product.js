const express = require("express")
const productRouter = express.Router()

const UserModel = require("../models/user-schema")
const userSchema = require("../models/user-schema")

const { createProduct } = require('../controller/product')
productRouter.post("/", async function (req, res) {
  return createProduct(req, res)
})

module.exports = productRouter