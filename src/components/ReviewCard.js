import React from "react";
import icons from "../util/icons";

const { BsCalendar2Week } = icons;

const ReviewCard = ({ name, number, icon }) => {
  return (
    <div className="h-[115px] bg-[#E0FBFF] font-roboto rounded-lg text-[#4DA1E8]">
      <div className="p-[15px] h-full flex flex-col gap-1">
        <div className="flex justify-start text-[12px]">
          <span>{name}</span>
        </div>
        <div className="h-[50%] flex items-center justify-between">
          <div className="w-1/2 flex">
            <span className="text-[32px]">{number}</span>
          </div>
          <div className="w-1/2 flex justify-end">
            <div className="h-[30px] w-[30px] flex items-center justify-center border border-[#4DA1E8] rounded-full">
              {icon}
            </div>
          </div>
        </div>
        <div className="flex justify-start text-[12px]">
          <span>Xem chi tiết</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
