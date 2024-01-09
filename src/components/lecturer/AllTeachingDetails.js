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
        <TableCell component="th" scope="row" align="left">
          {row?.subject?.name}
        </TableCell>
        <TableCell align="center">{row?.subject?.creditNum}</TableCell>
        <TableCell align="center">{row?.subject?.theoryNum}</TableCell>
        <TableCell align="center">{row?.subject?.practicalNum}</TableCell>
        <TableCell align="center">{row?.total}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Chi tiết
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Mã</TableCell>
                    <TableCell align="left">Tên</TableCell>
                    <TableCell align="center">Ngày dạy</TableCell>
                    <TableCell align="center">Số tiết lý thuyết</TableCell>
                    <TableCell align="center">Số tiết thực hành</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.detailsSub?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row" align="left">
                        {index}
                      </TableCell>
                      <TableCell>{item?.name}</TableCell>
                      <TableCell align="center">
                        {helpFn.convertDateFormat(item?.attendance)}
                      </TableCell>
                      <TableCell align="center">{item?.quantity}</TableCell>
                      <TableCell align="center">{item?.practical}</TableCell>
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

const AllTeachingDetails = ({ data }) => {
  const [invoice, setInvoice] = useState([]);
  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "skyblue",
                  }}
                />
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: "skyblue",
                  }}
                >
                  Mã
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: "skyblue",
                  }}
                >
                  Tên môn học
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: "skyblue",
                  }}
                >
                  Số tín chỉ
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: "skyblue",
                  }}
                >
                  Tiết lý thuyết
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: "skyblue",
                  }}
                >
                  Tiết thực hành
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: "skyblue",
                  }}
                >
                  Tổng tiết đã dạy
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, index) => (
                <Row key={row?.id} row={row} index={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default AllTeachingDetails;
