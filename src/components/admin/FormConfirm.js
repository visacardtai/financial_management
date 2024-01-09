import React, { useState, useEffect } from "react";
import icons from "../../util/icons";
import * as apis from "../../apis";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

const FormConfirm = ({ data, option }) => {
  const axiosPrivate = useAxiosPrivate();
  const { isBlur, refreshBe } = useSelector((state) => state.app);
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
          response = await apis.apiDeleteLecturePrice(axiosPrivate, data);
        } else if (option === 2) {
          response = await apis.apiDeleteExPrice(axiosPrivate, data);
        } else if (option === 3) {
          response = await apis.apiDeleteTargets(axiosPrivate, data);
        } else if (option === 4) {
          response = await apis.apiDeleteCreditPrice(axiosPrivate, data);
        } else if (option === 5) {
          response = await apis.apiDeleteTeachingPeriod(axiosPrivate, data);
        } else if (option === 6) {
          response = await apis.apiDeleteInvoice(axiosPrivate, data);
        } else if (option === 7) {
          response = await apis.apiDeleteStudentExpenses(axiosPrivate, data);
        } else if (option === 8) {
          response = await apis.apiCensorCreditPrice(axiosPrivate, data);
        } else if (option === 9) {
          response = await apis.apiCensorExpPrice(axiosPrivate, data);
        } else if (option === 10) {
          response = await apis.apiCensorLecPrice(axiosPrivate, data);
        } else if (option === 11) {
          response = await apis.apiCensorTargets(axiosPrivate, data);
        } else if (option === 12) {
          response = await apis.apiCensorInvoice(axiosPrivate, data);
        } else if (option === 13) {
          response = await apis.apiCensorStudentExp(axiosPrivate, data);
        } else if (option === 14) {
          response = await apis.apiCensorTeachingPeriod(axiosPrivate, data);
        } else if (option === 15) {
          response = await apis.apiPayCensorStudentExp(axiosPrivate, data);
        }
        if (response?.status === 200) {
          if (option > 7) {
            toast.success("Duyệt dữ liệu thành công");
          } else {
            toast.success("Xóa dữ liệu thành công");
          }

          dispatch(actions.refreshBe(!refreshBe));
          dispatch(actions.checkBlur(!isBlur));
          console.log("success");
        } else {
          if (option > 7) {
            toast.error("Duyệt dữ liệu thất bại");
          } else {
            toast.error("Xóa dữ liệu thất bại");
          }
          console.log("faild");
        }
      } catch (error) {
        if (option > 7) {
          toast.error("Duyệt dữ liệu thất bại");
        } else {
          toast.error("Xóa dữ liệu thất bại");
        }
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
          {option > 7 ? (
            <p>Bạn thật sự muốn duyệt tất cả dữ liệu đã chọn ???</p>
          ) : (
            <p>Bạn thật sự muốn xóa dữ liệu đã chọn ???</p>
          )}
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
