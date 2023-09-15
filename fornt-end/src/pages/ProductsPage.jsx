import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import apiClient from "../services/apiService";
import "../styles/productStyles.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 1;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    apiClient
      .get("/api/products", { headers })
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const pageCount = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="product-container">
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
      <h1>Products</h1>
      {currentProducts.map((product) => (
        <div key={product._id} className="product-subcontainer">
          <div className="product-data">
            <div>
              <h1>{product.name}</h1>
            </div>
            <div>
              <h3>Price: ${product.price}</h3>
            </div>
          </div>
          <div className="product-image">
            <img
              src={product.imgUrl}
              alt={product.name}
              style={{ height: "50%", width: "50%" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
