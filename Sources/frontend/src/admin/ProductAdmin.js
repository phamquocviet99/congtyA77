import { React, useEffect, useState } from "react";
import categoriesApi from "../api/categoryProductApi";
import brandsApi from "../api/brandProductApi";
import productsApi from "../api/productApi";
import { Link } from "react-router-dom";
import LoadingPage from "../Pages/LoadingPage";

function ProductAdmin() {
  const load = "";
  const [categoryList, setCategoryList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loadPage, setLoadPage] = useState(load);

  useEffect(() => {
    setError(false);
    setLoading(true);

    async function fetchProductsList() {
      try {
        const response = await productsApi.getAll();
        const listProduct = JSON.parse(JSON.stringify(response));
        setProductList(listProduct.data);
        setLoadPage(load);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    }

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
    fetchProductsList();
  }, [loadPage]);
  // Get Brand by ID Category
  async function fetchBrandbyCategory(id) {
    try {
      const response = await brandsApi.getByIdCategory(id);
      const listBrands = JSON.parse(JSON.stringify(response));
      setBrandsList(listBrands.data);
    } catch (error) {
      setError(true);
    }
  }
  function handleGetBrandAndProductbyIdCategory(e) {
    fetchBrandbyCategory(e.target.value);
    fetchProductbyCategory(e.target.value);
  }
  // Get Product by ID Category
  async function fetchProductbyCategory(id) {
    try {
      const response = await productsApi.getByIdCategory(id);
      const listProduct = JSON.parse(JSON.stringify(response));
      setProductList(listProduct.data);
    } catch (error) {
      setError(true);
    }
  }
  // Get Product by ID Brand
  async function fetchProductbyBrand(id) {
    try {
      const response = await productsApi.getByIdBrand(id);
      const listProduct = JSON.parse(JSON.stringify(response));
      setProductList(listProduct.data);
    } catch (error) {
      setError(true);
    }
  }
  // Delete Product by ID Category
  async function RemoveProduct(id) {
    try {
      setLoading(true);
      const response = await productsApi.remove(id);
      setLoading(false);
      setLoadPage(id);
    } catch (error) {
      setError(true);
    }
  }
  //Handle Get product by ID Brand
  function handleGetProductbyIdBrand(e) {
    fetchProductbyBrand(e.target.value);
  }

  if (error) {
    return <p>have an error !!!</p>;
  }
  if (loading) {
    return <LoadingPage />;
  }
  if (!loading)
    return (
      <div>
        <div className="container-category">
          <div className="table-responsive">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-3">
                    <h2>
                      Quản lý <b>sản phẩm</b>
                    </h2>
                  </div>
                  <div className="col-sm-3">
                    <select
                      className="form-select"
                      defaultValue={"DEFAULT"}
                      onChange={handleGetBrandAndProductbyIdCategory}
                    >
                      <option value="DEFAULT" disabled>
                        Chọn danh mục
                      </option>
                      {categoryList.map((cate) => (
                        <option value={cate._id} key={cate._id}>
                          {cate.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-sm-3">
                    <select
                      className="form-select"
                      defaultValue={"DEFAULT"}
                      onChange={handleGetProductbyIdBrand}
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
                  <div className="col-sm-3">
                    <Link
                      to="/admin/product/create.html"
                      className="btn btn-danger"
                    >
                      Thêm sản phẩm mới
                    </Link>
                  </div>
                </div>
              </div>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Model</th>
                    <th>Danh mục</th>
                    <th>Dòng sản phẩm</th>
                    <th>Điện áp</th>
                    <th>Nhiệt độ màu</th>
                    <th>Kích thước</th>
                    <th>Cân nặng</th>
                    <th>Nội dung</th>
                    <th>Chi tiết</th>
                    <th>Số lượng hình ảnh</th>
                    <th>Giá</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map((product) => (
                    <tr key={product._id}>
                      <th>{product.name}</th>
                      <th>{product.model}</th>
                      <th>{product.nameCategory}</th>
                      <th>{product.nameBrand}</th>
                      <th>{product.voltage}</th>
                      <th>{product.colorTemperature}</th>
                      <th>{product.size}</th>
                      <th>{product.weight}</th>
                      <th >{product.content}</th>
                      <th >{product.description}</th>
                      <th>{product.image.length}</th>
                      <th>{product.price}</th>
                      <td>
                        <Link
                          to={`/admin/product/detail/${product._id}.html`}
                          className="edit"
                        >
                          <i
                            className="material-icons"
                            data-toggle="tooltip"
                            title="Edit"
                          >
                          face
                          </i>
                        </Link>
                        <Link
                          to={`/admin/product/update/${product._id}.html`}
                          className="edit"
                        >
                          <i
                            className="material-icons"
                            data-toggle="tooltip"
                            title="Edit"
                          >
                            &#xE254;
                          </i>
                        </Link>

                        <a
                          onClick={() => {
                            RemoveProduct(product._id);
                          }}
                          className="delete"
                        >
                          <i
                            className="material-icons"
                            data-toggle="tooltip"
                            title="Delete"
                          >
                            &#xE872;
                          </i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
             
            </div>
          </div>
        </div>
      </div>
    );
}

export default ProductAdmin;
