const Products = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ msg: "product testing route" });
};

const getAllProducts = async (req, res) => {
  const { fields, company, name, featured, sort } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let result = Products.find(queryObject);

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }

  const products = await result;
  res.status(200).json({ data: products, nbHits: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
