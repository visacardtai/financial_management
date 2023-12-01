import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import * as apis from "../../apis";
import * as helpFn from "../../util/HelpFn";

const columns = [
  {
    width: 100,
    label: "Mã",
    dataKey: "id",
  },
  {
    width: 200,
    label: "Tên",
    dataKey: "name",
  },
  {
    width: 240,
    label: "Mô tả",
    dataKey: "description",
  },
  {
    width: 120,
    label: "Hệ số",
    dataKey: "coefficient",
    numeric: true,
  },
  {
    width: 120,
    label: "Giá cơ bản",
    dataKey: "basic_price",
    numeric: true,
  },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? "right" : "left"}
          style={{ width: column.width }}
          sx={{
            backgroundColor: "skyblue",
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? "right" : "left"}
        >
          {column.dataKey !== "basic_price"
            ? row[column.dataKey]
            : helpFn.converVND(row[column.dataKey])}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

const AllPrice = () => {
  const [allPrice, setAllPrice] = useState(null);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await apis.apiGetAllLecturePrice();
        if (response?.status === 200) {
          setAllPrice(response?.data);
          console.log(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Paper style={{ height: "96%", width: "96%" }}>
      <TableVirtuoso
        data={allPrice !== null && allPrice}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
};

export default AllPrice;
