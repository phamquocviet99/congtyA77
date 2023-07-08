import { React, useEffect, useState } from "react";
import "./CategoryAdmin.css";
import supplierApi from "../api/supplierApi"

function SupplierAdmin() {
  const loadPage = "";
  const [supplierList, setSupplierList] = useState([]);
  const [supplier, setSupplier] = useState({
    name: "",
    link: "",
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
    async function fetchSuppliersList() {
      try {
        const response = await supplierApi.getAll();
        const listSuppliers = JSON.parse(JSON.stringify(response));
        setSupplierList(listSuppliers.data);
        setPageLoad(loadPage);
        setLoading(false)
      } catch (error) {
        setError(true);
      }
    }
   

    fetchSuppliersList();
  }, [pageLoad]);

  // Add new Brand
  async function addNewSupplier(formData) {
    try {
      setLoading(true);
      const response = await supplierApi.create(formData);
      setLoading(false);
      setPageLoad(1);
    } catch (error) {
      setError(true);
    }
  }
  // Delete Brand
  async function DeleteSupplier(id) {
    try {
      setLoading(true);
      await supplierApi.remove(id);
      setPageLoad(id);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }

  async function updateSupplier() {
    try {
      setLoading(true);
      const data = new FormData();
      if (changeImg === "true") {
        data.append("logo", image);
      }
      data.append("name", supplier.name);
      data.append("changeImg", changeImg);
      data.append("link", supplier.link);

      await supplierApi.update(idUpdate, data);
      setLoading(false);
      setPageLoad(-1);
      setNullSupplier();
      setImage(null);
    } catch (error) {
      setError(true);
    }
    console.log(supplier, image, changeImg)
  }


  //handle
  //HandleChangeInputText

  function handleLinkChange(e) {
    setSupplier({ ...supplier, link: e.target.value });
  }
  function handlenNameChange(e) {
    setSupplier({ ...supplier, name: e.target.value });
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
      supplier.name === "" ||
      supplier.link === "" ||
      image == null
    ) {
      alert("Mời bạn nhập đủ trường thông tin !");
    } else {
      const data = new FormData();
      data.append("name", supplier.name);
      data.append("link", supplier.link);


      data.append("logo", image);
      addNewSupplier(data);
      hiddenAddElementAndShowBtn();

      setNullSupplier();
    }
  }

  function handleSubmitUpdate() {
    if (changeImg === "true") {
      if (
        supplier.name === "" ||
        supplier.link === "" ||
       
        image === null
      ) {
        return alert("Mời bạn nhập đủ trường dữ liệu");
      } else {
        updateSupplier();
      }
    } else {
      if (
        supplier.name === "" ||
        supplier.link === "" 
       
      ) {
        return alert("Mời bạn nhập đủ trường dữ liệu");
      } else {
        updateSupplier();
      }
    }
    hiddenUpdateElement();
  }
  function setNullSupplier() {
    setSupplier({
      name: "",
      link: "",

    });
  }


  function showFormUpdate(supplier, id) {
    showUpdateElement();
    hiddenAddElementAndShowBtn();
    setSupplier({
      name: supplier.name,
      link: supplier.link,
     
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
                 
                  <div className="col-sm-5">
                    <button
                      className="btn btn-success"
                      id="button-add"
                      onClick={showAddElementAndHiddenBtn}
                    >
                      <i className="material-icons">&#xE147;</i>
                      <span>Thêm nhà cung cấp</span>
                    </button>
                  </div>
                </div>
              </div>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Liên kết</th>
                    <th>Hình ảnh</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {supplierList.map((sup) => (
                    <tr key={sup._id}>
                      <td>{sup.name}</td>
                      <td>{sup.link}</td>
                      <td>
                        <img className="img-exp" src={sup.logo.url} />
                      </td>

                      <td>
                        <a
                          className="edit"
                          onClick={() => {
                            showFormUpdate(sup, sup._id);
                          }}
                        >
                          <i className="material-icons">&#xE254;</i>
                        </a>
                        <a
                          className="delete"
                          onClick={() => DeleteSupplier(sup._id)}
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
            Thêm nhà cung cấp mới
          </h3>

          <div className="form-group ">
            <label>Tên nhà cung cấp</label>
            <input
              className="form-control"
              onChange={handlenNameChange}
              placeholder="Nhập tên nhà cung cấp"
            />
          </div>
          <div className="form-group ">
            <label>liên kết</label>
            <input
              className="form-control"
              onChange={handleLinkChange}
              placeholder="Nhập link"
            />
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
            Chỉnh nhà cung cấp
          </h3>

          <div className="form-group ">
            <label>Tên nhà cung cấp</label>
            <input
              onChange={handlenNameChange}
              defaultValue={supplier.name}
              className="form-control"
            />
          </div>
          <div className="form-group ">
            <label>Liên kết</label>
            <input
              onChange={handleLinkChange}
              defaultValue={supplier.link}
              className="form-control"
            />
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

export default SupplierAdmin;
