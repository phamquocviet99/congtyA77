import { React, useEffect, useState } from "react";
import "./CategoryAdmin.css";
import userApi from "../api/userApi";

function AdminUser() {
  const loadPage = "";
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageLoad, setPageLoad] = useState(loadPage);

  useEffect(() => {
    setError(false);
    setLoading(true);
    async function fetchUserList() {
      try {
        const response = await userApi.getAll();
        const listUser = JSON.parse(JSON.stringify(response));
        setUserList(listUser);
        setLoading(false);
        setPageLoad(loadPage);
      } catch (error) {
        setError(true);
      }
    }
    fetchUserList();
  }, [pageLoad]);
  // Async Function
  // Delete Category
  async function DeleteUser(id) {
    try {
      setLoading(true);
      await userApi.remove(id);
      setPageLoad(id);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }
  // Add New Category
  async function addNewUser() {
    try {
      setLoading(true);
      const response = await userApi.create(user);
      setLoading(false);
      setPageLoad(1);
    } catch (error) {
      setError(true);
    }
  }

  //handle
  //HandleChangeInputText

  function handlenNameChange(e) {
    setUser({ ...user, name: e.target.value });
  }
  function handlenUsernameChange(e) {
    setUser({ ...user, username: e.target.value });
  }
  function handlenPasswordChange(e) {
    setUser({ ...user, password: e.target.value });
  }

  //handleSubmitAdd
  function handleSubmitAdd(e) {
    if (user.name === ""||user.username === ""||user.password === "") {
      return alert("Mời bạn nhập đủ trường dữ liệu"), e.preventDefault();
    } else {
      addNewUser();
      hiddenAddElementAndShowBtn();
   
    }
  }
  //handleUpdate

  //ShowUp
  function showAddElementAndHiddenBtn() {
    const div = document.getElementById("add-div");
    div.style.display = "";
    const btn = document.getElementById("button-add");
    btn.style.display = "none";
  }
  function hiddenAddElementAndShowBtn() {
    const div = document.getElementById("add-div");
    div.style.display = "none";
    const btn = document.getElementById("button-add");
    btn.style.display = "";
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
                      Quản lý <b>người dùng</b>
                    </h2>
                  </div>
                  <div className="col-sm-6">
                    <button
                      className="btn btn-success"
                      onClick={showAddElementAndHiddenBtn}
                      id="button-add"
                    >
                      <i className="material-icons">&#xE147;</i>
                      <span>Thêm người dùng mới</span>
                    </button>
                  </div>
                </div>
              </div>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Username</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userList?.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.username}</td>

                      <td>
                        <a
                          className="delete"
                          onClick={() => {
                            DeleteUser(user._id);
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
          style={{ display: "none", marginBottom: "50px" }}
        >
          <h3 style={{ textAlign: "center", marginTop: "20px" }}>
            Thêm danh mục mới
          </h3>
          <form>
            <div className="form-group ">
              <label>Tên user</label>
              <input
                onChange={handlenNameChange}
                className="form-control"
                placeholder="Nhập tên user mới"
              />
            </div>
            <div className="form-group ">
              <label>Username</label>
              <input
                onChange={handlenUsernameChange}
                className="form-control"
                placeholder="Nhập username"
              />
            </div>
            <div className="form-group ">
              <label>Password</label>
              <input
                onChange={handlenPasswordChange}
                className="form-control"
                placeholder="Password"
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
      </div>
    );
}

export default AdminUser;
