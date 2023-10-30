import React from "react";
import icons from "../../../util/icons";

const {
  TbClockStar,
  GiPriceTag,
  PiDotOutlineDuotone,
  LuCalendarClock,
  TbClockPlus,
} = icons;

const TeachingHours = () => {
  return (
    <div className="flex gap-3 font-roboto">
      <div className="w-[100%] bg-white flex flex-col justify-center items-center">
        <div className="flex items-center justify-between mx-5 mt-2 border-b-2 p-2 w-[96%] mb-[12px]">
          <div className="text-[22px] font-bold text-main-100">
            <p>Thông Tin Giờ Giảng</p>
          </div>
          <div className="flex gap-2 justify-center items-center"></div>
        </div>
        <div className="w-[100%] flex flex-col gap-3 mb-3">
          <div className="flex gap-3">
            <div className="w-[40%] flex flex-col gap-3">
              <div className="h-[120px] bg-[#E0FBFF] flex gap-3 justify-around">
                <div className="h-full flex items-center justify-center ml-[28px]">
                  <div>
                    <TbClockStar size={40} />
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center gap-3">
                  <p className="font-bold text-[17px]">Giờ giảng cơ bản</p>
                  <p className="text-[12px]">Xem chi tiết</p>
                </div>
                <div className="w-[50%] flex items-center justify-center">
                  <p className="w-full text-[24px] font-medium">120</p>
                </div>
              </div>
              <div className="h-[120px] bg-[#E0FBFF] flex gap-3 justify-around">
                <div className="h-full flex items-center justify-center ml-[28px]">
                  <div>
                    <GiPriceTag size={40} />
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center gap-3">
                  <p className="font-bold text-[17px]">Mức giá giờ giảng</p>
                  <p className="text-[12px]">Xem chi tiết</p>
                </div>
                <div className="w-[50%] flex flex-col items-center justify-center">
                  <div className="flex gap-1 items-center justify-center">
                    <PiDotOutlineDuotone size={20} />
                    <p className="w-full text-[14px]">Giá cơ bản:</p>
                    <p>120.000d</p>
                  </div>
                  <div className="flex gap-1 items-center justify-center">
                    <PiDotOutlineDuotone size={20} />
                    <p className="w-full text-[14px] ">Giá trội giờ:</p>
                    <p>150.000d</p>
                  </div>
                </div>
              </div>
            </div>
            <div div className="w-[60%] flex gap-3">
              <div className="w-1/2 bg-[#FFF2D4]">
                <div className="w-full flex flex-col justify-center">
                  <div className="h-fit flex items-center justify-center border-b-[1px] my-1 mx-2">
                    <p className="w-full flex justify-start text-[17px] p-2">
                      Giờ dạy
                    </p>
                  </div>
                  <div className="flex pt-[15px] pb-[15px] border-b-[1px] mx-2">
                    <div className="w-1/2 flex flex-col items-center justify-center gap-2">
                      <p className="text-15px] font-light">Số giờ đã dạy</p>
                      <p className="text-[26px] font-medium">130 h</p>
                    </div>
                    <div className="flex flex-col w-1/2 justify-center items-center gap-2">
                      <LuCalendarClock size={40} />
                      <p className="text-[12px]">Xem chi tiết</p>
                    </div>
                  </div>
                  <div className="flex flex-col ml-3 my-3">
                    <div className="w-full flex justify-start">
                      + Cấu trúc dữ liệu và giải thuật: 45 kíp
                    </div>
                    <div className="w-full flex justify-start">
                      + Lập trình hướng đối tượng: 60 kíp
                    </div>
                    <div className="w-full flex justify-start">
                      + Lập trình Phython: 60 kíp
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 bg-red-400">
                {" "}
                <div className="w-full flex flex-col justify-center">
                  <div className="h-fit flex items-center justify-center border-b-[1px] my-1 mx-2">
                    <p className="w-full flex justify-start text-[17px] p-2">
                      Trội giờ
                    </p>
                  </div>
                  <div className="flex pt-[15px] pb-[15px] border-b-[1px] mx-2">
                    <div className="w-1/2 flex flex-col items-center justify-center gap-2">
                      <p className="text-15px] font-light">
                        Số giờ trội đã dạy
                      </p>
                      <p className="text-[26px] font-medium">20 h</p>
                    </div>
                    <div className="flex flex-col w-1/2 justify-center items-center gap-2">
                      <TbClockPlus size={40} />
                      <p className="text-[12px]">Xem chi tiết</p>
                    </div>
                  </div>
                  <div className="flex flex-col ml-3 my-3">
                    <div className="w-full flex justify-start">
                      + Lớp dưới 50 sinh viên: hệ số 1.0
                    </div>
                    <div className="w-full flex justify-start">
                      + Lớp từ 50 đến 80 sinh viên: hệ số 1.2
                    </div>
                    <div className="w-full flex justify-start">
                      + Lớp lớn hơn 80 sinh viên: hệ số 1.4
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[360px] bg-red-200">
            <div className="text-[20px] font-bold text-main-100 border-b-2 m-auto w-[96%]">
              <p className="flex justify-start p-1">Biểu đồ giờ giảng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachingHours;
