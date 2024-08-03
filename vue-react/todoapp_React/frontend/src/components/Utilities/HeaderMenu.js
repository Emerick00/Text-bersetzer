import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeaderMenu = () => {
  const [user, setUser] = useState();
  const logOutHandler = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(user);
  }, []);
  return (
    <div className="py-4 rounded-md sdw-style px-7 bg-slate-50">
      <ul className="flex items-center justify-between ">
        <li>
          <Link className="font-medium text-[1.2rem]">ToDoAPP</Link>
        </li>
        <li>
          {user && user.token && (
            <button
              onClick={logOutHandler}
              className=" font-medium text-[1.2rem] rounded-md bg-[#ce0078] text-white px-8 py-2"
            >
              Ausloggen
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default HeaderMenu;
