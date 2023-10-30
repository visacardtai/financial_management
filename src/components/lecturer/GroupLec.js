import React from "react";
import ReviewCardLec from "./ReviewCardLec";

const GroupLec = () => {
  return (
    <div className="w-[40%]">
      <div className="flex gap-3">
        <div className="w-full flex flex-col gap-3">
          <ReviewCardLec />
          <ReviewCardLec />
        </div>
      </div>
    </div>
  );
};

export default GroupLec;
