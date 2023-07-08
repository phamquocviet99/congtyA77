import { React, useEffect, useState } from "react";
import "./CategoryAdmin.css";
import categoriesApi from "../api/categoryProductApi";

function CategoryProductAdmin() {
  const loadPage = "";
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState({
    name: "",
    // description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageLoad, setPageLoad] = useState(loadPage);
  const [idUpdate, setIdUpdate] = useState("");

  useEffect(() => {
    setError(false);
    setLoading(true);
    async function fetchCategoriesList() {
      try {
        const response = await categoriesApi.getAll();
        const listCategories = JSON.parse(JSON.stringify(response));
        setCategoryList(listCategories.data);
        setLoading(false);
        setPageLoad(loadPage);
      } catch (error) {
        setError(true);
      }
    }
    fetchCategoriesList();
  }, [pageLoad]);

  // Async Function
  // Delete Category
  async function DeleteCategory(id) {
    try {
      setLoading(true);
      await categoriesApi.remove(id);
      setPageLoad(id);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }
  // Add New Category
  async function addNewCategory() {
    try {
      setLoading(true);
      const response = await categoriesApi.create(category);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }
  // Update Category
  async function updateCategory() {
    try {
      setLoading(true);
      const response = await categoriesApi.update(idUpdate, category);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }
  //handle
  //HandleChangeInputText
  function handleDescriptionChange(e) {
    setCategory({ ...category, description: e.target.value });
  }
  function handlenNameChange(e) {
    setCategory({ ...category, name: e.target.value });
  }
  function setNullCategory() {
    setCategory({
      name: "",
      description: "",
    });
  }
  //handleSubmitAdd
  function handleSubmitAdd(e) {
    if (category.name === "" || category.description === "") {
      return alert("Mời bạn nhập đủ trường dữ liệu"), e.preventDefault();
    } else {
      addNewCategory();
      hiddenAddElementAndShowBtn();
      setPageLoad(1);
      setNullCategory();
    }
  }
  //handleUpdate

  function handleSubmitUpdate(e) {
    if (category.name === "" || category.description === "") {
      return alert("Mời bạn nhập đủ trường dữ liệu"), e.preventDefault();
    } else {
      updateCategory();
      hiddenUpdateElement();
      setPageLoad(1);
      setNullCategory();
    }
  }
  function showFormUpdate(cate, id) {
    showUpdateElement();
    hiddenAddElementAndShowBtn();
    setCategory({
      name: cate.name,
      description: cate.description,
    });
    setIdUpdate(id);
  }

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
                  <div className="col-sm-6">
                    <h2>
                      Quản lý <b>Danh mục</b>
                    </h2>
                  </div>
                  <div className="col-sm-6">
                    <button 
                      className="btn btn-success"
                      onClick={showAddElementAndHiddenBtn}
                      id="button-add"
                    >
                      <i className="material-icons">&#xE147;</i>
                      <span>Thêm danh mục mới</span>
                    </button>
                  </div>
                </div>
              </div>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Mô tả</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryList?.map((category) => (
                    <tr key={category._id}>
                      <td>{category.name}</td>
                      <td>{category.description}</td>

                      <td>
                        <a
                          className="edit"
                          onClick={() => {
                            showFormUpdate(category, category._id);
                          }}
                        >
                          <i className="material-icons">&#xE254;</i>
                        </a>
                        <a
                          className="delete"
                          onClick={() => {
                            DeleteCategory(category._id);
                          }}
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
          style={{ display: "none" , marginBottom:"50px"}}
        >
          <h3 style={{ textAlign: "center", marginTop: "20px" }}>
            Thêm danh mục mới
          </h3>
          <form>
            <div className="form-group ">
              <label>Tên danh mục</label>
              <input
                onChange={handlenNameChange}
                className="form-control"
                placeholder="Nhập tên danh mục"
              />
            </div>
            <div className="form-group">
              <label>Mô tả</label>
              <input
                onChange={handleDescriptionChange}
                className="form-control"
                placeholder="Nhập mô tả"
              />
            </div>
            <div className="form-group form-check"></div>
            <button
            style={{ margin: " 0 20px 20px 20px" }}
              onClick={handleSubmitAdd}
              type="submit"
              className="btn btn-primary"
            >
              Thêm
            </button>
            <button
            style={{ margin: " 0 20px 20px 20px" }}
             
              onClick={hiddenAddElementAndShowBtn}
              className="btn btn-danger"
            >
              Huỷ
            </button>
          </form>
        </div>
        <div
          className="container border"
          id="update-div"
          style={{ display: "none", marginBottom:"50px" }}
        >
          <h3 style={{ textAlign: "center", marginTop: "20px" }}>
            Chỉnh sửa danh mục
          </h3>

          <div className="form-group ">
            <label>Tên danh mục</label>
            <input
              value={category.name}
              onChange={handlenNameChange}
              className="form-control"
              placeholder="Nhập tên danh mục"
            />
          </div>
          <div className="form-group">
            <label>Mô tả</label>
            <input
              value={category.description}
              onChange={handleDescriptionChange}
              className="form-control"
              placeholder="Nhập mô tả"
            />
          </div>
          <div className="form-group form-check"></div>
          <button
          style={{ margin: " 0 20px 20px 20px" }}
            onClick={handleSubmitUpdate}
            type="submit"
            className="btn btn-primary"
          >
            Chỉnh sửa
          </button>
          <button
            style={{ margin: " 0 20px 20px 20px" }}
            onClick={hiddenAddElementAndShowBtn}
            className="btn btn-danger"
          >
            Huỷ
          </button>
        </div>
      </div>
    );
}

export default CategoryProductAdmin;
