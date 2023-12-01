import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import * as apis from "../../apis";

const chartSetting = {
  yAxis: [
    {
      label: "Biểu đồ giảng dạy (tiết)",
    },
  ],
  width: 1024,
  height: 320,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};
const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: "Jan",
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: "Fev",
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: "Mar",
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: "Apr",
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: "May",
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: "June",
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: "July",
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: "Aug",
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: "Sept",
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: "Oct",
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: "Nov",
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: "Dec",
  },
];

const valueFormatter = (value) => `${value} tiết`;

const ChartSubject = () => {
  const [dataChart, setDataChart] = useState(null);
  useEffect(() => {
    const fetchDataChart = async () => {
      try {
        const response = await apis.apiGetDataChartLecture(1);
        if (response?.status === 200) {
          setDataChart(response?.data);
          console.log(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="h-[360px]">
      <div className="text-[20px] font-bold text-main-100 border-b-2 m-auto w-[96%]">
        <p className="flex justify-start p-1">Biểu đồ giờ giảng</p>
      </div>
      <div className="flex items-center justify-center">
        {dataChart && (
          <BarChart
            dataset={dataChart !== null && dataChart}
            xAxis={[{ scaleType: "band", dataKey: "name" }]}
            series={[
              {
                dataKey: "total",
                label: "Tổng tiết của giảng viên",
                valueFormatter,
              },
              {
                dataKey: "max_total",
                label: "Tổng tiết môn học",
                valueFormatter,
              },
            ]}
            {...chartSetting}
          />
        )}
      </div>
    </div>
  );
};

export default ChartSubject;
