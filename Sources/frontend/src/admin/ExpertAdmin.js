import { React, useState, useEffect } from "react";
import categoryExpertApi from "../api/categoryExpertApi";
import expertApi from "../api/expertApi";
import LoadingPage from "../Pages/LoadingPage";
import "./ExpertAdmin.css";

function ExpertAdmin() {
  const load = "";
  const [categoryList, setCategoryList] = useState([]);
  const [expert, setExpert] = useState({
    name: "",
    description: "",
    idCategory: "",
  });
  const [category, setCategory] = useState({
    nameCategory: "",
    idCategory: "",
  });
  const [expertList, setExpertList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadPage, setLoadPage] = useState(load);
  const [image, setImage] = useState(null);
  const [idUpdate, setIdUpdate] = useState("");
  const [changeImg, setchangeImg] = useState("false");

  useEffect(() => {
    async function fetchCategoriesList() {
      try {
        const response = await categoryExpertApi.getAll();
        const listCategories = JSON.parse(JSON.stringify(response));
        setCategoryList(listCategories.data);
        setLoadPage(load);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    }

    async function fetchExpertList() {
      try {
        const response = await expertApi.getAll();
        const listExperts = JSON.parse(JSON.stringify(response));
        setExpertList(listExperts.data);
      } catch (error) {
        setError(true);
      }
    }
    fetchCategoriesList();
    fetchExpertList();
  }, [loadPage]);
  // Asyn Func
  // Create New Expert
  async function AddNewExpert(formData) {
    try {
      setLoading(true);
      const response = await expertApi.create(formData);

      setLoading(false);
      setLoadPage(1);
    } catch (error) {
      setError(true);
    }
  }
  // Fetch Expert by Category
  async function fetchExpertbyCategory(idCate) {
    try {
      const response = await expertApi.getByIdCategory(idCate);
      const listExperts = JSON.parse(JSON.stringify(response));
      setExpertList(listExperts.data);
    } catch (error) {
      setError(true);
    }
  }
  // Delete Expert by ID
  async function RemoveExpert(id) {
    try {
      setLoading(true);
      const response = await expertApi.remove(id);
      setLoading(false);
      setLoadPage(id);
    } catch (error) {
      setError(true);
    }
  }
  async function UpdateExpert() {
    try {
      setLoading(true);
      const data = new FormData();
      if (changeImg === "true") {
        data.append("image", image);
      }
      data.append("name", expert.name);
      data.append("changeImg", changeImg);
      data.append("idCategory", expert.idCategory);
      data.append("description", expert.description);
      await expertApi.update(idUpdate, data);
      setLoading(false);
      setLoadPage(-1);
      setNullExpert();
      setImage(null);
      setNullCategory();
    } catch (error) {
      setError(true);
    }
  }
  function setNullExpert() {
    setExpert({
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
  function updateExpert() {
    if (changeImg === "true") {
      if (expert.name === "" || expert.description === "" || image === null) {
        return alert("Mời bạn nhập đủ trường dữ liệu");
      } else {
        UpdateExpert();
      }
    } else {
      if (expert.name === "" || expert.description === "") {
        return alert("Mời bạn nhập đủ trường dữ liệu");
      } else {
        UpdateExpert();
      }
    }
    hiddenUpdateElement();
  }
  // handle
  function handleChange(e) {
    fetchExpertbyCategory(e.target.value);
  }
  //handle
  function handleNameChange(e) {
    setExpert({ ...expert, name: e.target.value });
  }
  function handleDescriptionChange(e) {
    setExpert({ ...expert, description: e.target.value });
  }
  function handleCategoryChange(e) {
    setExpert({ ...expert, idCategory: e.target.value });
  }
  function handleImageChange(e) {
    try {
      if (
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpeg"
      ) {
        setImage(e.target.files[0]);
      } else {
        alert("Mời bạn chọn lại hình ảnh đúng định dạng !");
        e.target.value = null;
      }
    } catch (error) {
      setError(true);
    }
  }
  function createExpert() {
    if (
      expert.name == "" ||
      expert.description == "" ||
      expert.idCategory == "" ||
      image == null
    ) {
      alert("Mời bạn nhập đủ trường thông tin !");
    } else {
      const data = new FormData();
      data.append("name", expert.name);
      data.append("description", expert.description);
      data.append("idCategory", expert.idCategory);
      data.append("image", image);
      AddNewExpert(data);
    }
  }
  // Update
  function showFormUpdate(expert, id) {
    showUpdateElement();
    hiddenAddElementAndShowBtn();
    setExpert({
      name: expert.name,
      description: expert.description,
      idCategory: expert.idCategory,
    });
    setCategory({
      nameCategory: expert.nameCategory,
      idCategory: expert.idCategory,
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
    return <p>have an error !!!</p>;
  }
  if (loading) {
    return <LoadingPage />;
  }
  if (!loading)
    return (
      <div className="container-category">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-4">
                  <h2>
                    Quản lý <b>chuyên gia</b>
                  </h2>
                </div>
                <div className="col-sm-4">
                  <select className="form-select" onChange={handleChange}>
                    {categoryList.map((cate) => (
                      <option value={cate._id} key={cate._id}>
                        {cate.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-4">
                  <a
                    href="#addEmployeeModal"
                    className="btn btn-success"
                    data-toggle="modal"
                    onClick={showAddElementAndHiddenBtn}
                    id="button-add"
                  >
                    <i className="material-icons">&#xE147;</i>{" "}
                    <span>Thêm chuyên gia</span>
                  </a>
                 
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Lĩnh vực</th>
                  <th>Hình ảnh</th>
                  <th>Mô tả</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expertList.map((exp) => (
                  <tr key={exp._id}>
                    <td>{exp.name}</td>
                    <td>{exp.nameCategory}</td>
                    <td>
                      <img className="img-exp" src={exp.image.url} />
                    </td>
                    <td>{exp.description}</td>
                    <td>
                      <a
                        className="edit"
                        onClick={() => {
                          showFormUpdate(exp, exp._id);
                        }}
                      >
                        <i
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Edit"
                        >
                          &#xE254;
                        </i>
                      </a>
                      <a
                        className="delete"
                        onClick={() => {
                          RemoveExpert(exp._id);
                        }}
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
        <div
          className="container border"
          id="add-div"
          style={{ display: "none", marginBottom: "50px" }}
        >
          <h3 style={{ textAlign: "center", marginTop: "20px" }}>
            Thêm chuyên gia mới
          </h3>

          <div className="form-group ">
            <label>Tên chuyên gia</label>
            <input
              className="form-control"
              placeholder="Nhập tên chuyên gia"
              onChange={handleNameChange}
            />
          </div>
          <div className="form-group">
            <label>Lĩnh vực</label>
            <select
              className="form-select"
              defaultValue={"DEFAULT"}
              onChange={handleCategoryChange}
            >
              <option value="DEFAULT" disabled>
                Chọn lĩnh vực
              </option>

              {categoryList.map((cate) => (
                <option value={cate._id} key={cate._id}>
                  {cate.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Hình ảnh</label>
            <div className="input-group mb-3">
              <div className="input-group mb-3">
                <input
                  onChange={handleImageChange}
                  type="file"
                  className="form-control"
                  id="inputGroupFile02"
                />
                <label className="input-group-text">Upload</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Mô tả</label>
            <textarea
              onChange={handleDescriptionChange}
              style={{ height: "150px" }}
              className="form-control"
              placeholder="Nhập mô tả"
            />
          </div>

          <div className="form-group form-check"></div>
          <button
            style={{ margin: " 0 20px 20px 20px" }}
            type="submit"
            className="btn btn-primary"
            onClick={createExpert}
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
            Chỉnh sửa chuyên gia
          </h3>

          <div className="form-group ">
            <label>Tên chuyên gia</label>
            <input
              defaultValue={expert.name}
              onChange={handleNameChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Danh mục</label>
            <select
              className="form-select"
              defaultValue={category.idCategory}
              onChange={handleCategoryChange}
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
            <label>Hình ảnh</label>
            <div className="input-group mb-3">
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
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={Change}
            />
            <label className="form-check-label">
              Check để thay đổi hình ảnh
            </label>
          </div>
          <div className="form-group">
            <label>Mô tả</label>
            <input
              onChange={handleDescriptionChange}
              defaultValue={expert.description}
              className="form-control"
              placeholder="Nhập mô tả"
            />
          </div>
          <div className="form-group form-check"></div>
          <button
            style={{ margin: " 0 20px 20px 20px" }}
            type="submit"
            className="btn btn-primary"
            onClick={updateExpert}
          >
            Chỉnh sửa
          </button>
          <button
            onClick={hiddenAddElementAndShowBtn}
            style={{ margin: " 0 20px 20px 20px" }}
            className="btn btn-danger"
          >
            Huỷ
          </button>
        </div>
      </div>
    );
}

export default ExpertAdmin;
