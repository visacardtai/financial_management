import React, { useEffect, useState } from "react";
import icons from "../../util/icons";
import { useParams } from "react-router-dom";
import * as apis from "../../apis";

const { BsCheckCircleFill } = icons;

const CheckPayment = () => {
  const { id } = useParams();
  const currentUrl = window.location.href;
  const trimmedUrl = "?" + currentUrl.split("?")[1];
  const data = trimmedUrl + `&invoiceId=${id}`;
  const [checkPayment, setCheckPayment] = useState(null);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await apis.apiUpdateHistoryPayment(data);
        if (response?.status === 200) {
          setCheckPayment(response?.data);
          console.log(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full h-screen flex items-center justify-center font-roboto">
      <div className="w-1/2 flex flex-col items-center justify-center gap-3">
        <BsCheckCircleFill size={50} className="text-green-500" />
        <p className="text-[24px] font-medium">Thành Công!</p>
        <div className="w-[400px] flex flex-col items-start">
          <p className="w-full border-b-[1px] flex items-center justify-center py-3 font-normal">
            Chi tiết giao dịch
          </p>
          <div className="flex flex-col w-full text-[14px]">
            <div className="flex justify-between border-b-[1px] py-3">
              <p>Tên giao dịch</p>
              <p>Thanh toán học phí</p>
            </div>
            <div className="flex justify-between border-b-[1px] py-3">
              <p>Mã sinh viên</p>
              <p>N19DCCN164</p>
            </div>
            <div className="flex justify-between border-b-[1px] py-3">
              <p>Họ tên</p>
              <p>Nguyễn Tiến Tài</p>
            </div>
            <div className="flex justify-between border-b-[1px] py-3">
              <p>Ngân hàng</p>
              <p>NCB</p>
            </div>
            <div className="flex justify-between border-b-[1px] py-3">
              <p>Tổng tiền</p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckPayment;
