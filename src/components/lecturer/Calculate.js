import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as helpFn from "../../util/HelpFn";
import Scrollbars from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";

const Calculate = () => {
  const { dataCalculate } = useSelector((state) => state.app);
  const [invoice, setInvoice] = useState([]);

  const total = (details) => {
    let sumCredit = 0;
    let sumMoney = 0;
    details?.map((item) => {
      sumCredit += item?.subject?.creditNum;
      sumMoney += item?.creditPrice?.price * item?.subject?.creditNum;
      return 1;
    });
    return [sumCredit, sumMoney];
  };
  console.log(dataCalculate);

  const totalPeriod = (details) => {
    let theory = 0;
    let practical = 0;
    details?.map((item) => {
      theory += item?.quantity;
      practical += item?.practical;
      return 1;
    });
    let sum = theory + practical * 0.5;
    return [theory, practical, sum];
  };
  return (
    <>
      {dataCalculate !== null && (
        <div className="w-[96%] m-auto mt-6">
          <Scrollbars style={{ width: "100%", height: 400 }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 600 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      colSpan={6}
                      style={{ color: "blue", fontSize: "20px" }}
                    >
                      Thông tin chi tiết
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="center"
                      colSpan={2}
                      style={{ color: "blue", fontSize: "18px" }}
                    >
                      Giá tiết: {helpFn.converVND(dataCalculate?.price)}
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={2}
                      style={{ color: "blue", fontSize: "18px" }}
                    >
                      Hệ số trội giờ: {dataCalculate?.coefficient}
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={2}
                      style={{ color: "blue", fontSize: "18px" }}
                    >
                      Chỉ tiêu: {dataCalculate?.targets}
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ background: "#33B5E5" }}>
                    <TableCell align="center" style={{ color: "white" }}>
                      STT
                    </TableCell>
                    <TableCell align="left" style={{ color: "white" }}>
                      Tên môn
                    </TableCell>
                    <TableCell align="center" style={{ color: "white" }}>
                      Hệ số lớp
                    </TableCell>
                    <TableCell align="center" style={{ color: "white" }}>
                      Lý thuyết
                    </TableCell>
                    <TableCell align="center" style={{ color: "white" }}>
                      Thực hành
                    </TableCell>
                    <TableCell align="center" style={{ color: "white" }}>
                      Tổng
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataCalculate?.details?.map((item, index) => (
                    <TableRow key={item?.id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="left">{item?.subject?.name}</TableCell>
                      <TableCell align="center">
                        {item?.classCoefficient?.coefficient}
                      </TableCell>
                      <TableCell align="center">
                        {totalPeriod(item?.detailsSub)?.[0]}
                      </TableCell>
                      <TableCell align="center">
                        {totalPeriod(item?.detailsSub)?.[1]}
                      </TableCell>
                      <TableCell align="center">
                        {(
                          item?.theory_total *
                            item?.classCoefficient?.coefficient +
                          item?.practical_total * 0.5
                        )?.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={4}></TableCell>
                    <TableCell rowSpan={4}></TableCell>
                    <TableCell rowSpan={4}></TableCell>
                    <TableCell rowSpan={4}></TableCell>
                    <TableCell colSpan={1}>Tổng tiết dạy</TableCell>
                    <TableCell align="right">
                      {dataCalculate?.total?.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={1}>Số tiết thiếu</TableCell>
                    <TableCell align="right">
                      {dataCalculate?.targets > dataCalculate?.total
                        ? (
                            dataCalculate?.targets - dataCalculate?.total
                          )?.toFixed(2)
                        : 0}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={1}>Số tiết trội</TableCell>
                    <TableCell align="right">
                      {dataCalculate?.targets > dataCalculate?.total
                        ? 0
                        : (
                            dataCalculate?.total - dataCalculate?.targets
                          )?.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={1}>Tổng tiền</TableCell>
                    <TableCell align="right">
                      {helpFn.converVND(dataCalculate?.sp_total)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbars>
        </div>
      )}
    </>
  );
};

export default Calculate;
