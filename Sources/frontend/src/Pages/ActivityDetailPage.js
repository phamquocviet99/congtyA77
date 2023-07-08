import { React, useEffect, useState } from "react";
import activytiApi from "../api/activityApi";
import { useParams } from "react-router-dom";
import LoadingPage from "../Pages/LoadingPage";
import { Link } from "react-router-dom";
import "./ActivityDetailPage.css";
import "bootstrap/dist/css/bootstrap.css";

function ActivityDetailPage() {
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 4,
    countRows: 1,
  });
  const [filters, setFilters] = useState({
    limit: 4,
    page: 0,
  });
  const { id } = useParams();
  const [activity, setActivity] = useState({});
  const [loading, setLoading] = useState(true);
  const [activityList, setActivityList] = useState([]);
  const [error, setError] = useState(false);
  const totalPages = Math.ceil(pagination.countRows / pagination.limit);
  useEffect(() => {
    setError(false);
    setLoading(true);
    const fetchActivity = async () => {
      try {
        const responseActivity = await activytiApi.getById(id);
        const activityData = JSON.parse(JSON.stringify(responseActivity));
        setActivity(activityData);

        fetchActivitybyCategory(activityData.idCategory);
        setError(false);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    async function fetchActivitybyCategory(id) {
      try {
        const response = await activytiApi.getByIdCategory(id, filters);
        const listActivity = JSON.parse(JSON.stringify(response));
        setActivityList(listActivity.data);

        setPagination(listActivity.pageInfo);
      } catch (error) {
        setError(true);
      }
    }

    fetchActivity();
  }, [id, filters]);
  function handlePageChange(newPage) {
    setPagination({ ...pagination, page: newPage });
    setFilters({ ...filters, page: newPage });
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
      <div className="background-activity-details">
        <div className="background-img-activity-details">
          <div className="container">
            <div className="img-act-a">
              <img className="img-act" src={activity?.image?.url} alt="description"></img>
              <h2 className="title-act">{activity?.name}</h2>
              
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: "200px" }}>
        <div className="content-act">
          <p className="font-act" dangerouslySetInnerHTML={{ __html: activity?.content }} />
        </div>
        <div className="related-act">
          <h4>LĨNH VỰC HOẠT ĐỘNG LIÊN QUAN</h4>
          <div className="line-act"></div>
          <div className="row">
            {activityList?.map((act) => (
              <div className="col-12 col-sm-6 col-xl-3" key={act._id}>
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">{act?.name}</h5>
                    <p className="card-text limit-text-ac">
                      {act?.description}
                    </p>
                    <Link
                    to={`/activity/detail/${act._id}.html`}
                    className="btn btn-outline-success"
                  >
                    Xem chi tiết 
                  </Link>
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

export default ActivityDetailPage;
