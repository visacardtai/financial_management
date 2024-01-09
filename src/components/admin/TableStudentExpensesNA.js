import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { useEffect, useState } from "react";

import * as apis from "../../apis";
import * as helpFn from "../../util/HelpFn";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import icons from "../../util/icons";
const { GoSearch } = icons;

function createData(id, name, calories, fat, carbs, protein) {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData(1, "Cupcake", 305, 3.7, 67, 4.3),
  createData(2, "Donut", 452, 25.0, 51, 4.9),
  createData(3, "Eclair", 262, 16.0, 24, 6.0),
  createData(4, "Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
  createData(6, "Honeycomb", 408, 3.2, 87, 6.5),
  createData(7, "Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData(8, "Jelly Bean", 375, 0.0, 94, 0.0),
  createData(9, "KitKat", 518, 26.0, 65, 7.0),
  createData(10, "Lollipop", 392, 0.2, 98, 0.0),
  createData(11, "Marshmallow", 318, 0, 81, 2.0),
  createData(12, "Nougat", 360, 19.0, 9, 37.0),
  createData(13, "Oreo", 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "Id",
  },
  {
    id: "student_name",
    numeric: false,
    disablePadding: false,
    label: "Tên sinh viên",
  },
  {
    id: "student_id",
    numeric: false,
    disablePadding: false,
    label: "MSV",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Hóa đơn",
  },
  {
    id: "name2",
    numeric: false,
    disablePadding: false,
    label: "Kỳ",
  },
  {
    id: "year",
    numeric: false,
    disablePadding: false,
    label: "Năm",
  },
  {
    id: "created_date",
    numeric: false,
    disablePadding: false,
    label: "Ngày tạo",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Trạng thái",
  },
  {
    id: "total",
    numeric: false,
    disablePadding: false,
    label: "Tổng",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id === "id" ? "left" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              backgroundColor: "skyblue",
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const TableStudentExpensesNA = () => {
  const { role, refreshBe } = useSelector((state) => state.app);
  const axiosPrivate = useAxiosPrivate();
  const { isBlur } = useSelector((state) => state.app);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [expPrice, setExpPrice] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await apis.apiGetAllStudentExpenses(
          axiosPrivate,
          0,
          1
        );
        if (response?.status === 200) {
          console.log(response);
          setExpPrice(response?.data);

          const filteredStudents = response?.data?.filter((item) =>
            item?.name.toLowerCase().includes(inputValue.toLowerCase())
          );
          setDataSearch(filteredStudents);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
    setSelected([]);
  }, [refreshBe]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(dataSearch, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, dataSearch]
  );

  const handleAdd = () => {
    dispatch(actions.changeTypeBlur(7));
    dispatch(actions.checkBlur(!isBlur));
  };

  const handleAddMore = () => {
    dispatch(actions.setTypeUpload(2));
    dispatch(actions.changeTypeBlur(6));
    dispatch(actions.checkBlur(!isBlur));
  };

  const handlDelete = () => {
    if (selected.length !== 0) {
      dispatch(actions.changeTypeBlur(1));
      dispatch(actions.changeTypeDelete(7));
      dispatch(actions.checkBlur(!isBlur));
      dispatch(actions.listDelete(selected));
    } else {
      console.log("Non");
    }
  };

  const handleCensor = () => {
    if (selected.length !== 0) {
      dispatch(actions.changeTypeBlur(1));
      dispatch(actions.changeTypeDelete(15));
      dispatch(actions.checkBlur(!isBlur));
      dispatch(actions.listDelete(selected));
    } else {
      console.log("Non");
    }
  };

  const handleChangeInput = (event) => {
    setInputValue(event.target.value);
  };
  const handlePrint = () => {
    const filteredStudents = expPrice.filter((item) =>
      item?.student_name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setDataSearch(filteredStudents);
  };

  useEffect(() => {
    handlePrint();
  }, [inputValue]);

  return (
    <div className="w-full flex flex-col items-center relative font-roboto">
      <div className="absolute right-[5%] top-[-55px] flex gap-3 items-center justify-center">
        <div className="flex gap-2 justify-center items-center">
          <div className="bg-[#f8fbfd] flex items-center justify-center border px-2 gap-2 rounded-full">
            <GoSearch size={24} />
            <input
              className="py-2 bg-[#f8fbfd] focus:outline-none"
              type="text"
              placeholder="Nhập mã sinh viên"
              value={inputValue}
              onChange={handleChangeInput}
            />
          </div>
        </div>
        <button
          onClick={handleCensor}
          className="bg-[#61f461] hover:bg-[#56fb56] w-[80px] h-[30px] rounded-xl text-white"
        >
          Duyệt
        </button>
      </div>

      <div className="w-[90%]">
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 600 }}
                aria-labelledby="tableTitle"
                size={"medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={dataSearch.length}
                />
                <TableBody>
                  {visibleRows?.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell align="left">{row?.id}</TableCell>
                        <TableCell align="left">{row?.student_name}</TableCell>
                        <TableCell align="left">{row?.student_id}</TableCell>
                        <TableCell align="left">{row?.name}</TableCell>
                        <TableCell align="left">
                          {row?.semester?.name}
                        </TableCell>
                        <TableCell align="left">
                          {row?.semester?.year}
                        </TableCell>
                        <TableCell align="left">
                          {helpFn.convertDateFormat(row?.created_date)}
                        </TableCell>
                        <TableCell align="left">Chờ duyệt</TableCell>
                        <TableCell align="left">
                          {helpFn.converVND(row?.total)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={dataSearch.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default TableStudentExpensesNA;
