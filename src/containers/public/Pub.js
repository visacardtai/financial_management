import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import * as actions from "../../store/actions";

const Pub = () => {
  const { home, isLogin } = useSelector((state) => state.app);
  return (
    <div className="w-full h-full">
      <div className="flex justify-center items-center fixed z-[999] top-0 left-0 right-0 w-full h-[90px] bg-white font-roboto border-b border-[#CDD1D5] shadow-md">
        <div className="">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/music-ed1de.appspot.com/o/Logo-2.png?alt=media&token=ee546b4d-234c-4a89-a40d-fd7a589afcdb&_gl=1*1abnhdb*_ga*Njk0MjA5MDAzLjE2OTgwODYwNjA.*_ga_CW55HF8NVT*MTY5ODIwNTE5MC4zLjEuMTY5ODIwNTIwNC40Ni4wLjA."
            alt="logo"
            className="w-[360px]"
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Pub;
