import React from "react";

const TermCard = () => {
  return (
    <div className="bg-white w-[30%] font-roboto">
      <div className="h-full w-full p-[10px]">
        <div className="w-full border-b-[0.5px] flex justify-start">
          <span className="font-bold text-[16px] pb-[10px] opacity-60">
            Lịch học trong tuần
          </span>
        </div>
        <div className="flex flex-col items-start p-5">
          <span>- Thứ 2: Thực tập cơ sở (Từ tiết 1-3)</span>
          <span>- Thứ 2: Giải tích 1 (Từ tiết 1-3)</span>
          <span className="text-main-100">
            - Thứ 3: Lập trình Java (Từ tiết 5-7)
          </span>
          <span>- Thứ 4: Giải tích 2 (Từ tiết 1-5)</span>
          <span>- Thứ 6: Thực tập cơ sở (Từ tiết 1-3)</span>
          <span>- Thứ 7: Giải tích 1 (Từ tiết 1-3)</span>
          <span>- Thứ 7: Lập trình Java (Từ tiết 1-3)</span>
        </div>
      </div>
    </div>
  );
};

export default TermCard;
