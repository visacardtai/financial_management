import React, { useState } from "react";
import icons from "../util/icons";
import { NavLink } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import SubMenu from "./SubMenu";

const {
  AiOutlineCaretDown,
  AiOutlineCaretUp,
  BiSolidHome,
  MdScreenshotMonitor,
  BsFillMortarboardFill,
  MdPlaylistAddCheckCircle,
  LiaCcAmazonPay,
} = icons;

const subMenusList = [
  {
    id: 1,
    name: "TRANG CHỦ",
    icon: BiSolidHome,
    menus: [],
  },
  {
    id: 2,
    name: "THÔNG TIN CHUNG",
    icon: MdScreenshotMonitor,
    menus: [
      { id: 1, name: "Thông tin sinh viên" },
      { id: 2, name: "Ghi chú nhắc nhỡ" },
      { id: 3, name: "Cập nhật thông tin" },
    ],
  },
  {
    id: 3,
    name: "HỌC TẬP",
    icon: BsFillMortarboardFill,
    menus: [
      { id: 1, name: "Kết quả học tập" },
      { id: 2, name: "Lịch theo tuần" },
      { id: 3, name: "Lịch theo tiến độ" },
    ],
  },
  {
    id: 4,
    name: "ĐĂNG KÝ HỌC PHẦN",
    icon: MdPlaylistAddCheckCircle,
    menus: [
      { id: 1, name: "Chương trình khung" },
      { id: 2, name: "Đăng ký học phần" },
    ],
  },
  {
    id: 5,
    name: "HỌC PHÍ",
    icon: LiaCcAmazonPay,
    menus: [
      { id: 1, name: "Tra cứu công nợ", path: "cong-no-sinh-vien" },
      { id: 2, name: "Thanh toán", path: "thanh-toan" },
      { id: 3, name: "Phiếu thu tổng hợp", path: "phieu-thu-tong-hop" },
    ],
  },
];

const DropDown = () => {
  return (
    <div className="flex flex-col">
      <Scrollbars autoHide style={{ width: "100%", height: "320px" }}>
        <ul className="whitespace-pre px-1.5 text-[12px] flex flex-col gap-1">
          <div className="">
            {subMenusList?.map((menu) => (
              <div key={menu?.id} className="flex flex-col gap-1">
                <SubMenu data={menu} />
              </div>
            ))}
          </div>
        </ul>
      </Scrollbars>
    </div>
  );
};

export default DropDown;
