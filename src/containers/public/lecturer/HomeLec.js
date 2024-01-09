import React from "react";
import { Navigate } from "../../../components";
import { sidebarMenu } from "../../../util/navigateLec";
import { GroupLec, InforLecturer } from "../../../components/lecturer";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const pieParams = { height: 200, margin: { right: 5 } };
const palette = ["red", "blue", "green"];

const lecturer = {
  title: "Thông tin giảng viên",
};
const data = [
  { label: "Tiết đã dạy", value: 100, color: "#0088FE" },
  { label: "Tiết chưa đạt chỉ tiêu", value: 20, color: "#00C49F" },
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

const HomeLec = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <Navigate sidebarMenu={sidebarMenu} />
      <div className="h-[240px] flex gap-3">
        <InforLecturer />
        <GroupLec />
      </div>
      <div className="h-[320px] flex gap-3 mb-3">
        <div className="w-[25%] bg-white font-roboto">
          <div className="h-full w-full p-[10px]">
            <div className="w-full border-b-[0.5px] flex justify-start">
              <span className="font-bold text-[16px] pb-[10px] opacity-60">
                Tiến độ dạy
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
              <Typography>Biểu đồ chỉ tiêu</Typography>
              {/* <span>- Số tiết chỉ tiêu: 120</span>
              <span>- Tổng tiết dạy trong kỳ: 160</span>
              <span>- Số tiết đã dạy: 80</span> */}
            </div>
          </div>
        </div>
        <div className="bg-white w-[30%] font-roboto">
          <div className="h-full w-full p-[10px]">
            <div className="w-full border-b-[0.5px] flex justify-start">
              <span className="font-bold text-[16px] pb-[10px] opacity-60">
                Lịch Dạy
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
        <div className="bg-white w-[45%] font-roboto">
          <div className="h-full w-full p-[10px]">
            <div className="w-full border-b-[0.5px] flex justify-start">
              <span className="font-bold text-[16px] pb-[10px] opacity-60">
                Thống kê tiết dạy
              </span>
            </div>
            <div className="mt-[20px]">
              <Stack
                direction="row"
                width="100%"
                textAlign="center"
                spacing={2}
              >
                <Box flexGrow={1}>
                  <PieChart
                    series={[
                      {
                        data: [
                          {
                            label: "Thực tập cơ sở",
                            value: 40,
                          },
                          { label: "Lập trình Java", value: 25 },
                          { label: "Giải tích 1", value: 30 },
                          { label: "Giải tích 2", value: 50 },
                        ],
                      },
                    ]}
                    {...pieParams}
                  />
                  <Typography>Biểu đồ thống kê tiết dạy</Typography>
                </Box>
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLec;
