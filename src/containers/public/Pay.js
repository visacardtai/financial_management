import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Input select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Import table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { styled } from "@mui/system";
import icons from "../../util/icons";
import DropDown from "../../components/DropDown";

import * as apis from "../../apis";
import * as helpFn from "../../util/HelpFn";
import { redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
const { BiSolidHome, BiBell, BsCaretDownFill } = icons;

const Pay = () => {
  const { home, idUser, infoUser } = useSelector((state) => state.app);
  const [checkInvoice, setCheckInvoice] = useState(false);
  const [age, setAge] = React.useState("Tất cả");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const TAX_RATE = 0.07;

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function priceRow(qty, unit) {
    return qty * unit;
  }

  function createRow(desc, qty, unit, a, b) {
    const price = priceRow(qty, unit);
    return { desc, qty, a, b, unit, price };
  }

  function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  const rows = [
    createRow("Paperclips (Box)", 100, 1, 1, 1.15),
    createRow("Paper (Case)", 10, 1, 1, 45.99),
    createRow("Waste Basket", 2, 1, 1, 17.99),
    createRow("Waste Basket", 2, 1, 1, 17.99),
    createRow("Waste Basket", 2, 1, 1, 17.99),
    createRow("Waste Basket", 2, 1, 1, 17.99),
    createRow("Waste Basket", 2, 1, 1, 17.99),
  ];

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const [invoice, setInvoice] = useState([]);
  useEffect(() => {
    const fetchCheck = async () => {
      try {
        const response = await apis.apiGetInvoiceByStatus(idUser, 0);
        console.log(response);
        if (response?.status === 200) {
          setInvoice(response?.data);
          if (response?.data?.length > 0) {
            setCheckInvoice(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const [imgSelect, setImgSelect] = useState(null);
  const [payMethod, setPayMethod] = useState("");
  const handleClickImgPay = (index, paymethod) => {
    setImgSelect(index);
    setPayMethod(paymethod);
  };

  const [redirectUrl, setRedirectUrl] = useState("");
  const handleClickPay = async () => {
    try {
      const response = await apis.apiPayment(invoice[0]?.total, invoice[0]?.id);
      setRedirectUrl(response?.data);
      if (response?.status === 200) {
        console.log("abc");
        window.location.href = response?.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-3 font-roboto">
      <div className="w-[100%] bg-white flex flex-col justify-center items-center">
        <div className="flex items-center justify-between mx-5 mt-2 border-b-2 p-2 w-[96%]">
          <div className="text-[22px] font-bold text-main-100">
            <p>Thanh Toán Trực Tuyến</p>
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
          </div>
        </div>
        <div className="w-[96%] m-auto mt-6">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={7}
                    style={{ color: "blue", fontSize: "20px" }}
                  >
                    Thông tin hóa đơn
                  </TableCell>
                  {/* <TableCell
                    align="right"
                    style={{ color: "blue", fontSize: "20px" }}
                  >
                    Giá
                  </TableCell> */}
                </TableRow>
                <TableRow style={{ background: "#33B5E5" }}>
                  <TableCell align="center" style={{ color: "white" }}>
                    STT
                  </TableCell>
                  <TableCell align="left" style={{ color: "white" }}>
                    Tên môn học
                  </TableCell>
                  <TableCell align="center" style={{ color: "white" }}>
                    Mã môn học
                  </TableCell>
                  <TableCell align="center" style={{ color: "white" }}>
                    Nội dung thu
                  </TableCell>
                  <TableCell align="center" style={{ color: "white" }}>
                    Tín chỉ
                  </TableCell>
                  <TableCell align="center" style={{ color: "white" }}>
                    Giá tín chỉ
                  </TableCell>
                  <TableCell align="center" style={{ color: "white" }}>
                    Tổng
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoice?.[0]?.invoiceDetails?.map((item, index) => (
                  <TableRow key={item?.id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="left">{item?.subject?.name}</TableCell>
                    <TableCell align="center">{item?.subject?.id}</TableCell>
                    <TableCell align="center">Học Phí</TableCell>
                    <TableCell align="center">
                      {item?.subject?.creditNum}
                    </TableCell>
                    <TableCell align="center">
                      {helpFn.converVND(item?.creditPrice?.price)}
                    </TableCell>
                    <TableCell align="center">
                      {helpFn.converVND(
                        item?.subject?.creditNum * item?.creditPrice?.price
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell rowSpan={4}></TableCell>
                  <TableCell rowSpan={4}></TableCell>
                  <TableCell rowSpan={4}></TableCell>
                  <TableCell rowSpan={4}></TableCell>
                  <TableCell colSpan={2}>Tổng số tín chỉ</TableCell>
                  <TableCell align="right">
                    {total(invoice[0]?.invoiceDetails)[0]}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Tổng tiền thanh toán</TableCell>
                  <TableCell align="right">
                    {helpFn.converVND(total(invoice[0]?.invoiceDetails)[1])}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="mt-10 flex flex-col items-start w-[96%] gap-1">
          <div className="flex gap-1">
            <p>1. Để thanh toán trực tuyến qua ngân hàng</p>
            <p className="text-red-600 font-bold">thẻ ATM</p>phải đăng ký
            <p className="text-red-600 font-bold">Thanh toán online</p>.
          </div>
          <div className="flex gap-1">
            <p>2. Vui lòng kiểm tra</p>
            <p className="text-red-600 font-bold">HẠN MỨC THẺ</p> trước khi
            thanh toán.
          </div>
          <div className="flex gap-1">
            <p>3. Xem hướng dẫn thanh toán</p>
            <p className="text-blue-500 font-bold cursor-pointer">TẠI ĐÂY</p>.
          </div>
          <p className="flex gap-1">
            4. Khuyến cáo thanh toán qua các loại thẻ ATM nội địa, QR-Code.
          </p>
        </div>
        {checkInvoice ? (
          <div className="w-[96%] my-10 flex">
            <div className="w-1/2 flex flex-col gap-1 justify-center items-center border-r-[3px]">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/music-ed1de.appspot.com/o/vnpay.png?alt=media&token=206c992b-3912-4f67-91c2-6d9918630667&_gl=1*1g6bpxr*_ga*Njk0MjA5MDAzLjE2OTgwODYwNjA.*_ga_CW55HF8NVT*MTY5ODYwMjQ3OS41LjEuMTY5ODYwMjU3Mi42MC4wLjA."
                alt="vnpay"
                className={`w-[160px] h-[90px] border-[2px] hover:border-red-600 ${
                  imgSelect === 1 ? "border-red-600" : ""
                }`}
                onClick={() => handleClickImgPay(1, "VnPay")}
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/music-ed1de.appspot.com/o/qrcode.png?alt=media&token=8103cbb2-4a74-4a54-8fc9-eeeb62fd1a9f&_gl=1*eripvy*_ga*Njk0MjA5MDAzLjE2OTgwODYwNjA.*_ga_CW55HF8NVT*MTY5ODYwMjQ3OS41LjEuMTY5ODYwMzA2My40OS4wLjA."
                alt="qrcode"
                className={`w-[160px] h-[90px] border-[2px] hover:border-red-600 ${
                  imgSelect === 2 ? "border-red-600" : ""
                }`}
                onClick={() => handleClickImgPay(2, "QR-Code")}
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/music-ed1de.appspot.com/o/atm.png?alt=media&token=5aa6d6ee-b948-45eb-97a0-9353ef44e787&_gl=1*doqkj1*_ga*Njk0MjA5MDAzLjE2OTgwODYwNjA.*_ga_CW55HF8NVT*MTY5ODYwMjQ3OS41LjEuMTY5ODYwMjYyMC4xMi4wLjA."
                alt="atm"
                className={`w-[160px] h-[90px] border-[2px] hover:border-red-600 ${
                  imgSelect === 3 ? "border-red-600" : ""
                }`}
                onClick={() => handleClickImgPay(3, "Ngân hàng")}
              />
            </div>
            {imgSelect !== null && (
              <div className="w-1/2 flex items-center justify-center">
                <div className="w-[400px] flex flex-col items-start">
                  <p className="w-full border-b-[1px] flex items-center justify-center py-3 font-semibold">
                    Chi tiết giao dịch
                  </p>
                  <div className="flex flex-col w-full text-[14px]">
                    <div className="flex justify-between border-b-[1px] py-3">
                      <p>Tên giao dịch</p>
                      <p>Thanh toán học phí</p>
                    </div>
                    <div className="flex justify-between border-b-[1px] py-3">
                      <p>Mã sinh viên</p>
                      <p>{idUser}</p>
                    </div>
                    <div className="flex justify-between border-b-[1px] py-3">
                      <p>Họ tên</p>
                      <p>{infoUser?.fullname}</p>
                    </div>
                    <div className="flex justify-between border-b-[1px] py-3">
                      <p>Ngân hàng</p>
                      <p>NCB</p>
                    </div>
                    <div className="flex justify-between border-b-[1px] py-3">
                      <p>Phương thức thanh toán</p>
                      <p>{payMethod}</p>
                    </div>
                    <div className="flex justify-between border-b-[1px] py-3">
                      <p>Tổng tiền</p>
                      <p>{helpFn.converVND(invoice[0]?.total)}</p>
                    </div>
                  </div>

                  <div className="w-full mt-[24px] bg-main-100 py-2 rounded-md text-white hover:bg-main-200">
                    <button className="w-full" onClick={handleClickPay}>
                      Xử lý thanh toán
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-[220px]"></div>
        )}
      </div>
    </div>
  );
};

export default Pay;

// ?vnp_Amount=1000000
// &vnp_BankCode=NCB
// &vnp_BankTranNo=20170829152730
// &vnp_CardType=ATM
// &vnp_OrderInfo=Thanh+toan+don+hang+thoi+gian%3A+2017-08-29+15%3A27%3A02
// &vnp_PayDate=20170829153052
// &vnp_ResponseCode=00
// &vnp_TmnCode=2QXUI4J4
// &vnp_TransactionNo=12996460
// &vnp_TxnRef=23597
// &vnp_SecureHashType=SHA256
// &vnp_SecureHash=20081f0ee1cc6b524e273b6d4050fefd

// https://sandbox.vnpayment.vn/tryitnow/Home/VnPayIPN?vnp_Amount=72000000&vnp_BankCode=NCB&vnp_BankTranNo=VNP14167084&vnp_CardType=ATM&vnp_OrderInfo=Thanh+toan+don+hang%3A42707590&vnp_PayDate=20231105004008&vnp_ResponseCode=00&vnp_TmnCode=10N2N7FT&vnp_TransactionNo=14167084&vnp_TxnRef=42707590&vnp_SecureHashType=SHA256&vnp_SecureHash=cf31fd62054c7081a7f7cb15567bd4d104da1be9aa71427409c077f119cd8d553921267c85b9d65b6a3ee014abc6b60bef200ee229eadd0f3b96816b6ff942e1

// https://sandbox.vnpayment.vn/tryitnow/Home/VnPayIPN?vnp_Amount=72000000&vnp_BankCode=NCB&vnp_BankTranNo=VNP14167084&vnp_CardType=ATM&vnp_OrderInfo=Thanh+toan+don+hang%3A42707590&vnp_PayDate=20231105004008&vnp_ResponseCode=00&vnp_TmnCode=10N2N7FT&vnp_TransactionNo=14167084&vnp_TransactionStatus=00&vnp_TxnRef=42707590&vnp_SecureHashType=SHA256&vnp_SecureHash=cf31fd62054c7081a7f7cb15567bd4d104da1be9aa71427409c077f119cd8d553921267c85b9d65b6a3ee014abc6b60bef200ee229eadd0f3b96816b6ff942e1
