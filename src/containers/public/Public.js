import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import icons from "../../util/icons";
import Header from "./Header";
import { Sidebar } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import * as apis from "../../apis";
import * as actions from "../../store/actions";

const { LiaCopyright } = icons;

const Public = () => {
  const dispatch = useDispatch();
  const { home } = useSelector((state) => state.app);
  console.log("sinh-vien");
  console.log(home);
  useEffect(() => {
    dispatch(actions.checkRedux(true));
    console.log("two");
    console.log(home);
  }, []);
  return (
    <div className="w-full bg-[#E7ECF0]">
      <div className="w-full h-full">
        <Header />
        <div className="w-full h-full flex pt-[72px]">
          <div className="w-[10%] ">
            <Sidebar />
          </div>
          <div className="w-[80%] flex-auto h-full">
            <Outlet />
          </div>
          <div className="w-[10%] "></div>
        </div>
        {/* <div className="w-full h-[180px] left-0 right-0 bottom-0 bg-red-400 font-roboto">
          <div className="flex flex-col ">
            <p className="flex items-center justify-center">
              Copyright{" "}
              <LiaCopyright size="16px" className="ml-[2px] mr-[2px]" /> 2023
              Học viện Công nghệ Bưu chính Viễn thông - Cơ sở tại TP. Hồ Chí
              Minh
            </p>
            <p>Thiết kế bởi Nguyễn Tiến Tài - N19DCCN164</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Public;
