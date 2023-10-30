import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// Input select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import icons from "../../util/icons";
import * as apis from "../../apis";
import * as helpFn from "../../util/HelpFn";

const { BiPrinter } = icons;

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}
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
          {helpFn.convertDateFormat(row?.expiration_date)}
        </TableCell>
        <TableCell align="center">
          {helpFn.convertDateFormat(row?.date_of_payment)}
        </TableCell>
        <TableCell align="center">{total(row?.invoiceDetails)[0]}</TableCell>
        <TableCell align="center">
          {helpFn.converVND(total(row?.invoiceDetails)[1])}
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
                    <TableCell align="center">Tín chỉ</TableCell>
                    <TableCell align="center">Giá</TableCell>
                    <TableCell align="center">Tổng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.invoiceDetails?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row" align="left">
                        {index}
                      </TableCell>
                      <TableCell>{item?.subject?.name}</TableCell>
                      <TableCell align="center">{item?.subject?.id}</TableCell>
                      <TableCell align="center">
                        {item?.subject?.creditNum}
                      </TableCell>
                      <TableCell align="center">
                        {helpFn.converVND(item?.creditPrice?.price)}
                      </TableCell>
                      <TableCell align="center">
                        {helpFn.converVND(
                          item?.creditPrice?.price * item?.subject?.creditNum
                        )}
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

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
//   createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
//   createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
//   createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
// ];

const Debt = () => {
  const [age, setAge] = React.useState("Tất cả");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [invoice, setInvoice] = useState([]);
  useEffect(() => {
    const fetchCheck = async () => {
      try {
        const response = await apis.apiGetInvoiceByStatus(1, 1);
        console.log(response);
        if (response?.status === 200) {
          setInvoice(response?.data);
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
    <div className="flex gap-3 font-roboto">
      <div className="w-[100%] bg-white flex flex-col items-center justify-center">
        <div className="flex items-center justify-between mx-5 mt-2 border-b-2 p-2 w-[96%]">
          <div className="text-[22px] font-bold text-main-100">
            <p>Tra Cứu Công Nợ</p>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <p>Đợt</p>
            <FormControl sx={{ m: 0.2, minWidth: 140 }} size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={age}
                defaultValue="Tất cả"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Tất cả">Tất cả</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <div className="bg-main-100 text-white px-2 flex items-center justify-center gap-1 rounded-md h-8 cursor-pointer">
              <BiPrinter /> <p className="text-[14px]">In công nợ</p>
            </div>
          </div>
        </div>
        <div className="w-[96%] m-auto mt-6">
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="center">STT</TableCell>
                  <TableCell align="center">Tên hóa đơn</TableCell>
                  <TableCell align="center">Học kỳ</TableCell>
                  <TableCell align="center">Ngày hết hạn</TableCell>
                  <TableCell align="center">Ngày thanh toán</TableCell>
                  <TableCell align="center">Tổng tín chỉ</TableCell>
                  <TableCell align="center">Tổng tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoice?.map((row, index) => (
                  <Row key={row?.id} row={row} index={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={invoice?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
        <div>
          <p>Tổng nộp học phí</p>
          <p>Tổng công nợ</p>
          <p>Tổng công nợ</p>
          <p>Tổng công nợ</p>
          <p>Tổng công nợ</p>
          <p>Tổng công nợ</p>
          <p>Tổng công nợ</p>
        </div>
      </div>
    </div>
  );
};

export default Debt;
