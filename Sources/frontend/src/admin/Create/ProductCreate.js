import { React, useEffect, useState } from "react";
import LoadingPage from "../../Pages/LoadingPage";
import categoriesApi from "../../api/categoryProductApi";
import brandsApi from "../../api/brandProductApi";
import productsApi from "../../api/productApi";
import "./ProductCreate.css";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";

function ProductCreate() {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageList, setImageList] = useState({});
  const [product, setProduct] = useState({
    name: "",
    model: "",
    voltage: "",
    colorTemperature: "",
    size: "",
    weight: "",
    content: "",
    description: "",
    idCategory: "",
    idBrand: "",
    price: "",
  });

  useEffect(() => {
    setError(false);
    setLoading(true);
    async function fetchCategoriesList() {
      try {
        const response = await categoriesApi.getAll();
        const listCategories = JSON.parse(JSON.stringify(response));
        setCategoryList(listCategories.data);

        setLoading(false);
      } catch (error) {
        setError(true);
      }
    }

    fetchCategoriesList();
  }, []);

  async function fetchBrandbyCategory(id) {
    try {
      const response = await brandsApi.getByIdCategory(id);
      const listBrands = JSON.parse(JSON.stringify(response));
      setBrandsList(listBrands.data);
    } catch (error) {
      setError(true);
    }
  }
  // Create Product Func
  async function CreateNewProduct(formData) {
    try {
      setLoading(true);
      const response = await productsApi.create(formData);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }
  // Handle Create Product
  function handleCreateProduct() {
    if (
      product.name === "" ||
      product.model === "" ||
      product.idCategory === "" ||
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
      CreateNewProduct(data);
    }
  }
  //Handle Get Brand by ID Category
  //Handle Input Change
  // HandleChangInputText
  function handleNameChange(e) {
    setProduct({ ...product, name: e.target.value.trim() });
  }
  function handleModelChange(e) {
    setProduct({ ...product, model: e.target.value.trim() });
  }
  function handleVoltageChange(e) {
    setProduct({ ...product, voltage: e.target.value.trim() });
  }
  function handleColorTemperatureChange(e) {
    setProduct({ ...product, colorTemperature: e.target.value.trim() });
  }
  function handleSizeChange(e) {
    setProduct({ ...product, size: e.target.value.trim() });
  }
  function handleWeightChange(e) {
    setProduct({ ...product, weight: e.target.value.trim() });
  }
  function handlePriceChange(e) {
    setProduct({ ...product, price: e.target.value });
  }
  function handleCategoryChange(e) {
    fetchBrandbyCategory(e.target.value);
    setProduct({ ...product, idCategory: e.target.value.trim() });
  }
  function handleBrandChange(e) {
    setProduct({ ...product, idBrand: e.target.value.trim() });
  }
  function handleDescriptionChange(e) {
    setProduct({ ...product, description: e.target.value.trim() });
  }
  function handleContentChange(e) {
    setProduct({ ...product, content: e.target.value.trim() });
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
      if (check ) {
        return setImageList(e.target.files);
      } else {
        alert("Dung lượng hình ảnh không cho phép");
        e.target.value = null;
      }
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
              Thêm sản phẩm mới
            </h1>
            <div className="line-product"></div>
          </div>
          <div className="content-body">
            <div className="row">
              <div className="col-12 col-xl-6">
                <div className="form-group col-xl-9">
                  <label>Tên sản phẩm</label>
                  <input
                    onChange={handleNameChange}
                    className="form-control"
                    placeholder="Tên sản phẩm"
                  />
                </div>
                <div className="form-group col-xl-9">
                  <label>Model</label>
                  <input
                    className="form-control"
                    placeholder="Model sản phẩm"
                    onChange={handleModelChange}
                  />
                </div>
                <div className="form-group col-xl-9">
                  <label>Điện áp</label>
                  <input
                    className="form-control"
                    placeholder="Điện áp"
                    onChange={handleVoltageChange}
                  />
                </div>
                <div className="form-group col-xl-9">
                  <label>Danh mục</label>
                  <select
                    className="form-select"
                    defaultValue={"DEFAULT"}
                    onChange={handleCategoryChange}
                  >
                    <option value="DEFAULT" disabled>
                      Chọn danh mục
                    </option>

                    {categoryList.map((cate) => (
                      <option value={cate._id} key={cate._id}>
                        {cate.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-xl-9">
                  <label>Dòng sản phẩm</label>
                  <select
                    className="form-select"
                    defaultValue={"DEFAULT"}
                    onChange={handleBrandChange}
                  >
                    <option value="DEFAULT" disabled>
                      Chọn dòng sản phẩm
                    </option>

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
                    className="form-control"
                    placeholder="Nhiệt độ màu"
                    onChange={handleColorTemperatureChange}
                  />
                </div>
                <div className="form-group col-xl-9">
                  <label>Kích thước</label>
                  <input
                    className="form-control"
                    placeholder="Kích thước"
                    onChange={handleSizeChange}
                  />
                </div>
                <div className="form-group col-xl-9">
                  <label>Khối lượng</label>
                  <input
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
                    className="form-control size-textarea"
                    placeholder="Chi tiết"
                    onChange={handleDescriptionChange}
                  />
                </div>
                <div className="form-group col-xl-9">
                  <label>Nội dung</label>
                  <textarea
                    className="form-control  size-textarea"
                    placeholder="Chi tiết"
                    onChange={handleContentChange}
                  />
                </div>
                <div className="form-group col-xl-9">
                  <label>Hình ảnh</label>
                  <div className="input-group mb-3">
                    <div className="input-group mb-3">
                      <input
                        multiple
                        type="file"
                        className="form-control"
                        id="inputGroupFile02"
                        onChange={handleImageChange}
                      />
                      <label className="input-group-text">Upload</label>
                    </div>
                  </div>
                </div>
                <div className="form-group col-xl-9">
                  <label>Giá</label>
                  <input
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
                    onClick={handleCreateProduct}
                  >
                    Thêm sản phẩm
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

export default ProductCreate;
