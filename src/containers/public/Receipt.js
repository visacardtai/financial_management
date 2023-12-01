import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import * as apis from "../../apis";
import * as helpFn from "../../util/HelpFn";

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

function Row(props) {
  const { row, index } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{index + 1}</TableCell>
        <TableCell component="th" scope="row" align="center">
          {row?.name}
        </TableCell>
        <TableCell align="center">
          {row?.semester?.name + " - " + row?.semester?.year}
        </TableCell>
        <TableCell align="center">
          {helpFn.convertDateFormat(row?.created_date)}
        </TableCell>
        <TableCell align="center">
          {row?.completion_date !== null
            ? helpFn.convertDateFormat(row?.completion_date)
            : "Đang xử lý"}
        </TableCell>
        <TableCell align="center">
          {helpFn.converVND(total(row?.expensesDetails)[1])}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Chi tiết hóa đơn
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">STT</TableCell>
                    <TableCell align="left">Tên</TableCell>
                    <TableCell align="center">Mã</TableCell>
                    <TableCell align="center">Mô tả</TableCell>
                    <TableCell align="center">Tổng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.expensesDetails?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row" align="left">
                        {index + 1}
                      </TableCell>
                      <TableCell>{item?.expensesPrice?.name}</TableCell>
                      <TableCell align="center">
                        {item?.expensesPrice?.id}
                      </TableCell>
                      <TableCell align="center">
                        {item?.expensesPrice?.description}
                      </TableCell>
                      <TableCell align="center">
                        {helpFn.converVND(item?.expensesPrice?.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const Receipt = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [studentExpenses, setStudentExpenses] = useState([]);
  useEffect(() => {
    const fetchCheck = async () => {
      try {
        const response = await apis.apiGetExpensesByIdStudent(1);
        console.log(response);
        if (response?.status === 200) {
          setStudentExpenses(response?.data);
          console.log(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex gap-3 font-roboto min-h-screen">
      <div className="w-[100%] bg-white flex flex-col justify-center items-center">
        <div className="flex items-center justify-between mx-5 mt-2 border-b-2 p-2 w-[96%]">
          <div className="text-[22px] font-bold text-main-100">
            <p>Khoản chi sinh viên</p>
          </div>
        </div>
        <div className="w-[96%] m-auto mt-6">
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="center">STT</TableCell>
                  <TableCell align="center">Tên khoản chi</TableCell>
                  <TableCell align="center">Học kỳ</TableCell>
                  <TableCell align="center">Ngày tạo</TableCell>
                  <TableCell align="center">Ngày hoàn tất</TableCell>
                  <TableCell align="center">Tổng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentExpenses?.map((row, index) => (
                  <Row key={row?.id} row={row} index={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={studentExpenses?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Receipt;
