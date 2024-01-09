import React from "react";
import ReviewCardLec from "./ReviewCardLec";
import icons from "../../util/icons";

const { BsCalendar2Week, RiLineChartFill } = icons;

const GroupLec = () => {
  return (
    <div className="w-[40%]">
      <div className="flex gap-3">
        <div className="w-full flex flex-col gap-3">
          <ReviewCardLec
            data={"Tiết dạy trong tuần"}
            number={12}
            icon={<BsCalendar2Week size="16px" />}
          />
          <ReviewCardLec
            data={"Môn dạy trong kỳ"}
            number={5}
            icon={<RiLineChartFill size="16px" />}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupLec;
