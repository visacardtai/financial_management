import React, { useRef, useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import useAuth from "../../context/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as apis from "../../apis";
import axios from "../../apis/axios";
import icons from "../../util/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { toast } from "react-toastify";

const { BiSolidHome, BiBell, BsCaretDownFill } = icons;

const HomeIn = () => {
  const { role } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const fetchApi = async () => {
      try {
        const response = await axios.post(
          "/auth/authenticate",
          JSON.stringify({ username, password }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (response?.status === 200) {
          const accessToken = response?.data?.accessToken;
          const roles = response?.data?.role;
          dispatch(actions.setRole(roles));
          dispatch(actions.setIdUser(response?.data?.id));
          dispatch(actions.setInfoUser(response?.data?.profile));
          setAuth({ username, password, roles, accessToken });
          if (roles.find((role) => role === "ROLE_SINHVIEN")) {
            console.log("sinhvien");
            navigate("/sinh-vien", { replace: true });
          } else if (roles.find((role) => role === "ROLE_GIANGVIEN")) {
            console.log("giangvien");
            navigate("/giang-vien", { replace: true });
          } else {
            navigate("/chuyen-vien", { replace: true });
          }
        }
      } catch (error) {
        toast.error("Tài khoản mật khẩu không chính xác");
        console.log(error);
      }
    };
    // eslint-disable-next-line
    if (username !== "" && password !== "") {
      fetchApi();
    }
  };
  const posterData = [
    {
      month: "Tháng 08",
      top: "01",
      header: `Thông báo V/v: Thu học phí hệ Đại học chính quy Học kỳ I năm
    học 2023-2024`,
      sub: `Căn cứ Quyết định 1989/QĐ-HV ngày 28/12/2022 của Giám đốc Học
    viện Công nghệ Bưu chính Viễn thông v/v Ban hành quy định...`,
    },
    {
      month: "Tháng 08",
      top: "01",
      header: `Thông báo V/v: Thu học phí hệ Đại học chính quy Học kỳ I năm
    học 2023-2024`,
      sub: `Căn cứ Quyết định 1989/QĐ-HV ngày 28/12/2022 của Giám đốc Học
    viện Công nghệ Bưu chính Viễn thông v/v Ban hành quy định...`,
    },
    {
      month: "Tháng 08",
      top: "01",
      header: `Thông báo V/v: Thu học phí hệ Đại học chính quy Học kỳ I năm
    học 2023-2024`,
      sub: `Căn cứ Quyết định 1989/QĐ-HV ngày 28/12/2022 của Giám đốc Học
    viện Công nghệ Bưu chính Viễn thông v/v Ban hành quy định...`,
    },
    {
      month: "Tháng 08",
      top: "01",
      header: `Thông báo V/v: Thu học phí hệ Đại học chính quy Học kỳ I năm
    học 2023-2024`,
      sub: `Căn cứ Quyết định 1989/QĐ-HV ngày 28/12/2022 của Giám đốc Học
    viện Công nghệ Bưu chính Viễn thông v/v Ban hành quy định...`,
    },
    {
      month: "Tháng 08",
      top: "01",
      header: `Thông báo V/v: Thu học phí hệ Đại học chính quy Học kỳ I năm
      học 2023-2024`,
      sub: `Căn cứ Quyết định 1989/QĐ-HV ngày 28/12/2022 của Giám đốc Học
      viện Công nghệ Bưu chính Viễn thông v/v Ban hành quy định...`,
    },
  ];
  return (
    <div className="w-full h-full flex mt-[102px] gap-2 px-2">
      <div className="w-[80%] flex flex-col items-center justify-center">
        <div className="w-[90%]">
          <div className="w-full h-[50px] ">
            <div className="w-fit h-[50px] flex items-center justify-center">
              <p className="p-2 border">TIN TỨC - SỰ KIÊN</p>
            </div>
          </div>
          <div className="w-full h-[500px]">
            {posterData?.map((item) => (
              <div className="w-full h-[100px] flex items-center justify-items-start border-t-[2px]">
                <div className="w-[120px] h-[80px] flex flex-col items-center justify-center">
                  <p className="w-[80px] h-[30px] bg-[#005AB7] text-white">
                    {item?.month}
                  </p>
                  <p className="w-[80px] h-[50px] text-[#005AB7] text-[30px] font-semibold">
                    {item?.top}
                  </p>
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-[20px] font-semibold">{item?.header}</p>
                  <p>{item?.sub}</p>
                  <p className="text-[14px] text-main-100">Xem chi tiết</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[20%] flex items-center justify-center bg-gradient-to-r from-[#D0E1FC] to-[#72D1FA] rounded-lg">
        <div className="w-full h-[620px] border-[2px] rounded-lg flex flex-col items-center gap-3">
          <span className="mt-5 text-[22px] font-medium text-[#005AB7]">
            TÀI CHÍNH ĐÀO TẠO
          </span>
          <p className="font-bold text-[20px] text-[#005AB7]">ĐĂNG NHẬP</p>
          <div className="flex flex-col items-center justify-center">
            <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
              <TextField
                id="outlined-required"
                label="Username"
                size="small"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                value={password}
                autoComplete="current-password"
                size="small"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </div>
          <div className="flex items-center justify-center">
            <Button variant="contained" onClick={handleLogin}>
              ĐĂNG NHẬP
            </Button>
          </div>

          <NavLink to="tra-cuu-hoa-don" key="tra-cuu-hoa-don" end={true}>
            <span className="underline">Tra cứu hóa đơn</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HomeIn;
