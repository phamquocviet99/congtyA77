import { React, useEffect, useState } from "react";
import "./CategoryAdmin.css";
import categoryActivityApi from "../api/categoryActivityApi";
import activityApi from "../api/activityApi";
import JoditEditor from "jodit-react";

function ActivityAdmin() {
  const loadPage = "";
  const [ActivitysList, setActivitysList] = useState([]);
  const [activity, setActivity] = useState({
    name: "",
    content: "",
    idCategory: "",
    description: "",
  });
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState({
    nameCategory: "",
    idCategory: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageLoad, setPageLoad] = useState(loadPage);
  const [idUpdate, setIdUpdate] = useState("");
  const [changeImg, setchangeImg] = useState("false");
  const [image, setImage] = useState(null);

  useEffect(() => {
    setError(false);
    setLoading(true);
    async function fetchActivitysList() {
      try {
        const response = await activityApi.getAll();
        const listActivitys = JSON.parse(JSON.stringify(response));
        setActivitysList(listActivitys.data);

        console.log(listActivitys);
        setPageLoad(loadPage);
      } catch (error) {
        setError(true);
      }
    }
    async function fetchCategoriesList() {
      try {
        const response = await categoryActivityApi.getAll();
        const listCategories = JSON.parse(JSON.stringify(response));
        setCategoryList(listCategories.data);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    }
    fetchCategoriesList();
    fetchActivitysList();
  }, [pageLoad]);

  // Async Function
  async function fetchActivitybyCategory(id) {
    try {
      const response = await activityApi.getByIdCategory(id);
      const listActivitys = JSON.parse(JSON.stringify(response));
      setActivitysList(listActivitys.data);
    } catch (error) {
      setError(true);
    }
  }
  // Add new Brand
  async function addNewActivity(formData) {
    try {
      setLoading(true);
      const response = await activityApi.create(formData);
      setLoading(false);
      setPageLoad(1);
    } catch (error) {
      setError(true);
    }
  }
  // Delete Brand
  async function DeleteActivity(id) {
    try {
      setLoading(true);
      await activityApi.remove(id);
      setPageLoad(id);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }

  async function updateActivity() {
    try {
      setLoading(true);
      const data = new FormData();
      if (changeImg === "true") {
        data.append("image", image);
      }
      data.append("name", activity.name);
      data.append("changeImg", changeImg);
      data.append("content", activity.content);
      data.append("idCategory", activity.idCategory);
      data.append("description", activity.description);
      await activityApi.update(idUpdate, data);
      setLoading(false);
      setPageLoad(-1);
      setNullActivity();
      setImage(null);
      setNullCategory();
    } catch (error) {
      setError(true);
    }
  }
  //handle
  //handleGetBrandbyIdCategory
  function handleGetActivitybyIdCategory(e) {
    fetchActivitybyCategory(e.target.value);
  }
  //handle
  //HandleChangeInputText

  function handleDescriptionChange(e) {
    setActivity({ ...activity, description: e.target.value });
  }
  function handlenNameChange(e) {
    setActivity({ ...activity, name: e.target.value });
  }
  function handlenCategoryChange(e) {
    setActivity({ ...activity, idCategory: e.target.value });
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

  function handleSubmitAdd() {
    if (
      activity.name === "" ||
      activity.content === "" ||
      activity.idCategory === "" ||
      activity.description === "" ||
      image == null
    ) {
      alert("Mời bạn nhập đủ trường thông tin !");
    } else {
      const data = new FormData();
      data.append("name", activity.name);
      data.append("description", activity.description);
      data.append("idCategory", activity.idCategory);
      data.append("content", activity.content);

      data.append("image", image);
      addNewActivity(data);
      hiddenAddElementAndShowBtn();

      setNullActivity();
    }
  }

  function handleSubmitUpdate() {
    if (changeImg === "true") {
      if (
        activity.name === "" ||
        activity.content === "" ||
        activity.idCategory === "" ||
        activity.description === "" ||
        image === null
      ) {
        return alert("Mời bạn nhập đủ trường dữ liệu");
      } else {
        updateActivity();
      }
    } else {
      if (activity.name === "" || activity.description === ""|| activity.content === "") {
        return alert("Mời bạn nhập đủ trường dữ liệu");
      } else {
        updateActivity();
      }
    }
    hiddenUpdateElement();
  }
  function setNullActivity() {
    setActivity({
      name: "",
      content: "",
      idCategory: "",
      description: "",
    });
  }
  function setNullCategory() {
    setCategory({
      nameCategory: "",

      idCategory: "",
    });
  }
  function showFormUpdate(activity, id) {
    showUpdateElement();
    hiddenAddElementAndShowBtn();
    setActivity({
      name: activity.name,
      content: activity.content,
      idCategory: activity.idCategory,
      description: activity.description,
    });
    setCategory({
      nameCategory: activity.nameCategory,
      idCategory: activity.idCategory,
    });
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
                      Quản lý <b>bài viết</b>
                    </h2>
                  </div>
                  <div className="col-sm-2">
                    <select
                      className="form-select"
                      defaultValue={"DEFAULT"}
                      onChange={handleGetActivitybyIdCategory}
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
                  <div className="col-sm-5">
                    <button
                      className="btn btn-success"
                      id="button-add"
                      onClick={showAddElementAndHiddenBtn}
                    >
                      <i className="material-icons">&#xE147;</i>
                      <span>Thêm bài viết</span>
                    </button>
                  </div>
                </div>
              </div>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Tên danh mục</th>
                    <th>Hình ảnh</th>
                    <th>Mô tả</th>
                    <th>Nội dung</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ActivitysList.map((act) => (
                    <tr key={act._id}>
                      <td>{act.name}</td>
                      <td>{act.nameCategory}</td>
                      <td>
                        <img className="img-exp" src={act.image.url} />
                      </td>
                      <td>{act.description}</td>
                      <td><div className="limit-text" dangerouslySetInnerHTML={{ __html: act?.content }} /></td>
                      <td>
                        <a
                          className="edit"
                          onClick={() => {
                            showFormUpdate(act, act._id);
                          }}
                        >
                          <i className="material-icons">&#xE254;</i>
                        </a>
                        <a
                          className="delete"
                          onClick={() => DeleteActivity(act._id)}
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
            Thêm bài viết mới
          </h3>

          <div className="form-group ">
            <label>Tên bài viết</label>
            <input
              className="form-control"
              onChange={handlenNameChange}
              placeholder="Nhập tên bài viết"
            />
          </div>
          <div className="form-group ">
            <label>Mô tả</label>
            <input
              className="form-control"
              onChange={handleDescriptionChange}
              placeholder="Nhập mô tả"
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
            <label>Nội dung</label>
            <JoditEditor
              value={""}
              tabIndex={1} // tabIndex of textarea
              // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => {
                setActivity({ ...activity, content: newContent });
              }}
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
            Chỉnh sửa bài viết
          </h3>

          <div className="form-group ">
            <label>Tên bài viết</label>
            <input
              onChange={handlenNameChange}
              defaultValue={activity.name}
              className="form-control"
            />
          </div>
          <div className="form-group ">
            <label>Mô tả</label>
            <input
              onChange={handleDescriptionChange}
              defaultValue={activity.description}
              className="form-control"
            />
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
            <label>Nội dung</label>
            <JoditEditor
              value={activity.content}
              tabIndex={1} // tabIndex of textarea
              // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => {
                setActivity({ ...activity, content: newContent });
              }}
            />
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

export default ActivityAdmin;
