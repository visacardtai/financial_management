import React, { useEffect, useState } from "react";
import icons from "../../util/icons";
import { useNavigate, useParams } from "react-router-dom";
import * as apis from "../../apis";
import { MdErrorOutline } from "react-icons/md";
import { GrFormPreviousLink } from "react-icons/gr";
import * as helpFn from "../../util/HelpFn";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../components";
import * as actions from "../../store/actions";

const { BsCheckCircleFill } = icons;

const CheckPayment = () => {
  const dispatch = useDispatch();
  const { isLoading, role, infoUser } = useSelector((state) => state.app);
  const { id } = useParams();
  const currentUrl = window.location.href;
  const trimmedUrl = "?" + currentUrl.split("?")[1];
  const data = trimmedUrl + `&invoiceId=${id}`;
  const [checkPayment, setCheckPayment] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(actions.loading(true));
    const fetchApi = async () => {
      try {
        const response = await apis.apiUpdateHistoryPayment(data);
        if (response?.status === 200) {
          setCheckPayment(response?.data);
          console.log(response?.data);
        } else {
          setCheckPayment(null);
        }
        // dispatch(actions.loading(!isLoading));
      } catch (error) {
        console.log(error);
        setCheckPayment(null);
        // dispatch(actions.loading(!isLoading));
      }
    };
    fetchApi();
    dispatch(actions.loading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlecPrev = () => {
    const check = role?.find((item) => item === "ROLE_SINHVIEN");
    if (infoUser && check === "ROLE_SINHVIEN") {
      navigate("/sinh-vien", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center font-roboto">
      {isLoading && (
        <div className="absolute top-0 right-0 left-0 bottom-0 z-40 bg-opacity-80 flex items-center justify-center">
          <Loading />
        </div>
      )}
      {checkPayment !== null ? (
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
                <p>{checkPayment?.id}</p>
              </div>
              <div className="flex justify-between border-b-[1px] py-3">
                <p>Họ tên</p>
                <p>{checkPayment?.name}</p>
              </div>
              <div className="flex justify-between border-b-[1px] py-3">
                <p>Ngân hàng</p>
                <p>NCB</p>
              </div>
              <div className="flex justify-between border-b-[1px] py-3">
                <p>Tổng tiền</p>
                <p>{helpFn.converVND(checkPayment?.price)}</p>
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-center py-2 px-4 bg-sky-300 rounded-full hover:bg-sky-400 cursor-pointer"
            onClick={handlecPrev}
          >
            <GrFormPreviousLink size={24} />
            <p>Quay lại trang chủ</p>
          </div>
        </div>
      ) : (
        <div className="w-1/2 flex flex-col items-center justify-center gap-3">
          <MdErrorOutline size={50} className="text-red-500" />
          <p className="text-[24px] font-medium">Thất bại</p>
          <div className="w-[400px] flex flex-col items-start">
            <p className="w-full border-b-[1px] flex items-center justify-center py-3 font-normal">
              Giao dịch thất bại
            </p>
            <div className="flex flex-col w-full text-[14px]">
              <div className="flex justify-between border-b-[1px] py-3">
                <p>Tên giao dịch</p>
                <p>Thanh toán học phí</p>
              </div>
              <div className="flex justify-between border-b-[1px] py-3">
                <p>Ngân hàng</p>
                <p>NCB</p>
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-center py-2 px-4 bg-sky-300 rounded-full hover:bg-sky-400 cursor-pointer"
            onClick={handlecPrev}
          >
            <GrFormPreviousLink size={24} />
            <p>Quay lại trang chủ</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckPayment;
