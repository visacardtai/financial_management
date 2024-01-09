import React from "react";

import ReviewCard from "./ReviewCard";
import icons from "../util/icons";

const { BsCalendar2Week, LiaCcAmazonPay, BiBookAdd } = icons;

const Group = () => {
  return (
    <div className="w-[40%]">
      <div className="flex gap-3">
        <div className="w-1/2 flex flex-col gap-3">
          <ReviewCard
            name={"Lịch học trong tuần"}
            number={10}
            icon={<BsCalendar2Week size="16px" />}
          />
          <ReviewCard
            name={"Số môn đã học"}
            number={32}
            icon={<BiBookAdd size="16px" />}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-3">
          <ReviewCard
            name={"Lịch học trong tháng"}
            number={20}
            icon={<BsCalendar2Week size="16px" />}
          />
          <ReviewCard
            name={"Số hóa đơn"}
            number={3}
            icon={<LiaCcAmazonPay size="16px" />}
          />
        </div>
      </div>
    </div>
  );
};

export default Group;
