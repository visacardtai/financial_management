import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import icons from "../../util/icons";
import * as apis from "../../apis";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { styled } from "@mui/system";
import { Tabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as BaseTabPanel } from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import { toast } from "react-toastify";
import * as helpFn from "../../util/HelpFn";
import * as XLSX from "xlsx";

import {
  TableChartTeachingPeriodN,
  TableChartTeachingPeriod,
} from "../../components/admin";

const { BiPrinter } = icons;

const ChartTeachingPeriod = () => {
  const axiosPrivate = useAxiosPrivate();
  const [itemSemester, setItemSemester] = React.useState();
  const [semester, setSemester] = React.useState();
  const [chart, setChart] = React.useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await apis.apiGetAllSemester(axiosPrivate);
        if (response?.status === 200) {
          setSemester(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    // eslint-disable-next-line
    fetchApi();
  }, []);

  const handleChangeSemester = (event) => {
    setItemSemester(event.target.value);
  };

  const handleChart = () => {
    const fetchApi = async () => {
      try {
        const response = await apis.apiChartTeachingPeriod(
          axiosPrivate,
          itemSemester
        );
        if (response?.status === 200) {
          toast.success("Lấy dữ liệu thống kê thành công");
          setChart(response?.data);
          console.log("success");
        }
      } catch (error) {
        toast.error("Lấy dữ liệu thống kê thất bại");
        console.log(error);
      }
    };
    // eslint-disable-next-line
    if (itemSemester !== undefined) {
      fetchApi();
    }
  };

  const handleOnExport = () => {
    if (chart !== null) {
      let dataExcel = chart?.list_paid?.map((item) => {
        return {
          "Mã giảng viên": item?.lecturer_id,
          "Họ tên": item?.lecturer_name,
          "Trình độ": item?.qualification,
          "Chức danh": item?.position,
          "Giá tiết": item?.price,
          "Hệ số trội": item?.coefficient,
          "Chỉ tiêu": item?.targets,
          "Tiết đã dạy": item?.period,
          "Tổng tiền": item?.total,
        };
      });

      let dataExcel2 = chart?.list_debt?.map((item) => {
        return {
          "Mã giảng viên": item?.lecturer_id,
          "Họ tên": item?.lecturer_name,
          "Trình độ": item?.qualification,
          "Chức danh": item?.position,
          "Giá tiết": item?.price,
          "Hệ số trội": item?.coefficient,
          "Chỉ tiêu": item?.targets,
          "Tiết đã dạy": item?.period,
          "Tổng tiền": item?.total,
        };
      });

      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(dataExcel);
      XLSX.utils.book_append_sheet(wb, ws, "DSGV đạt chỉ tiêu");

      var ws2 = XLSX.utils.json_to_sheet(dataExcel2);
      XLSX.utils.book_append_sheet(wb, ws2, "DSGV chưa đạt chỉ tiêu");

      XLSX.writeFile(wb, "DS_Giang_Vien.xlsx");
    }
  };

  return (
    <div className="flex flex-col font-roboto">
      <div className="w-full h-[100px] flex items-center justify-between px-4 border-b-2">
        <div>
          <p className="text-[22px] font-medium text-main-200">
            Thống Kê Kỳ Dạy Giảng Viên Theo Kỳ
          </p>
        </div>
        <div className="flex justify-center items-center gap-3">
          <div className="flex justify-start items-center gap-2">
            <div className="flex">
              <p>Học Kỳ</p>
            </div>
            <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
              <InputLabel id="demo-select-small-label">Học Kỳ</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={itemSemester}
                label="Học Kỳ"
                onChange={handleChangeSemester}
              >
                {semester?.length !== 0 &&
                  semester?.map((item) => (
                    <MenuItem value={item?.id} key={item?.id}>
                      {`${item?.year} - ${item?.name}`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <div
            className="bg-main-100 text-white px-2 flex items-center justify-center gap-1 rounded-md h-8 cursor-pointer hover:opacity-70"
            onClick={handleChart}
          >
            <p className="text-[14px]">Thống kê</p>
          </div>
          <div
            className="bg-main-100 text-white px-2 flex items-center justify-center gap-1 rounded-md h-8 cursor-pointer hover:opacity-70"
            onClick={handleOnExport}
          >
            <BiPrinter /> <p className="text-[14px]">Xuất file</p>
          </div>
        </div>
      </div>
      <div className="w-full h-[560px]">
        <Tabs defaultValue={1} className="w-full">
          <TabsList>
            <Tab value={1}>Đạt chỉ tiêu</Tab>
            <Tab value={2}>Chưa đạt</Tab>
          </TabsList>
          <TabPanel value={1}>
            {chart !== null && (
              <TableChartTeachingPeriod dataInvoice={chart?.list_paid} />
            )}
          </TabPanel>
          <TabPanel value={2}>
            {chart !== null && (
              <TableChartTeachingPeriodN dataInvoice={chart?.list_debt} />
            )}
          </TabPanel>
        </Tabs>
      </div>
      {chart !== null && (
        <div className="w-full flex justify-center">
          <div className="w-[96%] h-[50px] bg-sky-300 flex items-center justify-around mb-2 px-2 rounded-md">
            <div>
              <p>Tiền phạt: {helpFn.converVND(chart?.debt)}</p>
            </div>
            <div>
              <p>Tổng tiền: {helpFn.converVND(chart?.paid)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const Tab = styled(BaseTab)`
  font-family: "IBM Plex Sans", sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  line-height: 1.5;
  padding: 8px 12px;
  margin: 6px;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)`
  width: 100%;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
      max-width: 400px;
      background-color: ${blue[500]};
      margin-top: 16px;
      margin-left: 16px;
      border-radius: 12px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      align-content: space-between;
      box-shadow: 0px 4px 6px ${
        theme.palette.mode === "dark" ? "rgba(0,0,0, 0.4)" : "rgba(0,0,0, 0.2)"
      };
      `
);

export default ChartTeachingPeriod;
