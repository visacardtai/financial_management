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
import { NavLink, useLocation, useRoutes } from "react-router-dom";
import DropDown from "./DropDown";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

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

  const Nav_animation = {
    open: {
      width: "16rem",
      height: "50%",
      transition: {
        damping: 40,
      },
    },
    closed: {
      width: "2.5rem",
      height: "5%",
      transition: {
        damping: 40,
      },
    },
  };

  const subMenusList = [
    {
      name: "build",
      icon: RiBuilding3Line,
      menus: ["auth", "app settings", "stroage", "hosting"],
    },
    {
      name: "analytics",
      icon: TbReportAnalytics,
      menus: ["dashboard", "realtime", "events"],
    },
  ];
  return (
    <div onMouseLeave={() => setOpen(false)}>
      <motion.div
        variants={Nav_animation}
        animate={!open ? "closed" : "open"}
        className=" bg-white text-gray shadow-xl z-[999] w-[16rem]
        overflow-hidden md:relative fixed"
      >
        {open && <DropDown />}
        <div
          onClick={() => setOpen(!open)}
          className="absolute w-fit h-fit z-50 right-[10px] bottom-2 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
