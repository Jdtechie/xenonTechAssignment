import React, { useEffect, useState } from "react";
import "../Components/header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/action";
function Sidebar() {
  const [results, setResult] = useState([]);
  const dispatch = useDispatch();
  const users = useSelector((row) => row.user.userData);
  console.log(users, "users:::::::::::::::::::::::::  ");
  useEffect(() => {
    dispatch(actions.allUser());
  }, []);

  return (
    <div>
      <div className="userheadingTitle">All Users</div>
      <br></br>
      <hr style={{ color: "rgb(37 251 242)" }} size="5"></hr>
      <div className="userList">
        {users?.map((row, index) => {
          return (
            <div key={index}>
              <p>
                <Link to={`/userposts/${row.id}`}>
                  {row.firstName + " " + row.lastName}
                </Link>
              </p>
              <hr className="hrzLine"></hr>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
