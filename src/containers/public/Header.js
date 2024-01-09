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

import icons from "../../util/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import useAuth from "../../context/useAuth";
import { useNavigate } from "react-router-dom";

const { BiSolidHome, BiBell, BsCaretDownFill } = icons;

const Header = () => {
  const { idUser, infoUser } = useSelector((state) => state.app);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAuth();
    dispatch(actions.setRole());
    dispatch(actions.setIdUser());
    dispatch(actions.setInfoUser());
    navigate("/", { replace: true });
  };
  return (
    <div className="fixed z-[999] top-0 left-0 right-0 w-full h-[60px] bg-white flex font-roboto border-b border-[#CDD1D5] shadow-md">
      <div className="w-1/2 h-full">
        <div className="h-full ml-[20%] flex items-center ">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/music-ed1de.appspot.com/o/logo2.png?alt=media&token=5fc922ec-b720-4bcc-bd43-ec5f0fb41013"
            alt="logo"
            className="w-[60px] h-[40px]"
          />
          <p className="ml-3">Học viện Công nghệ Bưu chính</p>
        </div>
      </div>
      <div className="w-1/2 h-full">
        <div className="h-full flex justify-end items-center mr-[20%] gap-8">
          <div className="flex items-center justify-center gap-1 cursor-pointer">
            <div>
              <BiSolidHome size="20px" />
            </div>
            <p>Trang chủ</p>
          </div>
          <div className="flex items-center justify-center gap-1 cursor-pointer">
            <div>
              <BiBell size="20px" />
            </div>
            <p>Thông báo</p>
          </div>
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={handleClick}
          >
            <img
              className="w-[30px] h-[30px] mr-[4px] rounded-full "
              src={infoUser?.avatar}
              alt="avatar"
            />
            <p className="mr-[2px]">{infoUser?.fullname}</p>
            <div>
              <BsCaretDownFill size="10px" />
            </div>
          </div>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> Thông tin cá nhân
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Đổi mật khẩu
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Đăng xuất
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
