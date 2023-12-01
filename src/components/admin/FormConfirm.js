import React, { useState, useEffect } from "react";
import icons from "../../util/icons";
import * as apis from "../../apis";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

const FormConfirm = ({ data, option }) => {
  const { isBlur } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const handlCancel = () => {
    dispatch(actions.checkBlur(!isBlur));
  };
  console.log("options" + data);
  const handleConfirm = () => {
    const fetchApi = async () => {
      try {
        let response;
        if (option === 1) {
          response = await apis.apiDeleteLecturePrice(data);
        } else if (option === 2) {
          response = await apis.apiDeleteExPrice(data);
        } else if (option === 3) {
          response = await apis.apiDeleteTargets(data);
        } else if (option === 4) {
          response = await apis.apiDeleteCreditPrice(data);
        } else if (option === 5) {
          response = await apis.apiDeleteTeachingPeriod(data);
        } else if (option === 6) {
          response = await apis.apiDeleteInvoice(data);
        } else if (option === 7) {
          response = await apis.apiDeleteStudentExpenses(data);
        }
        if (response?.status === 200) {
          console.log("success");
        } else {
          console.log("faild");
        }
      } catch (error) {
        console.log(error);
      }
    };
    // eslint-disable-next-line
    if (data?.length !== 0) {
      fetchApi();
    }
  };
  return (
    <div className="w-full h-full font-roboto">
      <div className="h-[80%] w-full flex flex-col">
        <div className="h-[60px] bg-sky-400 flex items-center justify-center rounded-t-xl">
          <h5>Xác Nhận</h5>
        </div>
        <div className="h-[80%] flex items-center justify-center text-red-500">
          <p>Bạn thật sự muốn xóa dữ liệu đã chọn ???</p>
        </div>
      </div>
      <div className="h-[20%] flex relative">
        <div className="absolute right-[30px] bottom-[15px] flex gap-3 text-[#343434]">
          <button
            onClick={handlCancel}
            className="bg-[#FF4500] hover:bg-[#ff7644] w-[80px] h-[30px] rounded-xl"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            className="bg-[#00FF00] hover:bg-[#56fb56] w-[80px] h-[30px] rounded-xl"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormConfirm;
