import { React, useEffect, useState } from "react";
import "./ProductPage.css";
import "bootstrap/dist/css/bootstrap.css";
import "./ExpertPage.css";
import categoryActivityApi from "../api/categoryActivityApi";
import activityApi from "../api/activityApi";
import { Link, useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";

function ActivityPage() {
  const { id } = useParams();
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 8,
    countRows: 1,
  });
  const [filters, setFilters] = useState({
    limit: 8,
    page: 0,
  });
  const totalPages = Math.ceil(pagination.countRows / pagination.limit);
  const [categoryList, setCategoryList] = useState([]);
  const [activityList, setActivityList] = useState([]);
  const [isActiveCategory, setIsActiveCategory] = useState({ id: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(false);
    setLoading(true);
    async function fetchCategoriesList() {
      try {
        const response = await categoryActivityApi.getAll();
        const listCategories = JSON.parse(JSON.stringify(response));
        setCategoryList(listCategories.data);
        setLoading(false);
      } catch (error) {}
    }
    async function fetchActivityList() {
      try {
        const response = await activityApi.getAll(filters);
        const listActivity = JSON.parse(JSON.stringify(response));
        setActivityList(listActivity.data);
        setPagination(listActivity.pageInfo);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    }
    async function fetchActivitybyCategory(id) {
      try {
        const response = await activityApi.getByIdCategory(id, filters);
        const listActivity = JSON.parse(JSON.stringify(response));
        setActivityList(listActivity.data);
        setPagination(listActivity.pageInfo);
        console.log(listActivity.data);
      } catch (error) {
        setError(true);
      }
    }
    fetchCategoriesList();
    if (id === undefined) {
      fetchActivityList();
    } else {
      fetchActivitybyCategory(id);
    }
    return () => {
      setActivityList([]);
    };
  }, [filters]);

  async function fetchActivitybyCategory(id) {
    try {
      const response = await activityApi.getByIdCategory(id, filters);
      const listActivity = JSON.parse(JSON.stringify(response));
      setActivityList(listActivity.data);
      setPagination(listActivity.pageInfo);
      console.log(listActivity.data);
    } catch (error) {
      setError(true);
    }
  }
  function handlePageChange(newPage) {
    setPagination({ ...pagination, page: newPage });
    setFilters({ ...filters, page: newPage });
  }
  function isCheckedCategory(id) {
    setIsActiveCategory({ id: id });
    fetchActivitybyCategory(id);
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
        <div className="background-img-activity"></div>
        <div className="container">
          <div className="category-title">
            <h2 className="text-uppercase   text-dark font-weight-bold">
              LĨNH VỰC HOẠT ĐỘNG
              <i className="material-icons icon-expert-title">biotech</i>
            </h2>
            <div className="line-expert"></div>
          </div>

          <div
            className="row"
            style={{ marginLeft: "5px", marginRight: "5px" }}
          >
            {categoryList.map((category) => (
              <div
                className="col-12 col-md-6 col-xl-3"
                key={category._id}
                onClick={() => isCheckedCategory(category._id)}
              >
                <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={`/activity/${category._id}.html`}>
                  <div
                    className={
                      isActiveCategory.id === category._id
                        ? "item-brand active"
                        : "item-brand"
                    }
                  >
                    <p className="text-item-category-1">LĨNH VỰC</p>
                    <p className="text-item-category-2">{category.name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="line-category"></div>
          <div className="list-product">
            <div className="row">
              {activityList?.map((act) => (
                <div className="col-12 col-md-6 col-xl-3" key={act._id}>
                  <div className="card">
                    <img
                      className="card-img-top img-product-card"
                      src={act.image.url}
                      alt="Card cap"
                    />
                    <div className="card-body ">
                      <h5 className="card-title heigh-title-card">
                        {act.name}
                      </h5>
                      <p className="card-text heigh-body-card limit-text-act">
                        {act.description}
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          Ngày : {act.createdAt}
                        </small>
                      </p>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Link to={`/activity/detail/${act._id}.html`}>
                          <button
                            style={{ width: "150px", margin: "10px" }}
                            className="btn btn-success"
                          >
                            Xem chi tiết
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pagignation">
              <button
                className="btn btn-outline-danger"
                size="lg"
                style={{ marginRight: "20px" }}
                disabled={pagination.page <= 0}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                Quay lại
              </button>
              <button
                className="btn btn-outline-primary"
                size="lg"
                disabled={pagination.page >= totalPages - 1}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                Xem thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ActivityPage;
