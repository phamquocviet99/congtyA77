import { React, useEffect, useState } from "react";
import "./ProductPage.css";
import "bootstrap/dist/css/bootstrap.css";
import { Card } from "react-bootstrap";
import brandsApi from "../api/brandProductApi";
import categoriesApi from "../api/categoryProductApi";
import productsApi from "../api/productApi";
import { Link, useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";

function ProductPage() {
  const {  idbrand } = useParams();
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 8,
    countRows: 1,
  });
  const [filters, setFilters] = useState({
    limit: 8,
    page: 0,
  });
  const totalPages = Math.ceil(pagination.countRows / pagination.limit);
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [isActiveCategory, setIsActiveCategory] = useState({ id: "" });
  const [isActiveBrand, setIsActiveBrand] = useState({ id: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(false);
    setLoading(true);
    async function fetchCategoriesList() {
      try {
        const response = await categoriesApi.getAll();
        const listCategories = JSON.parse(JSON.stringify(response));
        setCategoryList(listCategories.data);
        
        setLoading(false);
      } catch (error) {}
    }
    async function fetchProductsList() {
      try {
        const response = await productsApi.getAll(filters);
        const listProduct = JSON.parse(JSON.stringify(response));
        setProductList(listProduct.data);
        setPagination(listProduct.pageInfo);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    }
    async function fetchProductbyCategory(id) {
      try {
        const response = await productsApi.getByIdCategory(id, filters);
        const listProduct = JSON.parse(JSON.stringify(response));
        setProductList(listProduct.data);
        setPagination(listProduct.pageInfo);
      } catch (error) {
        setError(true);
      }
    }
    async function fetchProductbyBrand(id) {
      try {
        const response = await productsApi.getByIdBrand(id, filters);
        const listProduct = JSON.parse(JSON.stringify(response));
        setProductList(listProduct.data);
        setPagination(listProduct.pageInfo);
      } catch (error) {
        setError(true);
      }
    }

    fetchCategoriesList();

    if (idbrand === undefined) {
      fetchProductsList();
    } else {
      fetchProductbyBrand(idbrand);
    }
    // fetchProductsList();
  }, [filters]);
  async function fetchBrandbyCategory(id) {
    try {
      const response = await brandsApi.getByIdCategory(id);
      const listBrands = JSON.parse(JSON.stringify(response));
      setBrandList(listBrands.data);
    } catch (error) {
      setError(true);
    }
  }
  async function fetchProductbyCategory(id) {
    try {
      const response = await productsApi.getByIdCategory(id, filters);
      const listProduct = JSON.parse(JSON.stringify(response));
      setProductList(listProduct.data);
      setPagination(listProduct.pageInfo);
    } catch (error) {
      setError(true);
    }
  }
  async function fetchProductbyBrand(id) {
    try {
      const response = await productsApi.getByIdBrand(id, filters);
      const listProduct = JSON.parse(JSON.stringify(response));
      setProductList(listProduct.data);
    } catch (error) {
      setError(true);
    }
  }
  function handlePageChange(newPage) {
    setPagination({ ...pagination, page: newPage });
    setFilters({ ...filters, page: newPage });
  }
  function isCheckedCategory(id) {
    setIsActiveBrand({id:""})
    setIsActiveCategory({ id: id });
    fetchProductbyCategory(id);
    fetchBrandbyCategory(id);
  }
  function isCheckedBrand(id) {
    setIsActiveBrand({ id: id });
    fetchProductbyBrand(id);
  }
  if (error) {
    return <p>Have an error !!!</p>;
  }
  if (loading) {
    return <LoadingPage />;
  }
  if (!loading)
    return (
      <div>
        <div className="background-img-product-details"></div>
        <div className="container">
          <div className="category-title">
            <h2 className="text-uppercase   text-dark font-weight-bold">
              DANH SÁCH SẢN PHẨM
              <i className="material-icons icon-expert-title">
                production_quantity_limits
              </i>
            </h2>
            <div className="line-product-list"></div>
          </div>
          <div className="row">
            {categoryList.map((category) => (
              <div
                className="col-12 col-xl-6"
                key={category._id}
                onClick={() => isCheckedCategory(category._id)}
              >
                
                 <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"/product.html"}> <div
                    className={
                      isActiveCategory.id === category._id
                        ? "category-item active"
                        : "category-item"
                    }
                  >
                    <p className="text-item-category">
                      DANH MỤC {category.name}
                    </p>
                  </div></Link>
               
              </div>
            ))}
          </div>
          <div
            className="line-category"
            style={{ height: "2px", marginLeft: "55px" }}
          ></div>

          <div
            className="row"
            style={{ marginLeft: "5px", marginRight: "5px" }}
          >
            {brandList.map((brand) => (
              <div
                className="col-12 col-md-6 col-xl-3"
                key={brand._id}
                onClick={() => isCheckedBrand(brand._id)}
              >
                <Link  style={{ color: 'inherit', textDecoration: 'inherit'}} to={`/product/${brand._id}.html`}>
                  <div
                    className={
                      isActiveBrand.id === brand._id
                        ? "item-brand active"
                        : "item-brand"
                    }
                  >
                    <p className="text-item-category-1">DÒNG SẢN PHẨM</p>
                    <p className="text-item-category-2">{brand.name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="list-product">
            <div className="row">
              {productList.map((product) => (
                <div className="col-12 col-md-6 col-xl-3" key={product._id}>
                  <Card className="card-product-product">
                    <Card.Img
                      className="img-product-card"
                      variant="top"
                      src={product.image[0].url}
                    />
                    <Card.Body>
                      <Card.Title className="title-card-product">
                        {product.name}
                      </Card.Title>
                      <Card.Title className="title-card-product">
                        {product.nameBrand}
                      </Card.Title>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "15px",
                        }}
                      >
                        <Link
                          to={`/product/detail/${product._id}.html`}
                          className="btn btn-outline-success"
                        >
                          Xem chi tiết sản phẩm
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
            <div className="pagignation">
              <button
                className="btn btn-outline-danger"
                size="lg"
                style={{ marginRight: "20px" }}
                disabled={pagination.page <= 0}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                Quay lại
              </button>
              <button
                className="btn btn-outline-primary"
                size="lg"
                disabled={pagination.page >= totalPages - 1}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                Xem thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ProductPage;
