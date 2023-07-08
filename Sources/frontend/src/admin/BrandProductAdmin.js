import { React, useEffect, useState } from "react";
import "./CategoryAdmin.css";
import categoriesApi from "../api/categoryProductApi";
import brandsApi from "../api/brandProductApi";

function BrandProductAdmin() {
  const loadPage = "";
  const [brandsList, setBrandsList] = useState([]);
  const [brand, setBrand] = useState({
    name: "",
    description: "",
    idCategory: "",
  });
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState({ nameCategory: "", idCategory: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageLoad, setPageLoad] = useState(loadPage);
  const [idUpdate, setIdUpdate] = useState("");

  useEffect(() => {
    setError(false);
    setLoading(true);
    async function fetchBrandsList() {
      try {
        const response = await brandsApi.getAll();
        const listBrands = JSON.parse(JSON.stringify(response));
        setBrandsList(listBrands.data);
        setPageLoad(loadPage);
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
    fetchBrandsList();
  }, [pageLoad]);

  // Async Function
  async function fetchBrandbyCategory(id) {
    try {
      const response = await brandsApi.getByIdCategory(id);
      const listBrands = JSON.parse(JSON.stringify(response));
      setBrandsList(listBrands.data);
    } catch (error) {
      setError(true);
    }
  }
  // Add new Brand
  async function addNewBrand() {
    try {
      setLoading(true);
      const response = await brandsApi.create(brand);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }
  // Delete Brand
  async function DeleteBrand(id) {
    try {
      setLoading(true);
      await brandsApi.remove(id);
      setPageLoad(id);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }
    // Update Brand
    async function updateBrand() {
      try {
        setLoading(true);
        const response = await brandsApi.update(idUpdate, brand);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    }
  //handle
  //handleGetBrandbyIdCategory
  function handleGetBrandbyIdCategory(e) {
    fetchBrandbyCategory(e.target.value);
  }
  //handle
  //HandleChangeInputText
  function handleDescriptionChange(e) {
    setBrand({ ...brand, description: e.target.value });
  }
  function handlenNameChange(e) {
    setBrand({ ...brand, name: e.target.value });
  }
  function handlenCategoryChange(e) {
    setBrand({ ...brand, idCategory: e.target.value });
  }
  //handleAdd
  function handleSubmitAdd(e) {
    if (
      brand.name === "" ||
      brand.description === "" ||
      brand.idCategory === ""
    ) {
      return alert("Mời bạn nhập đủ trường dữ liệu"), e.preventDefault();
    } else {
      addNewBrand();
      hiddenAddElementAndShowBtn();
      setPageLoad(1);
      setNullBrand();
    }
  }
  function handleSubmitUpdate(e) {
    if ( brand.name === "" ||
    brand.description === "" ||
    brand.idCategory === "") {
      return alert("Mời bạn nhập đủ trường dữ liệu"), e.preventDefault();
    } else {
      updateBrand();
      hiddenUpdateElement();
      setPageLoad(1);
      setNullBrand();
      setNullCategory();

    }
  }
  function setNullBrand() {
    setBrand({
      name: "",
      description: "",
      idCategory: "",
    });
  }
  function setNullCategory() {
    setCategory({
      nameCategory: "",
     
      idCategory: "",
    });
  }
  function showFormUpdate(brand, id) {
    showUpdateElement();
    hiddenAddElementAndShowBtn();
    setBrand({
      name: brand.name,
      description: brand.description,
      idCategory: brand.idCategory
    });
    setCategory({
      nameCategory: brand.nameCategory,
      idCategory:brand.idCategory
    })
    setIdUpdate(id);
  }
  //handleUpdate

  //ShowUp
  function showAddElementAndHiddenBtn() {
    const div = document.getElementById("add-div");
    div.style.display = "";
    const btn = document.getElementById("button-add");
    btn.style.display = "none";
    hiddenUpdateElement();
  }
  function hiddenAddElementAndShowBtn() {
    const div = document.getElementById("add-div");
    div.style.display = "none";
    const btn = document.getElementById("button-add");
    btn.style.display = "";
  }

  function showUpdateElement() {
    const btn = document.getElementById("update-div");
    btn.style.display = "";
  }
  function hiddenUpdateElement() {
    const btn = document.getElementById("update-div");
    btn.style.display = "none";
  }

  if (error) {
    return <p>have an error !!!</p>;
  }
  if (loading) {
    return <p>Loading....</p>;
  }
  if (!loading)
    return (
      <div>
        <div className="container-category">
          <div className="table-responsive">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-5">
                    <h2>
                      Quản lý <b>dòng sản phẩm</b>
                    </h2>
                  </div>
                  <div className="col-sm-2">
                    <select
                      className="form-select"
                      defaultValue={"DEFAULT"}
                      onChange={handleGetBrandbyIdCategory}
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
                  <div className="col-sm-5">
                    <button
                      className="btn btn-success"
                      id="button-add"
                      onClick={showAddElementAndHiddenBtn}
                    >
                      <i className="material-icons">&#xE147;</i>
                      <span>Thêm dòng sản phẩm</span>
                    </button>
                  </div>
                </div>
              </div>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Tên danh mục</th>
                    <th>Mô tả</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {brandsList.map((brand) => (
                    <tr key={brand._id}>
                      <td>{brand.name}</td>
                      <td>{brand.nameCategory}</td>
                      <td>{brand.description}</td>
                      <td>
                        <a
                          className="edit"
                          onClick={() => {
                            showFormUpdate(brand, brand._id);
                          }}
                        >
                          <i className="material-icons">&#xE254;</i>
                        </a>
                        <a
                          className="delete"
                          onClick={() => DeleteBrand(brand._id)}
                        >
                          <i className="material-icons">&#xE872;</i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          className="container border"
          id="add-div"
          style={{ display: "none", marginBottom: "50px" }}
        >
          <h3 style={{ textAlign: "center", marginTop: "20px" }}>
            Thêm dòng sản phẩm mới
          </h3>

          <div className="form-group ">
            <label>Tên dòng sản phẩm</label>
            <input
              className="form-control"
              onChange={handlenNameChange}
              placeholder="Nhập tên dòng sản phẩm"
            />
          </div>
          <div className="form-group">
            <label>Danh mục</label>
            <select
              className="form-select"
              defaultValue={"DEFAULT"}
              onChange={handlenCategoryChange}
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
          <div className="form-group">
            <label>Mô tả</label>
            <input
              className="form-control"
              onChange={handleDescriptionChange}
              placeholder="Nhập mô tả"
            />
          </div>

          <div className="form-group form-check"></div>
          <button
            style={{ margin: " 0 20px 20px 20px" }}
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmitAdd}
          >
            Thêm
          </button>
          <button
            onClick={hiddenAddElementAndShowBtn}
            style={{ margin: " 0 20px 20px 20px" }}
            className="btn btn-danger"
          >
            Huỷ
          </button>
        </div>
        <div
          className="container border"
          id="update-div"
          style={{ display: "none", marginBottom: "50px" }}
        >
          <h3 style={{ textAlign: "center", marginTop: "20px" }}>
            Chỉnh sửa dòng sản phẩm
          </h3>

          <div className="form-group ">
            <label>Tên dòng sản phẩm</label>
            <input onChange={handlenNameChange} defaultValue={brand.name} className="form-control" />
          </div>
          <div className="form-group">
            <label>Danh mục</label>
            <select
              className="form-select"
              defaultValue={category.idCategory}
              onChange={handlenCategoryChange}
            >
              <option defaultValue="DEFAULT" disabled>
                Chọn danh mục
              </option>
              <option defaultValue={category.idCategory} hidden>
                {category.nameCategory}
              </option>
              {categoryList.map((cate) => (
                <option value={cate._id} key={cate._id}>
                  {cate.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Mô tả</label>
            <input onChange={handleDescriptionChange}  defaultValue={brand.description} className="form-control" placeholder="Nhập mô tả" />
          </div>
          <div className="form-group form-check"></div>
          <button
            style={{ margin: " 0 20px 20px 20px" }}
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmitUpdate}
          >
            Chỉnh sửa
          </button>
          <button onClick={hiddenAddElementAndShowBtn}
            style={{ margin: " 0 20px 20px 20px" }}
            className="btn btn-danger"
          >
            Huỷ
          </button>
        </div>
      </div>
    );
}

export default BrandProductAdmin;
