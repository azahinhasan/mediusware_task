import React, { useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState([]);
  const [data, setData] = useState([]);

  const handleClick = (val) => {
    switch (val) {
      case "all":
        let temp={
            active:data.filter((el) => el.status === "active"),
            completed:data.filter((el) => el.status === "completed"),
            other:data.filter((el) => el.status !== "completed"&&el.status !== "active"),
        }
        setShow([...temp.active,...temp.completed,...temp.other]);
        break;
      default:
        setShow(data.filter((el) => el.status === val));
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newData = {
      name: e.target.elements.name.value,
      status: e.target.elements.status.value.toLowerCase().replace(/\s+/g, ''),
    };
    setData([...data, newData]);
    setShow([...data, newData]);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={(e) => onSubmitHandler(e)}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                name="status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {show.map((el) => {
                return (
                  <tr>
                    <th scope="col">{el.name}</th>
                    <th scope="col">{el.status}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
