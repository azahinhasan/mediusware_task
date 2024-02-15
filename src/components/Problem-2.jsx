import React, { useState, useEffect } from "react";
import { getAllContacts, getContactsByCountry } from "../api-pages";
import { useParams, useNavigate } from "react-router-dom";

const Problem2 = () => {
  const [data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [modal, setModal] = useState("");
  const { type } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (type === "all") {
      fetchData("all");
    } else if (type === "united-states") {
      fetchData("United States");
    }
  }, []);

  const fetchData = async (type) => {
    let tempData = [];
    if (type === "next-model") {
      setModal("Model-C");
      setData([]);
      return;
    } else if (type === "close") {
      setData([]);
      setModal("");
      navigate(`/problem-2`);
      return;
    } else if (type === "all") {
      setModal("Model-A");
      await getAllContacts().then((res) => {
        if (res.results) {
          tempData = res.results;
        }
      });
    } else {
      setModal("Model-B");
      await getContactsByCountry(type).then((res) => {
        if (res.results) {
          tempData = res.results;
        }
      });
    }
    if (isChecked && tempData.length > 0) {
      tempData = tempData.filter((el) => el.id % 2 === 0);
    }
    setData(tempData);
    navigate(`/problem-2/${type.toLowerCase().replace(/\s/g, "-")}`);
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-lg"
              type="button"
              onClick={() => fetchData("all")}
              style={{ backgroundColor: "#46139f", color: "white" }}
            >
              All Contacts
            </button>
            <button
              className="btn btn-lg"
              type="button"
              style={{ color: "white", backgroundColor: "#ff7f50" }}
              onClick={() => fetchData("United States")}
            >
              US Contacts
            </button>
            <button
              className="btn btn-lg"
              type="button"
              style={{ color: "#46139f", border: "#46139f 2px solid" }}
              onClick={() => fetchData("close")}
            >
              Close
            </button>
          </div>
          <h2 style={{ textAlign: "center", margin: "5px" }}>{modal}</h2>
        </div>

        {data.length > 0 && (
          <div className="tab-content">
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th scope="col">Country</th>
                  <th scope="col">Phone</th>
                </tr>
              </thead>
              <tbody>
                {data.map((el, i) => {
                  return (
                    <tr
                      key={i}
                      onClick={() => fetchData("next-model")}
                      style={{ cursor: "pointer" }}
                    >
                      <th scope="col">{el.country.name}</th>
                      <th scope="col">{el.phone}</th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <footer
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          height: "60px",
          backgroundColor: "#333",
          color: "white",
          textAlign: "left",
          paddingLeft: "30px",
          lineHeight: "60px",
        }}
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />{" "}
        Only Even
      </footer>
    </div>
  );
};

export default Problem2;
