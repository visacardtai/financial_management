import React, { useState } from "react";
import icons from "../../util/icons";
import { NavLink } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import { SubMenuLec } from "./index";

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
      { id: 1, name: "Thông tin giảng viên" },
      { id: 2, name: "Ghi chú nhắc nhỡ" },
      { id: 3, name: "Cập nhật thông tin" },
    ],
  },
  {
    id: 3,
    name: "GIẢNG DẠY",
    icon: BsFillMortarboardFill,
    menus: [
      { id: 1, name: "Kỳ giảng dạy", path: "gio-giang-day" },
      { id: 2, name: "Điểm danh", path: "diem-danh" },
      { id: 3, name: "Thời khóa biểu tuần" },
      { id: 4, name: "Thời khóa biểu kỳ" },
      { id: 5, name: "Xem lịch thi" },
    ],
  },
  {
    id: 4,
    name: "SINH VIÊN",
    icon: MdPlaylistAddCheckCircle,
    menus: [
      { id: 1, name: "Xem điểm" },
      { id: 2, name: "DS sinh viên quản lý" },
    ],
  },
  {
    id: 5,
    name: "Góp ý",
    icon: LiaCcAmazonPay,
    menus: [
      { id: 1, name: "Gởi ý kiến cho quản lý", path: "cong-no-sinh-vien" },
      { id: 2, name: "Phản hồi", path: "thanh-toan" },
    ],
  },
];

const DropDownLec = () => {
  return (
    <div className="flex flex-col">
      <Scrollbars autoHide style={{ width: "100%", height: "320px" }}>
        <ul className="whitespace-pre px-1.5 text-[12px] flex flex-col gap-1">
          <div className="">
            {subMenusList?.map((menu) => (
              <div key={menu?.id} className="flex flex-col gap-1">
                <SubMenuLec data={menu} />
              </div>
            ))}
          </div>
        </ul>
      </Scrollbars>
    </div>
  );
};

export default DropDownLec;
