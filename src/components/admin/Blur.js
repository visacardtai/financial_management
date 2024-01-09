import React, { useState } from "react";
import {
  FormAddCPrice,
  FormAddLPrice,
  FormConfirm,
  FormAddExPrice,
  FormAddTargets,
  UploadInvoice,
  FormAddTeachingPeriod,
  FormAddStudentExpenses,
  FormEditStudentExpenses,
  FormAddInvoice,
  FormEditInvoice,
  FormEditTeachingPeriod,
} from "./index";
import { useSelector } from "react-redux";

const Blur = ({ actions, type, data, option }) => {
  const { typeUpload } = useSelector((state) => state.app);
  const confirmType = "bg-white flex w-[30%] h-[35%] rounded-xl relative";
  const addpriceType = "bg-white flex w-[50%] h-[70%] rounded-xl relative";
  const bigType = "bg-white flex w-[60%] h-[80%] rounded-xl relative";
  const uploadType = "bg-white flex w-[35%] h-[50%] rounded-xl relative";
  return (
    <div className="fixed w-[96%] h-[100%] bg-overlay-30 z-50 flex justify-center items-center">
      <div
        className={
          type === 6
            ? uploadType
            : type % 7 === 0
            ? bigType
            : type !== 1
            ? addpriceType
            : confirmType
        }
      >
        <div className="w-[100%] h-full flex items-center justify-center">
          {type === 0 ? (
            <FormAddCPrice actions={actions} />
          ) : type === 2 ? (
            <FormAddLPrice actions={actions} />
          ) : type === 3 ? (
            <FormAddExPrice actions={actions} />
          ) : type === 4 ? (
            <FormAddTargets actions={actions} />
          ) : type === 35 ? (
            <FormAddTeachingPeriod actions={actions} />
          ) : type === 6 ? (
            <UploadInvoice typeUpload={typeUpload} />
          ) : type === 7 ? (
            <FormAddStudentExpenses actions={actions} />
          ) : type === 14 ? (
            <FormEditStudentExpenses />
          ) : type === 21 ? (
            <FormAddInvoice />
          ) : type === 28 ? (
            <FormEditInvoice />
          ) : type === 42 ? (
            <FormEditTeachingPeriod />
          ) : (
            <FormConfirm actions={actions} data={data} option={option} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Blur;
