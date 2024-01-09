import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const xLabels = [
  "Giải tích 1",
  "Giải tích 2",
  "Thực tập cơ sở",
  "Lập trình Java",
  "Cơ sở dữ liệu",
];

const ResultCard = () => {
  return (
    <div className="bg-white w-[45%] font-roboto">
      <div className="h-full w-full p-[10px]">
        <div className="w-full border-b-[0.5px] flex justify-start">
          <span className="font-bold text-[16px] pb-[10px] opacity-60">
            Kết quả học tập
          </span>
        </div>
        <div>
          <LineChart
            xAxis={[{ scaleType: "point", data: xLabels }]}
            series={[
              {
                data: [6, 4, 8, 9, 8.5],
              },
            ]}
            width={500}
            height={280}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
