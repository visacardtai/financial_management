import React from "react";
import { NavLink } from "react-router-dom";

const Card = ({ data }) => {
  return (
    <NavLink to={data?.path} key={data?.path} end={data?.end}>
      <div className="flex flex-col items-center justify-center bg-white h-[100px] rounded-md text-[10px] hover:cursor-pointer">
        <div>{data.icons}</div>
        <span className="pt-3">{data.text}</span>
      </div>
    </NavLink>
  );
};

export default Card;
