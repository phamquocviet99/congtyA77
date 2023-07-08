import { React, useEffect, useState } from "react";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import LoadingPage from "../../Pages/LoadingPage";
import productsApi from "../../api/productApi";
import { Carousel } from "react-bootstrap";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(false);
    setLoading(true);
    const fetchProduct = async () => {
      try {
        const responseProduct = await productsApi.getById(id);
        const productData = JSON.parse(JSON.stringify(responseProduct));
        setProduct(productData);

        setError(false);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };

    fetchProduct();
  }, [id]);
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
      <div className="container">
        <div style={{ height: "100px" }}></div>
        <div className="content-about">
          <h2 className="font-product-1">SẢN PHẨM : {product.name}</h2>
          <div className="horizontal-line"></div>
        </div>
        <div className="body-product-details">
          <div className="row">
            <div className="col-12 col-xl-6">
              <Carousel fade className="">
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

                {product.description ? (
                  <div>
                    <div className="horizontal-line-product"></div>
                    <h3 style={{marginBottom:"20px"}} >PHẠM VI SỬ DỤNG</h3>
                    <NewlineText text={product.description} />
                  </div>
                ) : (
                  <></>
                )}
                <div>
                  <div className="horizontal-line-product"></div>
                  <h3 style={{marginBottom:"20px"}}>THÔNG SỐ SẢN PHẨM</h3>

                  <p className="font-content-product">
                    Danh mục sản phẩm : {product.nameCategory}
                  </p>
                  <p className="font-content-product">
                    Dòng sản phẩm : {product.nameBrand}
                  </p>
                  <p className="font-content-product">
                    Model : {product.model}
                  </p>

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
          </div>
        </div>
      </div>
    );
}

export default ProductDetails;
