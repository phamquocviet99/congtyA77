import { React, useEffect, useState } from "react";
import "./ExpertPage.css";
import expertApi from "../api/expertApi";
import LoadingPage from "./LoadingPage";

function ExpertPage() {
  const [expertList, setExpertList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true)
    async function fetchExpertList() {
      try {
        const response = await expertApi.getAll();
        const listExperts = JSON.parse(JSON.stringify(response));
        setExpertList(listExperts.data);
        setLoading(false)
      } catch (error) {
        setError(true);
      }
    }

    fetchExpertList();
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
      <div className="background-img-expert"></div>
      <div className="container-expert">
        <div className="container">
          <div className="content-expert">
            <h2 className="text-uppercase   text-dark font-weight-bold">
              CHUYÊN GIA LĨNH VỰC
              <i className="material-icons icon-expert-title">emoji_people</i>
            </h2>
            <div className="line-expert"></div>

            <div className="list-expert">
              {expertList?.map((exp, index) =>
                index % 2 === 0 ? (
                  <div key={exp._id}>
                    <div className="row" style={{ alignItems: "center" }}>
                      <div className="col-sm-6">
                        <div className="ac-left">
                          <p className="name-expert">{exp?.name}</p>
                          <p className="cate-expert">{exp?.nameCategory}</p>
                          <div
                            style={{ display: "flex", justifyContent: "end" }}
                          >
                            <p className="line-expert-item" />
                          </div>
                          <p className="des-expert">{exp?.description}</p>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="ac-right">
                          <img
                            src={exp?.image?.url}
                            className="rounded-circle img-expert-right"
                            alt="Cinque Terre"
                          ></img>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "50px",
                        }}
                      >
                        <p
                          className="line-expert-item"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={exp._id}>
                    <div className="row" style={{ alignItems: "center" }}>
                      <div className="col-sm-6">
                        <div className="ac-left">
                          <img
                            src={exp.image.url}
                            className="rounded-circle img-expert-left"
                            alt="Cinque Terre"
                          ></img>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="ac-right">
                          <p className="name-expert">{exp?.name}</p>
                          <p className="cate-expert">{exp?.nameCategory}</p>
                          <div
                            style={{ display: "flex", justifyContent: "start" }}
                          >
                            <p className="line-expert-item" />
                          </div>
                          <p className="des-expert">{exp?.description}</p>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "50px",
                      }}
                    >
                      <p
                        className="line-expert-item"
                        style={{ width: "100%", height: "1px" }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpertPage;
