import React from "react";
import { useSelector } from "react-redux";
import * as helpFn from "../util/HelpFn";

const Infor = () => {
  const { idUser, infoUser } = useSelector((state) => state.app);
  return (
    <div className="w-[60%] bg-white font-roboto">
      <div className="p-[10px] h-full">
        <div className="w-full border-b-[0.5px] flex justify-start">
          <span className="font-bold text-[18px] pb-[10px] opacity-60">
            Thông tin sinh viên
          </span>
        </div>
        <div className="flex mt-[20px]">
          <div className="w-[180px] flex flex-col items-center justify-center">
            <img
              className="w-[120px] h-[120px] rounded-full"
              src={infoUser?.avatar}
              alt="avatar"
            />
            <a href="/thong-tin-chi-tiet" className="text-[12px] mt-[8px]">
              Xem chi tiết
            </a>
          </div>
          <div className="w-full flex text-[14px] justify-around items-center">
            <div className="flex flex-col items-start gap-2">
              <span>MSSV: {idUser}</span>
              <span>Họ tên: {infoUser?.fullname}</span>
              <span>Giới tính: {infoUser?.gender === true ? "Nam" : "Nữ"}</span>
              <span>Ngày sinh: {helpFn.convertDateFormat(infoUser?.dob)}</span>
              <span>Số điện thoại: {infoUser?.phone}</span>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span>Email: {infoUser?.email}</span>
              <span>Lớp học: D19CQCNPM02-N</span>
              <span>Khóa học: 2019-2024</span>
              <span>Bậc đào tạo: Đại học</span>
              <span>Loại hình đào tạo: Chính quy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infor;
