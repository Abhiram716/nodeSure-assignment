import Product from "../models/product.js"; // Import your product model

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Retrieve all products from the database
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  getAllProducts,
};
