import React, { useState } from "react";
import { getAllContacts, getContactsByCountry } from "../api-pages";

const Problem2 = () => {
  const [data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const fetchData = async (type) => {
    let tempData = [];
    if (type === "close") {
      setData([]);
      window.history.pushState({}, "", `/problem-2`);
      return;
    } else if (type === "all") {
      await getAllContacts().then((res) => {
        console.log(res.results);
        if (res.results) {
          tempData = res.results;
          //setData(res.results);
        }
      });
    } else {
      await getContactsByCountry(type).then((res) => {
        console.log(res.results);
        if (res.results) {
          tempData = res.results;
          // setData(res.results);
        }
      });
    }
    if (isChecked && tempData.length > 0) {
      tempData = tempData.filter((el) => el.id % 2 === 0);
    }
    setData(tempData);
    window.history.pushState(
      {},
      "",
      `/problem-2/${type.toLowerCase().replace(/\s/g, "-")}`
    );
    //United States
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
              style={{ backgroundColor: "#46139f",color:"white"}}
            >
              All Contacts
            </button>
            <button
              className="btn btn-lg"
              type="button"
              style={{ color: "white",backgroundColor:"#ff7f50"}}
              onClick={() => fetchData("United States")}
            >
              US Contacts
            </button>
            <button
              className="btn btn-lg"
              type="button"
              style={{ color: "#46139f",border:"#46139f 2px solid"}}
              onClick={() => fetchData("close")}
            >
              Close
            </button>
          </div>
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
                    <tr key={i}>
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
