import React, { useState } from "react";
import icons from "../util/icons";
import { useDispatch, useSelector } from "react-redux";
import AllTargets from "./lecturer/AllTargets";
import AllPrice from "./lecturer/AllPrice";
import AllTeachingDetails from "./lecturer/AllTeachingDetails";
// import * as actions from "../store/actions";

const { AiOutlineClose } = icons;

const BGBlur = ({ data, onDataChange, item, allTeachingDetails }) => {
  //   const { adminaddartist, adminadd } = useSelector((state) => state.music);
  const dispatch = useDispatch();
  const handleChange = () => {
    onDataChange(false);
  };
  return (
    <>
      {data && (
        <div className="fixed w-[80%] h-[90%] bg-overlay-30 z-50 flex justify-center items-center">
          <div className="bg-white flex w-[80%] h-[70%] rounded-md relative">
            <div className="w-[100%] h-full flex items-center justify-center">
              {item === 1 ? (
                <AllTargets />
              ) : item === 2 ? (
                <AllPrice />
              ) : item === 3 ? (
                <AllTeachingDetails data={allTeachingDetails} />
              ) : (
                "4"
              )}
              {/* className="cursor-pointer flex-1 flex justify-end" */}
            </div>
            <span
              className="absolute top-0, right-0 cursor-pointer"
              onClick={handleChange}
            >
              <AiOutlineClose size={20} />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default BGBlur;
