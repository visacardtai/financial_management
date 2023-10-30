import React, { useState } from "react";
import icons from "../util/icons";
import { NavLink } from "react-router-dom";

import { motion } from "framer-motion";

const { AiOutlineCaretDown } = icons;

const SubMenu = ({ data }) => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  return (
    <>
      <li
        onClick={() => setSubMenuOpen(!subMenuOpen)}
        className="link shadow-md bg-main-100 text-white hover:bg-main-200"
      >
        <data.icon size={23} />
        <p className="capitalize">{data?.name}</p>

        <div className="flex-1 flex justify-end">
          {data.menus.length !== 0 ? (
            <AiOutlineCaretDown
              className={` ${subMenuOpen && "rotate-180"} duration-200 `}
            />
          ) : (
            ""
          )}
        </div>
      </li>
      {data.menus.length !== 0 ? (
        <motion.ul
          animate={
            subMenuOpen
              ? {
                  height: "fit-content",
                }
              : {
                  height: 0,
                }
          }
          className="flex h-0 flex-col text-[0.8rem] font-normal overflow-hidden rounded-md bg-[#D4F3FF] mb-1"
        >
          {data.menus.map((menu) => (
            <li key={menu.id} className="hover:bg-main-200">
              <NavLink
                to={menu?.path}
                className="link capitalize !bg-transparent"
              >
                {menu?.name}
              </NavLink>
            </li>
          ))}
        </motion.ul>
      ) : (
        <ul className="mb-1"></ul>
      )}
    </>
  );
};

export default SubMenu;
