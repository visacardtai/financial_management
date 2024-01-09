import React from "react";
import { useSelector } from "react-redux";
import * as helpFn from "../../util/HelpFn";

const InforLecturer = () => {
  const { idUser, infoUser } = useSelector((state) => state.app);
  return (
    <div className="w-[60%] bg-white font-roboto">
      <div className="p-[10px] h-full">
        <div className="w-full border-b-[0.5px] flex justify-start">
          <span className="font-bold text-[18px] pb-[10px] opacity-60">
            Thông tin giảng viên
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
              <span>Mã giảng viên: {idUser}</span>
              <span>Họ tên: {infoUser?.fullname}</span>
              <span>Giới tính: {infoUser?.gender === true ? "Nam" : "Nữ"}</span>
              <span>Ngày sinh: {helpFn.convertDateFormat(infoUser?.dob)}</span>
              <span>Số điện thoại: {infoUser?.phone}</span>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span>Chức vụ: Giảng viên</span>
              <span>Trình độ: {infoUser?.qualification}</span>
              <span>Email: {infoUser?.email}</span>
              <span>Địa chỉ: {infoUser?.address?.split(",")[0]}</span>
              <span>
                Thành phố: {infoUser?.address?.split(",").pop().trim()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InforLecturer;
