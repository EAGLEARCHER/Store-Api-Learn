const stores = require("../models/productModel");

const getAllProducts = async (req, res) => {
  const { featured, name, company, sort, fields } = req.query;
  let queryObj = {};

  try {
    if (name) {
      queryObj.name = new RegExp(name, "i");
    }
    if (company) {
      queryObj.company = new RegExp(company, "i");
    }
    if (featured) {
      queryObj.featured = featured === "true" ? true : false;
    }

    const result = await stores.find(queryObj);

    if (result) {
      if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
      } else {
        result = result.sort('createdAt');
      }
      return res.status(200).json(result);
    }

    res.status(404).send("Not Found");
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllProductsStatic = async (req, res) => {
  const products = await stores.find({});
  console.log(products);
  res.status(200).json({ msg: "All Static products testing " });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};

// const stores = require('../models/productModel');

// const getAllProductsStatic = async (req, res) => {
//   const products = await stores.find({ price: { $gt: 30 } })
//     .sort('price')
//     .select('name price');

//   res.status(200).json({ products, nbHits: products.length });
// };
// const getAllProducts = async (req, res) => {
//   const { featured, company, name, sort, fields, numericFilters } = req.query;
//   const queryObject = {};

//   if (featured) {
//     queryObject.featured = featured === 'true' ? true : false;
//   }
//   if (company) {
//     queryObject.company = company;
//   }
//   if (name) {
//     queryObject.name = { $regex: name, $options: 'i' };
//   }
//   if (numericFilters) {
//     const operatorMap = {
//       '>': '$gt',
//       '>=': '$gte',
//       '=': '$eq',
//       '<': '$lt',
//       '<=': '$lte',
//     };
//     const regEx = /\b(<|>|>=|=|<|<=)\b/g;
//     let filters = numericFilters.replace(
//       regEx,
//       (match) => `-${operatorMap[match]}-`
//     );
//     const options = ['price', 'rating'];
//     filters = filters.split(',').forEach((item) => {
//       const [field, operator, value] = item.split('-');
//       if (options.includes(field)) {
//         queryObject[field] = { [operator]: Number(value) };
//       }
//     });
//   }

//   let result = stores.find(queryObject);
//   // sort
//   if (sort) {
//     const sortList = sort.split(',').join(' ');
//     result = result.sort(sortList);
//   } else {
//     result = result.sort('createdAt');
//   }

//   if (fields) {
//     const fieldsList = fields.split(',').join(' ');
//     result = result.select(fieldsList);
//   }
//   const page = Number(req.query.page) || 1;
//   const limit = Number(req.query.limit) || 10;
//   const skip = (page - 1) * limit;

//   result = result.skip(skip).limit(limit);
//   // 23
//   // 4 7 7 7 2

//   const products = await result;
//   res.status(200).json({ products, nbHits: products.length });
// };

// module.exports = {
//   getAllProducts,
//   getAllProductsStatic,
// };
