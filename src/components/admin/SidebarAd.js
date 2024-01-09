import { useEffect, useState } from "react";
import { useRef } from "react";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation, useNavigate, useRoutes } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import useAuth from "../../context/useAuth";

const SidebarAd = () => {
  const dispatch = useDispatch();
  const { setAuth } = useAuth();
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth();
    dispatch(actions.setRole());
    dispatch(actions.setIdUser());
    dispatch(actions.setInfoUser());
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  const subMenusList = [
    {
      name: "giảng viên",
      path: "giang-vien",
      icon: RiBuilding3Line,
      menus: [
        { name: "Chỉ Tiêu", path: "chi-tieu" },
        { name: "Bảng Giá", path: "bang-gia" },
        { name: "Kỳ Giảng Dạy", path: "ky-giang-day" },
      ],
    },
    {
      name: "sinh viên",
      path: "sinh-vien",
      icon: TbReportAnalytics,
      menus: [
        { name: "Hóa đơn", path: "hoa-don" },
        { name: "Giá Tín Chỉ", path: "gia-tin-chi" },
        { name: "Chi Sinh Viên", path: "chi-sinh-vien" },
        { name: "HĐ-Chi Sinh Viên", path: "hoa-don-chi-sinh-vien" },
      ],
    },
    {
      name: "thống kê",
      path: "thong-ke",
      icon: RiBuilding3Line,
      menus: [
        { name: "Hóa đơn", path: "hoa-don" },
        { name: "Kỳ dạy", path: "ky-day" },
      ],
    },
  ];

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
            overflow-hidden md:relative fixed
         h-screen "
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/music-ed1de.appspot.com/o/logo2.png?alt=media&token=5fc922ec-b720-4bcc-bd43-ec5f0fb41013"
            width={45}
            alt=""
          />
          <span className="text-xl whitespace-pre">Quản lý</span>
        </div>

        <div className="flex flex-col  h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
            <li>
              <NavLink to={"/"} className="link">
                <AiOutlineAppstore size={23} className="min-w-max" />
                Thông tin
              </NavLink>
            </li>
            <li>
              <NavLink to={"/chuyen-vien/nhan-vien"} className="link">
                <BsPerson size={23} className="min-w-max" />
                Nhân viên
              </NavLink>
            </li>
            <li>
              <NavLink to={"/chuyen-vien/du-lieu"} className="link">
                <HiOutlineDatabase size={23} className="min-w-max" />
                Dữ liệu
              </NavLink>
            </li>

            {(open || isTabletMid) && (
              <div className="border-y py-5 border-slate-300 ">
                <small className="pl-3 text-slate-500 inline-block mb-2">
                  Chức năng
                </small>
                {subMenusList?.map((menu) => (
                  <div key={menu.name} className="flex flex-col gap-1">
                    <SubMenu data={menu} />
                  </div>
                ))}
              </div>
            )}
            <li>
              <NavLink to={"/settings"} className="link">
                <SlSettings size={23} className="min-w-max" />
                Cài đặt
              </NavLink>
            </li>
          </ul>
          {open && (
            <div className="flex-1 text-sm z-50  max-h-48 my-auto  whitespace-pre   w-full  font-medium  ">
              <div
                className="flex border-y border-slate-300 p-4 items-center justify-center cursor-pointer hover:opacity-70"
                onClick={handleLogout}
              >
                <div>
                  <MdLogout size={24} />
                </div>
                <p className="text-teal-500 py-2 px-3 text-xs bg-teal-50 rounded-xl">
                  Đăng xuất
                </p>
              </div>
            </div>
          )}
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default SidebarAd;
