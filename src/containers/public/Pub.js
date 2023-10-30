import { useState, React } from "react";
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

import icons from "../../util/icons";

const { BiSolidHome, BiBell, BsCaretDownFill } = icons;

const Pub = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
    <div className="w-full h-full">
      <div className="flex justify-center items-center fixed z-[999] top-0 left-0 right-0 w-full h-[90px] bg-white font-roboto border-b border-[#CDD1D5] shadow-md">
        <div className="">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/music-ed1de.appspot.com/o/Logo-2.png?alt=media&token=ee546b4d-234c-4a89-a40d-fd7a589afcdb&_gl=1*1abnhdb*_ga*Njk0MjA5MDAzLjE2OTgwODYwNjA.*_ga_CW55HF8NVT*MTY5ODIwNTE5MC4zLjEuMTY5ODIwNTIwNC40Ni4wLjA."
            alt="logo"
            className="w-[360px]"
          />
        </div>
      </div>
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
            <img
              src="https://firebasestorage.googleapis.com/v0/b/music-ed1de.appspot.com/o/congthongtinsinhvien.png?alt=media&token=6b9bacc6-20c6-4090-a879-b42ba8564c8e&_gl=1*r6idoc*_ga*Njk0MjA5MDAzLjE2OTgwODYwNjA.*_ga_CW55HF8NVT*MTY5ODIwNzI4NC40LjEuMTY5ODIwNzI5Ny40Ny4wLjA."
              alt="img"
              className="mt-[30px]"
            />
            <p className="font-bold text-[20px] text-[#005AB7]">ĐĂNG NHẬP</p>
            <div className="flex flex-col items-center justify-center">
              <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
                <TextField
                  id="outlined-required"
                  label="Username"
                  size="small"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  size="small"
                />
              </FormControl>
            </div>
            <div className="flex items-center justify-center">
              <Button variant="contained">ĐĂNG NHẬP</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pub;
