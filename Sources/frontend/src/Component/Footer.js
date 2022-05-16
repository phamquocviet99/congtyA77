import { React, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Footer.css";
import InformationApi from "../api/informationApi";

function Footer() {
  const [infor, setInfor] = useState({});
  useEffect(() => {
    const fetchInfor = async () => {
      try {
        const response = await InformationApi.getById(
          "6257c0d8ac3135464c2d8042"
        );
        const data = JSON.parse(JSON.stringify(response));
        setInfor(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInfor();
  }, []);
  return (
    <div className="container-footer">
      <div className="background-image"></div>

      <div className="content-footer">
        <div className="header-footer-name">
          <h5 className="text-center color-1">CONTACT US</h5>
        </div>
        <div className="container-contact">
          <div className="container pading-footer">
            <div className="row">
              <div className="col-sm-6">
                <input
                  placeholder="Tên của bạn"
                  type="text"
                  className="form-control  input-footer"
                />
                <input
                  placeholder="Địa chỉ email"
                  type="text"
                  className="form-control  input-footer"
                />
                <textarea
                  placeholder="Tin nhắn"
                  type="text"
                  className="form-control  input-footer text-area"
                />
                <button
                  type="button"
                  className="btn btn-outline-danger btn-lg btn-block btn-footer"
                >
                  Gửi thư
                </button>
              </div>
              <div className="col-sm-6">
                <div className="container information-footer">
                  <h5 className="padding-bottom-footer">Công ty TNHH A77</h5>
                  <div className="line-footer">
                    <i className="material-icons ">phone</i>
                    <p className="text-footer">{infor.phone}</p>
                  </div>
                  <hr className="line" />
                  <div className="line-footer">
                    <i className="material-icons ">email</i>
                    <p className="text-footer">{infor.email}</p>
                  </div>
                  <hr />
                  <div className="line-footer">
                    <i className="material-icons ">language</i>
                    <p className="text-footer">{infor.website}</p>
                  </div>
                  <hr />
                  <div className="line-footer">
                    <i className="material-icons ">home</i>
                    <p className="text-footer">{infor.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{height:"8px"}}></div>

        <div className="footer-footer-name">
          <p className="text-center-1 color-1">Coppyright @ 2022. HBB Tech</p>
          <div>
            <a href="#" className="fa fa-facebook"></a>
            <a href="#" className="fa fa-youtube"></a>
            <a href="#" className="fa fa-instagram"></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
