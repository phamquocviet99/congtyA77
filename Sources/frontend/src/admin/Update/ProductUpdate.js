import { React, useEffect, useState } from "react";
import LoadingPage from "../../Pages/LoadingPage";

import brandsApi from "../../api/brandProductApi";
import productsApi from "../../api/productApi";
import "../Create/ProductCreate.css";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate, useParams } from "react-router-dom";

function ProductUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brandsList, setBrandsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageList, setImageList] = useState({});
  const [changeImg, setchangeImg] = useState("false");
  const [product, setProduct] = useState({});

  useEffect(() => {
    setError(false);
    setLoading(true);
    const fetchProduct = async () => {
      try {
        const responseProduct = await productsApi.getById(id);
        const productData = JSON.parse(JSON.stringify(responseProduct));
        setProduct(productData);
        const responseBrand = await brandsApi.getByIdCategory(
          productData.idCategory
        );
        const listBrands = JSON.parse(JSON.stringify(responseBrand));
        setBrandsList(listBrands.data);
        setError(false);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    
    

    fetchProduct();

  }, [id]);

  async function fetchBrandbyCategory(id) {
    try {
      const response = await brandsApi.getByIdCategory(id);
      const listBrands = JSON.parse(JSON.stringify(response));
      setBrandsList(listBrands.data);
    } catch (error) {
      setError(true);
    }
  }
// Func update Product
  async function UpdateProduct(formData) {
    try {
      setLoading(true);
      const response = await productsApi.update(id, formData);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }

  // Handle Update Product
  function handleUpdateProduct() {
    if (
      product.name === "" ||
      product.model === "" ||
      product.idBrand === "" ||
      product.price === ""
    ) {
      alert("Mời bạn nhập đủ trường thông tin !");
    } else {
      const data = new FormData();
      if (imageList.length > 0) {
        for (const image of imageList) {
          data.append("image", image);
        }
      }
      data.append("name", product.name);
      data.append("model", product.model);
      data.append("voltage", product.voltage);
      data.append("colorTemperature", product.colorTemperature);
      data.append("size", product.size);
      data.append("weight", product.weight);
      data.append("content", product.content);
      data.append("description", product.description);
      data.append("idCategory", product.idCategory);
      data.append("idBrand", product.idBrand);
      data.append("price", product.price);
      data.append("changeImg",changeImg);
      UpdateProduct(data)

    }

  }
  //Handle Get Brand by ID Category
  //Handle Input Change
  // HandleChangInputText
  function handleNameChange(e) {
    setProduct({ ...product, name: e.target.value });
  }
  function handleModelChange(e) {
    setProduct({ ...product, model: e.target.value });
  }
  function handleVoltageChange(e) {
    setProduct({ ...product, voltage: e.target.value });
  }
  function handleColorTemperatureChange(e) {
    setProduct({ ...product, colorTemperature: e.target.value });
  }
  function handleSizeChange(e) {
    setProduct({ ...product, size: e.target.value });
  }
  function handleWeightChange(e) {
    setProduct({ ...product, weight: e.target.value });
  }
  function handlePriceChange(e) {
    setProduct({ ...product, price: e.target.value });
  }
  function handleBrandChange(e) {
    setProduct({ ...product, idBrand: e.target.value });
  }
  function handleDescriptionChange(e) {
    setProduct({ ...product, description: e.target.value });
  }
  function handleContentChange(e) {
    setProduct({ ...product, content: e.target.value });
  }
  function handleImageChange(e) {
    let totalSize = 0;
    if (e.target.files.length > 0) {
      let check = false;
      for (const file of e.target.files) {
        totalSize = totalSize + file.size;
        if (file.type === "image/png" || file.type === "image/jpeg") {
          check = true;
        } else {
          alert("Mời bạn chọn lại hình ảnh đúng định dạng !");
          e.target.value = null;
          check = false;
          break;
        }
      }
      if (check && totalSize < 1023 * 1023) {
        return setImageList(e.target.files);
      } else {
        alert("Dung lượng hình ảnh không cho phép");
        e.target.value = null;
      }
    }
  }
  function Change(e) {
    if (e.target.checked) {
      const input = document.getElementById("input-img");
      input.disabled = false;
      setchangeImg("true");
    } else {
      const input = document.getElementById("input-img");
      input.disabled = true;
      setchangeImg("false");
    }
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
        <div style={{ height: "100px" }}></div>
        <div className="container-content">
          <div className="title-add">
            <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
              Chỉnh sửa sản phẩm {product.name}
            </h1>
            <div className="line-product"></div>
          </div>
          <div className="content-body">
            <div className="row">
              <div className="col-12 col-xl-6">
                <div className="form-group col-xl-9">
                  <label>Tên sản phẩm</label>
                  <input
                    value={product.name}
                    onChange={handleNameChange}
                    className="form-control"
                    placeholder="Tên sản phẩm"
                  />
                </div>
                <div className="form-group col-xl-9">
                  <label>Model</label>
                  <input
                    value={product.model}
                    className="form-control"
                    placeholder="Model sản phẩm"
                    onChange={handleModelChange}
                  />
                </div>
                <div className="form-group col-xl-9">
                  <label>Điện áp</label>
                  <input
                    value={product.voltage}
                    className="form-control"
                    placeholder="Điện áp"
                    onChange={handleVoltageChange}
                  />
                </div>
                <div className="form-group col-xl-9">
                <label>Danh mục</label>
                <input
                  value={product.nameCategory}
                  className="form-control"
                  placeholder="Điện áp"
                  disabled
                />
                </div>
                <div className="form-group col-xl-9">
                  <label>Dòng sản phẩm</label>
                  <select
                    defaultValue={product.idBrand}
                    className="form-select"
                    onChange={handleBrandChange}
                  >
                    {brandsList.map((brand) => (
                      <option value={brand._id} key={brand._id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-xl-9">
                  <label>Nhiệt độ màu</label>
                  <input
                    value={product.colorTemperature}
                    className="form-control"
                    placeholder="Nhiệt độ màu"
                    onChange={handleColorTemperatureChange}
                  />
                </div>
                <div className="form-group col-xl-9">
                  <label>Kích thước</label>
                  <input
                    value={product.size}
                    className="form-control"
                    placeholder="Kích thước"
                    onChange={handleSizeChange}
                  />
                </div>
                <div className="form-group col-xl-9">
                  <label>Khối lượng</label>
                  <input
                    value={product.weight}
                    className="form-control"
                    placeholder="Khối lượng"
                    onChange={handleWeightChange}
                  />
                </div>
              </div>

              <div className="col-12 col-xl-6">
                <div className="form-group col-xl-9">
                  <label>Chi tiết</label>
                  <textarea
                    value={product.description}
                    className="form-control size-textarea"
                    placeholder="Chi tiết"
                    onChange={handleDescriptionChange}
                  />
                </div>
                <div className="form-group col-xl-9">
                  <label>Nội dung</label>
                  <textarea
                    value={product.content}
                    className="form-control  size-textarea"
                    placeholder="Chi tiết"
                    onChange={handleContentChange}
                  />
                </div>
                <div className="form-group col-xl-9">
                  <label>Hình ảnh</label>
                  <div className="input-group mb-3" >
                    <div className="input-group mb-3">
                      <input 
                        multiple
                        type="file"
                        className="form-control"
                        id="input-img"
                        onChange={handleImageChange}
                        disabled
                      />
                      <label className="input-group-text">Upload</label>
                    </div>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" onChange={Change} />
                    <label className="form-check-label">Check để thay đổi hình ảnh</label>
                  </div>
                </div>
                <div className="form-group col-xl-9">
                  <label>Giá</label>
                  <input
                    value={product.price}
                    className="form-control"
                    placeholder="Giá sản phẩm"
                    onChange={handlePriceChange}
                  />
                </div>
                <div
                  className="form-group col-xl-9"
                  style={{ textAlign: "end" }}
                >
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ marginRight: "30px" }}
                    onClick={handleUpdateProduct}
                  >
                    Điều chỉnh
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="btn btn-secondary"
                  >
                    Trở về
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ProductUpdate;
