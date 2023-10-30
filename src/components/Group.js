import React from "react";

import ReviewCard from "./ReviewCard";

const Group = () => {
  return (
    <div className="w-[40%]">
      <div className="flex gap-3">
        <div className="w-1/2 flex flex-col gap-3">
          <ReviewCard />
          <ReviewCard />
        </div>
        <div className="w-1/2 flex flex-col gap-3">
          <ReviewCard />
          <ReviewCard />
        </div>
      </div>
    </div>
  );
};

export default Group;
