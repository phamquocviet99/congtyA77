import { React, useEffect, useState } from "react";
import "../admin/Details/ProductDetails.css";
import "./ProductDetailPage.css";
import { useParams } from "react-router-dom";
import LoadingPage from "../Pages/LoadingPage";
import productsApi from "../api/productApi";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

function ProductDetailPage() {
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 4,
    countRows: 1,
  });
  const [filters, setFilters] = useState({
    limit: 4,
    page: 0,
  });
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(false);
  const totalPages = Math.ceil(pagination.countRows / pagination.limit);
  useEffect(() => {
    setError(false);
    setLoading(true);
    const fetchProduct = async () => {
      try {
        const responseProduct = await productsApi.getById(id);
        const productData = JSON.parse(JSON.stringify(responseProduct));
        setProduct(productData);
        fetchProductbyBrand(productData.idBrand);
        setError(false);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
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

    fetchProduct();
  }, [id, filters]);
  function handlePageChange(newPage) {
    setPagination({ ...pagination, page: newPage });
    setFilters({ ...filters, page: newPage });
  }
  function NewlineText(props) {
    const text = props.text;
    return text.split("\n").map((str, index) => (
      <p key={index} className="font-content-product">
        {str}
      </p>
    ));
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
        <div className="background-img-product" />
        <div className="container">
          <div className="body-product-details">
            <div className="map-product">
              <p>Sản phẩm </p>
              <span>{">>"}</span>
              <p>{product.nameCategory}</p>
              <span>{">>"}</span>
              <p>{product.nameBrand}</p>
              <span>{">>"}</span>
              <p>{product.name}</p>
            </div>
            <div className="row">
              <div className="col-12 col-xl-6">
                <Carousel fade className=" border">
                  {product.image.map((img) => (
                    <Carousel.Item key={img._id}>
                      <img
                        className="d-block w-100 img-product-detail"
                        src={img.url}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
              <div className="col-12 col-xl-6">
                <div className="content-product">
                  <h1 className="font-title-product">{product.name}</h1>
                  {product.content ? (
                    <p className="font-content-product">{product.content}</p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-xl-6 margin-product-pvsd" >
              {product.description ? (
                <div>
                  <h3 style={{ marginBottom: "20px" }}>PHẠM VI SỬ DỤNG</h3>
                  <NewlineText text={product.description} />
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="col-12 col-xl-6">
              {" "}
              <div className="content-product">
                <h3 style={{ marginBottom: "20px", fontWeight: "500" }}>
                  THÔNG SỐ SẢN PHẨM
                </h3>

                <p className="font-content-product">
                  Danh mục sản phẩm : {product.nameCategory}
                </p>
                <p className="font-content-product">
                  Dòng sản phẩm : {product.nameBrand}
                </p>
                <p className="font-content-product">Model : {product.model}</p>

                {product.voltage ? (
                  <p className="font-content-product">
                    Điện áp hoạt động : {product.voltage}
                  </p>
                ) : (
                  <></>
                )}
                {product.colorTemperature ? (
                  <p className="font-content-product">
                    Nhiệt độ màu : {product.colorTemperature}
                  </p>
                ) : (
                  <></>
                )}
                {product.size ? (
                  <p className="font-content-product">
                    Kích thước : {product.size}
                  </p>
                ) : (
                  <></>
                )}
                {product.weight ? (
                  <p className="font-content-product">
                    Khối lượng : {product.weight}
                  </p>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="horizontal-line"></div>
          <div className="related-products">
            <h3 style={{ marginBottom: "40px", textAlign: "center" }}>
              SẢN PHẨM CÙNG LOẠI
            </h3>
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

export default ProductDetailPage;
