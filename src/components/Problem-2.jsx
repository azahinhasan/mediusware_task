import React, { useState, useEffect } from "react";
import { getAllContacts, getContactsByCountry } from "../api-pages";
import { useParams, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const Problem2 = () => {
  const [data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [modal, setModal] = useState("");
  const [search, setSearch] = useState({
    text: "",
    page: 0,
  });
  const [pageNumber, setPageNumber] = useState(2);
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
    setPageNumber(2);
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
      await getAllContacts(search.text, 1).then((res) => {
        if (res.results) {
          tempData = res.results;
        }
      });
    } else {
      setModal("Model-B");
      await getContactsByCountry(type, search.text, 1).then((res) => {
        if (res.results) {
          tempData = res.results;
        }
      });
    }
    setData(tempData);
    navigate(`/problem-2/${type.toLowerCase().replace(/\s/g, "-")}`);
  };

  const searchHandler = async (type) => {
    console.log("searchHandler");
    if (modal === "Model-A") {
      await getAllContacts(
        search.text,
        type === "more-data" ? pageNumber : 1
      ).then((res) => {
        if (res.results) {
          type === "more-data"
            ? setData([...data, ...res.results])
            : setData(res.results);
        }
      });
    } else {
      await getContactsByCountry(
        "United States",
        search.text,
        type === "more-data" ? pageNumber : 1
      ).then((res) => {
        if (res.results) {
          type === "more-data"
            ? setData([...data, ...res.results])
            : setData(res.results);
        }
      });
    }
  };

  const fetchMoreData = async () => {
    console.log("fetchMoreData");
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
    searchHandler("more-data");
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
            <div>
              <input
                type="text"
                onChange={(e) => {
                  setSearch({ ...search, text: e.target.value });
                }}
              />
              <button
                type="search"
                onClick={() => searchHandler()}
                style={{ marginLeft: "3px" }}
              >
                Search
              </button>
            </div>
            <InfiniteScroll
              dataLength={data.length}
              next={() => fetchMoreData()}
              hasMore={true}
              loader={<h4>Loading...</h4>}
            >
              <table className="table table-striped ">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Country</th>
                    <th scope="col">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((el, i) => {
                    return isChecked ? (
                      el.id % 2 === 0 && (
                        <tr
                          key={i}
                          onClick={() => fetchData("next-model")}
                          style={{ cursor: "pointer" }}
                        >
                          <th scope="col">{el?.id}</th>
                          <th scope="col">{el.country?.name}</th>
                          <th scope="col">{el?.phone}</th>
                        </tr>
                      )
                    ) : (
                      <tr
                        key={i}
                        onClick={() => fetchData("next-model")}
                        style={{ cursor: "pointer" }}
                      >
                        <th scope="col">{el?.id}</th>
                        <th scope="col">{el.country?.name}</th>
                        <th scope="col">{el?.phone}</th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </InfiniteScroll>
          </div>
        )}
      </div>

      <footer
        style={{
          position: "fixed",
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
