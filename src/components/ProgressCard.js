import React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import Typography from "@mui/material/Typography";

const data = [
  { label: "Tín chỉ đã học", value: 130, color: "#0088FE" },
  { label: "Tín chỉ còn thiếu", value: 20, color: "#00C49F" },
];

const sizing = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  legend: { hidden: true },
};
const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}%`;
};

const ProgressCard = () => {
  return (
    <div className="w-[25%] bg-white font-roboto">
      <div className="h-full w-full p-[10px]">
        <div className="w-full border-b-[0.5px] flex justify-start">
          <span className="font-bold text-[16px] pb-[10px] opacity-60">
            Tiến độ học tập
          </span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <PieChart
            series={[
              {
                outerRadius: 80,
                data,
                arcLabel: getArcLabel,
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontSize: 14,
              },
            }}
            {...sizing}
          />
          <Typography>Biểu đồ tiến độ học tập</Typography>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
