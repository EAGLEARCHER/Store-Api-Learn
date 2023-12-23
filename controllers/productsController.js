const getAllProducts = async (req, res) => {
  // throw new Error("testing error by async error handler");
  res.status(200).json({ msg: "All products listed" });
};
const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ msg: "All Static products testing " });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic
};
