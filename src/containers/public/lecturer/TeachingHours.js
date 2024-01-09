import React, { useState, useEffect } from "react";
import icons from "../../../util/icons";
import * as apis from "../../../apis";
import * as helpFn from "../../../util/HelpFn";
import ChartSubject from "../../../components/lecturer/ChartSubject";
import BGBlur from "../../../components/BGBlur";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";

const {
  TbClockStar,
  GiPriceTag,
  PiDotOutlineDuotone,
  LuCalendarClock,
  TbClockPlus,
} = icons;

const TeachingHours = () => {
  const dispatch = useDispatch();
  const { idUser } = useSelector((state) => state.app);
  const axiosPrivate = useAxiosPrivate();
  const [teachingPeriod, setTeachingPeriod] = useState(null);
  const [classCoefficient, setClassCoefficient] = useState(null);
  const [select, setSelect] = useState(false);
  const [itemSelect, setItemSelect] = useState(null);

  const handleClick = (item) => {
    console.log(item);
    setItemSelect(item);
    setSelect(!select);
  };
  useEffect(() => {
    const fetchTeachingPeriod = async () => {
      try {
        const response = await apis.apiGetNewTPByIdLecture(
          axiosPrivate,
          idUser
        );
        if (response?.status === 200) {
          console.log("nfnsjsjfjdfjd");
          setTeachingPeriod(response?.data);
          console.log(response?.data);
          dispatch(
            actions.setDataCalculate({
              targets: response?.data?.targets?.quantity,
              price: response?.data?.lecturePrice?.basic_price,
              coefficient: response?.data?.lecturePrice?.coefficient,
              details: response?.data?.details,
              total: response?.data?.total,
              sp_total: response?.data?.total_price,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTeachingPeriod();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const fetchClassCoefficient = async () => {
      try {
        const response = await apis.apiGetAllClassCoefficient(axiosPrivate);
        if (response?.status === 200) {
          setClassCoefficient(response?.data);
          console.log(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchClassCoefficient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex gap-3 font-roboto">
      <div className="w-[100%] bg-white flex flex-col justify-center items-center">
        <div className="flex items-center justify-between mx-5 mt-2 border-b-2 p-2 w-[96%] mb-[12px]">
          <div className="text-[22px] font-bold text-main-100">
            <p>Thông Tin Kỳ Dạy</p>
          </div>
          <div className="flex gap-2 justify-center items-center"></div>
        </div>
        <div className="w-[100%] flex flex-col gap-3 mb-3">
          <div className="flex gap-3">
            <div className="w-[40%] flex flex-col gap-3">
              <div className="h-[120px] bg-[#E0FBFF] flex gap-3 justify-around rounded-md">
                <div className="h-full flex items-center justify-center ml-[28px]">
                  <div>
                    <TbClockStar size={40} />
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center gap-3">
                  <p className="font-bold text-[17px]">Tiết giảng cơ bản</p>
                  <p
                    className="text-[13px] text-red-500 cursor-pointer hover:text-red-400"
                    onClick={() => handleClick(1)}
                  >
                    Xem chi tiết
                  </p>
                </div>
                <div className="w-[50%] flex items-center justify-center gap-1">
                  <p className="text-[24px] font-medium">
                    {teachingPeriod?.targets?.quantity}
                  </p>
                  <p className="text-[14px] font-medium">tiết/kỳ</p>
                </div>
              </div>
              <div className="h-[120px] bg-[#E0FBFF] flex gap-3 justify-around rounded-md">
                <div className="h-full flex items-center justify-center ml-[28px]">
                  <div>
                    <GiPriceTag size={40} />
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center gap-3">
                  <p className="font-bold text-[17px]">Mức giá tiết giảng</p>
                  <p
                    className="text-[13px] text-red-500 cursor-pointer hover:text-red-400"
                    onClick={() => handleClick(2)}
                  >
                    Xem chi tiết
                  </p>
                </div>
                <div className="w-[50%] flex flex-col items-center justify-center">
                  <div className="w-fit h-fit flex flex-col items-start">
                    <div className="flex gap-1 items-center justify-center">
                      <PiDotOutlineDuotone size={20} />
                      <p className="w-full text-[14px]">Giá cơ bản:</p>
                      <p>
                        {teachingPeriod !== null &&
                          helpFn.converVND(
                            teachingPeriod?.lecturePrice?.basic_price
                          )}
                      </p>
                    </div>
                    <div className="flex gap-1 items-center justify-center">
                      <PiDotOutlineDuotone size={20} />
                      <p className="w-full text-[14px] ">Giá trội:</p>
                      <p>
                        {teachingPeriod !== null &&
                          helpFn.converVND(
                            teachingPeriod?.lecturePrice?.basic_price *
                              teachingPeriod?.lecturePrice?.coefficient
                          )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div div className="w-[60%] flex gap-3">
              <div className="w-1/2 from-[#a1e1ff] to-[#b7d2ff] bg-gradient-to-r rounded-md">
                <div className="w-full flex flex-col justify-center">
                  <div className="h-fit flex items-center justify-center border-b-[1px] my-1 mx-2">
                    <p className="w-full flex justify-start text-[17px] p-2">
                      Tiết dạy
                    </p>
                  </div>
                  <div className="flex pt-[15px] pb-[15px] border-b-[1px] mx-2">
                    <div className="w-1/2 flex flex-col items-center justify-center gap-2">
                      <p className="text-15px] font-light">Số tiết đã dạy</p>
                      <p className="text-[26px] font-medium">
                        {teachingPeriod?.total?.toFixed(2)} tiết
                      </p>
                    </div>
                    <div className="flex flex-col w-1/2 justify-center items-center gap-2">
                      <LuCalendarClock size={40} />
                      <p
                        className="text-[13px] text-red-500 cursor-pointer hover:text-red-400"
                        onClick={() => handleClick(3)}
                      >
                        Xem chi tiết
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col ml-3 my-3">
                    {teachingPeriod?.details?.slice(0, 3)?.map((item) => (
                      <div className="w-full flex justify-start">
                        <p>
                          + {item?.subject?.name}: {item?.total} tiết
                        </p>
                        <p> </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-1/2 bg-gradient-to-r from-[#afceff] to-[#9db2ff] rounded-md">
                <div className="w-full flex flex-col justify-center">
                  <div className="h-fit flex items-center justify-center border-b-[1px] my-1 mx-2">
                    <p className="w-full flex justify-start text-[17px] p-2">
                      Trội giờ
                    </p>
                  </div>
                  <div className="flex pt-[15px] pb-[15px] border-b-[1px] mx-2">
                    <div className="w-1/2 flex flex-col items-center justify-center gap-2">
                      <p className="text-15px] font-light">
                        Số tiết trội đã dạy
                      </p>
                      <p className="text-[26px] font-medium">
                        {teachingPeriod?.total >
                        teachingPeriod?.targets?.quantity
                          ? (
                              teachingPeriod?.total -
                              teachingPeriod?.targets?.quantity
                            )?.toFixed(2)
                          : "0"}{" "}
                        tiết
                      </p>
                    </div>
                    <div className="flex flex-col w-1/2 justify-center items-center gap-2">
                      <TbClockPlus size={40} />
                      <p
                        className="text-[13px] text-red-500 cursor-pointer hover:text-red-400"
                        onClick={() => handleClick(4)}
                      >
                        Xem chi tiết
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col ml-3 my-3">
                    {classCoefficient?.slice(0, 3)?.map((item) => (
                      <div className="w-full flex justify-start">
                        <p>
                          + {item?.name} ({item?.quantity} sinh viên): hệ số{" "}
                          {item?.coefficient}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ChartSubject />
        </div>
      </div>
      {select && (
        <BGBlur
          data={select}
          item={itemSelect}
          onDataChange={handleClick}
          allTeachingDetails={teachingPeriod?.details}
        />
      )}
    </div>
  );
};

export default TeachingHours;
