import { React, useEffect, useState } from "react";
import "./SupplierPage.css";
import "./ExpertPage.css";
import supplierApi from "../api/supplierApi";
import LoadingPage from "./LoadingPage";
function SupplierPage() {
  const [supplierList, setSupplierList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(false);
    setLoading(true);
    async function fetchSuppliersList() {
      try {
        const response = await supplierApi.getAll();
        const listSuppliers = JSON.parse(JSON.stringify(response));
        setSupplierList(listSuppliers.data);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    }

    fetchSuppliersList();
  }, []);
  if (error) {
    return <p>Have an error !!!</p>;
  }
  if (loading) {
    return <LoadingPage />;
  }
  if (!loading)
    return (
      <div>
        <div className="background-img-supplier-details"></div>
        <div className="container">
          <div className="title-partner">
            <h2 className="text-uppercase   text-dark font-weight-bold">
              các đối tác của chúng tôi
              <i className="material-icons icon-expert-title">handshake</i>
            </h2>
            <div className="line-product-list"></div>
          </div>
          <div className="body-partner">
            <div className="row">
              {supplierList.map((sup) => (
                <div className="col-12 col-md-6 col-xl-3 " key={sup._id}>
                  <a href={sup.link} style={{ textDecoration: "none" }}>
                    <div className="card box-shadow" style={{ width: "18rem" }}>
                      <img
                      className="card-img-top img-partner"
                        src={sup?.logo?.url}
                        alt="description"
                        
                      />
                      <div className="card-body">
                        <h5 className="card-title">{sup.name}</h5>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}

export default SupplierPage;
