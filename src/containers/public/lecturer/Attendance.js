import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import icons from "../../../util/icons";
import { BsCalendarDateFill } from "react-icons/bs";
import { BiArchiveOut } from "react-icons/bi";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import * as apis from "../../../apis";
import { toast } from "react-toastify";

const { BiBookmarkAltPlus, BiCheckDouble } = icons;

const Attendance = () => {
  const { idUser } = useSelector((state) => state.app);
  const axiosPrivate = useAxiosPrivate();
  const [teachingPeriod, setTeachingPeriod] = useState(null);
  const [subject, setSubject] = React.useState();
  const [study, setStudy] = React.useState(0);
  const [quantity, setQuantity] = useState(null);
  const [itemSubject, setItemSubject] = React.useState();
  const [subjectSelect, setSubjectSelect] = React.useState(null);
  const [idDetails, setIdDetails] = React.useState(null);
  const [calculate, setCalculate] = React.useState([]);
  const [checkRefresh, setCheckRefresh] = React.useState(false);

  const getdate = () => {
    const currentDate = new Date();

    // Định dạng ngày tháng
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    // Tạo chuỗi ngày tháng hệ thống
    const defaultValue = `${year}-${month}-${day}`;
    return defaultValue;
  };

  const handleChangeSubject = (event) => {
    setItemSubject(event.target.value);
    const data = subject.find(
      (item, index) => index + 1 === event.target.value
    );
    const pract = data?.detailsSub?.map((item) => item?.practical);
    const sum = pract.reduce((a, b) => a + b, 0);
    const thoer = data?.detailsSub?.map((item) => item?.quantity);
    const sum2 = thoer.reduce((a, b) => a + b, 0);
    setCalculate([
      data?.subject?.practicalNum - sum,
      data?.subject?.theoryNum - sum2,
    ]);
    setSubjectSelect(data?.subject);
    setIdDetails(data?.id);
  };

  const handleChangeStudy = (event) => {
    setStudy(event.target.value);
  };

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const [expiration, setExpiration] = useState(getdate());

  useEffect(() => {
    const fetchTeachingPeriod = async () => {
      try {
        const response = await apis.apiGetNewTPByIdLecture(
          axiosPrivate,
          idUser
        );
        if (response?.status === 200) {
          setTeachingPeriod(response?.data);
          setSubject(response?.data?.details);
          console.log(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTeachingPeriod();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkRefresh]);

  const handleCreate = () => {
    const fetchApi = async () => {
      try {
        let practical;
        let theory;
        if (study === 0) {
          theory = quantity;
          practical = 0;
        } else {
          theory = 0;
          practical = quantity;
        }
        const data = {
          quantity: theory,
          attendance: expiration,
          practical,
          details_id: idDetails,
        };
        const response = await apis.apiAddAttendance(axiosPrivate, data);
        if (response?.status === 200) {
          toast.success("Điểm danh thành công");
          console.log("success");
          setCheckRefresh(!checkRefresh);
          setCalculate([calculate?.[0] - practical, calculate?.[1] - theory]);
        }
      } catch (error) {
        toast.error("Điểm danh thất bại");
        console.log(error);
      }
    };
    // eslint-disable-next-line
    let practical;
    let theory;
    if (study === 0) {
      theory = quantity;
      practical = 0;
    } else {
      theory = 0;
      practical = quantity;
    }
    if (quantity >= 0 && practical <= calculate[0] && theory <= calculate[1]) {
      fetchApi();
    } else {
      toast.error("Số tiết điểm danh không hợp lệ");
    }
  };
  return (
    <div className="flex gap-3 font-roboto">
      <div className="w-[100%] bg-white flex flex-col justify-center items-center">
        <div className="flex items-center justify-between mx-5 mt-2 border-b-2 p-2 w-[96%] mb-[12px]">
          <div className="text-[22px] font-bold text-main-100">
            <p>Điểm Danh Tiết Dạy</p>
          </div>
          <div className="flex gap-2 justify-center items-center"></div>
        </div>
        <div className="w-[96%] flex flex-col gap-3 mb-3 mt-[20px]">
          <div className="flex justify-start items-center gap-2">
            <div className="flex gap-2">
              <BiBookmarkAltPlus size={24} />
              <p>Môn học</p>
            </div>
            <FormControl sx={{ m: 1, minWidth: 400 }} size="small">
              <InputLabel id="demo-select-small-label">Môn học</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={itemSubject}
                label="Môn học"
                onChange={handleChangeSubject}
              >
                {subject?.length !== 0 &&
                  subject?.map((item, index) => (
                    <MenuItem value={index + 1} key={item?.subject?.id}>
                      {`${index + 1} - ${item?.subject?.name}`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <div className="w-[96%] h-[500px] p-[32px] flex flex-col gap-6 items-center">
            <div className="flex gap-5">
              <span className="text-[18px]">
                Tên Môn Học: {subjectSelect?.name}
              </span>
            </div>
            <div className="flex gap-7">
              <span>Số tiết lý thuyết: {subjectSelect && calculate?.[1]}</span>
              <span>Số tiết thực hành: {subjectSelect && calculate?.[0]}</span>
              <span>
                Tổng tiết:{" "}
                {subjectSelect &&
                  subjectSelect?.theoryNum + subjectSelect?.practicalNum}
              </span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <div className="flex w-[180px] gap-4">
                <BsCalendarDateFill size={24} />
                <p>Ngày dạy</p>
              </div>
              <input
                type="date"
                defaultValue={expiration}
                placeholder="Ngày hết hạn"
                className="ml-2 px-1 py-2 w-[320px] border rounded-md"
                onChange={(event) => setExpiration(event.target.value)}
              />
            </div>
            <div className="flex justify-start items-center gap-2">
              <div className="flex w-[180px] gap-4">
                <BiCheckDouble size={24} />
                <p>Loại tiết dạy</p>
              </div>
              <FormControl sx={{ m: 1, minWidth: 320 }} size="small">
                <InputLabel id="demo-select-small-label">Lần học</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={study}
                  label="Loại tiết dạy"
                  onChange={handleChangeStudy}
                >
                  <MenuItem value={0}>Tiết lý thuyết</MenuItem>
                  <MenuItem value={1}>Tiết thực hành</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="flex justify-start items-center gap-2">
              <div className="flex w-[180px] gap-4">
                <BiArchiveOut size={24} />
                <p>Số tiết</p>
              </div>
              <input
                placeholder="Số tiết"
                className="ml-2 px-1 py-2 w-[320px] border rounded-md"
                type="number"
                onChange={handleChangeQuantity}
              />
            </div>
            <div className="">
              <button
                onClick={handleCreate}
                className="bg-[#00FF00] hover:bg-[#56fb56] w-[100px] h-[30px] rounded-xl"
              >
                Điểm danh
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
