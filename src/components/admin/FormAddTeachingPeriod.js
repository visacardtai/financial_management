import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import icons from "../../util/icons";
import * as apis from "../../apis";
import { Scrollbars } from "react-custom-scrollbars-2";
import numeral from "numeral";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { ScoreOutlined } from "@mui/icons-material";
import { CiCirclePlus } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import * as helpFn from "../../util/HelpFn";
import { useSelector } from "react-redux";

const { MdOutlineDriveFileRenameOutline, BiBookmarkAltPlus, BiCheckDouble } =
  icons;

const FormAddTeachingPeriod = () => {
  const dispatch = useDispatch();
  const [itemSubject, setItemSubject] = React.useState();
  const [itemClassCoefficient, setItemClassCoefficient] = React.useState();
  const [itemLecture, setItemLecture] = React.useState();
  const [itemSemester, setItemSemester] = React.useState();
  const [itemTargets, setItemTargets] = React.useState();
  const [itemLecturePrice, setItemLecturePrice] = React.useState();
  // const convertData = editInvoice?.invoiceDetails?.map((item) => ({
  //   sub: item?.subject,
  //   price: item?.creditPrice,
  //   id: item?.id,
  // }));
  const [itemExpPrice, setItemExpPrice] = React.useState(0);
  const [details, setDetails] = React.useState([]);
  const [name, setName] = useState();

  // const getdate = () => {
  //   const datetimeString = editInvoice?.expiration_date;
  //   const currentDate = new Date(datetimeString);

  //   // Định dạng ngày tháng
  //   const year = currentDate.getFullYear();
  //   const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  //   const day = currentDate.getDate().toString().padStart(2, "0");

  //   // Tạo chuỗi ngày tháng hệ thống
  //   const defaultValue = `${year}-${month}-${day}`;
  //   return defaultValue;
  // };
  // const [expiration, setExpiration] = useState(getdate());

  const handleChange = (event) => {
    setItemLecture(event.target.value);
  };

  const handleChangeTargets = (event) => {
    setItemTargets(event.target.value);
  };

  const handleChangeSemester = (event) => {
    setItemSemester(event.target.value);
  };

  const handleChangeLecturePrice = (event) => {
    setItemLecturePrice(event.target.value);
  };

  const handleChangeExpPrice = (event) => {
    setItemExpPrice(event.target.value);
  };

  const handleChangeClassCoefficient = (event) => {
    setItemClassCoefficient(event.target.value);
  };

  const handleChangeSubject = (event) => {
    setItemSubject(event.target.value);
  };

  const handlCancel = () => {
    dispatch(actions.checkBlur(false));
  };

  const [lecture, setLecture] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await apis.apiGetAllLecturer();
        if (response?.status === 200) {
          setLecture(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    // eslint-disable-next-line
    fetchApi();
  }, []);

  const [semester, setSemester] = React.useState();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await apis.apiGetAllSemester();
        if (response?.status === 200) {
          setSemester(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    // eslint-disable-next-line
    fetchApi();
  }, []);

  const [targets, setTargets] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await apis.apiGetAllTargets(1);
        if (response?.status === 200) {
          setTargets(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    // eslint-disable-next-line
    fetchApi();
  }, []);

  const [lecturePrice, setLecturePrice] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await apis.apiGetAllLecturePrice();
        if (response?.status === 200) {
          setLecturePrice(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    // eslint-disable-next-line
    fetchApi();
  }, []);

  const [expensesPrice, setExpensesPrice] = React.useState();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await apis.apiGetExpPriceByStatus(1);
        if (response?.status === 200) {
          setExpensesPrice(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    // eslint-disable-next-line
    fetchApi();
  }, []);

  const [classCoefficient, setClassCoefficient] = React.useState();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await apis.apiGetAllClassCoefficient();
        if (response?.status === 200) {
          setClassCoefficient(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    // eslint-disable-next-line
    fetchApi();
  }, []);

  const [subject, setSubject] = React.useState();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await apis.apiGetAllSubjcet();
        if (response?.status === 200) {
          setSubject(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    // eslint-disable-next-line
    fetchApi();
  }, []);

  const handleCreate = () => {
    const data = details.map((item) => ({
      subject_id: item?.sub?.id,
      class_coefficient_id: item?.coeffic?.id,
    }));
    const fetchApi = async () => {
      try {
        const response = await apis.apiCreateTeachingPeriod(
          itemTargets,
          itemLecture,
          itemLecturePrice,
          itemSemester,
          data
        );
        if (response?.status === 200) {
          console.log("success");
        }
      } catch (error) {
        console.log(error);
      }
    };
    /// eslint-disable-next-line
    if (
      itemTargets !== undefined &&
      itemSemester !== undefined &&
      itemLecture !== undefined &&
      itemLecturePrice !== undefined &&
      details.length !== 0
    ) {
      fetchApi();
    }
  };

  const handleAddDetails = () => {
    if (itemSubject && itemClassCoefficient) {
      const sub = subject.find((item) => item?.id === itemSubject);
      const coeffic = classCoefficient.find(
        (item) => item?.id === itemClassCoefficient
      );
      setDetails((prev) => [...prev, { sub, coeffic }]);
      // const check = details.find((item) => item?.sub?.id === sub?.id);
      // if (!check) {

      // }
    }
  };

  const handleDelete = () => {
    if (details?.length !== 0) {
      setDetails((prev) => prev.slice(0, prev.length - 1));
    }
  };

  return (
    <div className="w-full h-full font-roboto ">
      <div className="bg-sky-400 w-full rounded-t-xl">
        <h5 className="font-medium text-[20px] py-3">Thêm Kỳ Giảng Dạy</h5>
      </div>
      <div className="flex mt-6 h-[70%]">
        <div className="w-1/2 flex flex-col items-center gap-4 border-r-2">
          <div className="flex justify-start items-center w-[90%] gap-2">
            <div className="flex w-[30%] gap-2">
              <BiBookmarkAltPlus size={24} />
              <p>GV</p>
            </div>
            <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
              <InputLabel id="demo-select-small-label">Giảng viên</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={itemLecture}
                label="Giảng viên"
                onChange={handleChange}
              >
                {lecture?.length !== 0 &&
                  lecture?.map((item) => (
                    <MenuItem value={item?.lecturerId} key={item?.lecturerId}>
                      {`${item?.lecturerId} - ${item?.name}`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex justify-start items-center w-[90%] gap-2">
            <div className="flex w-[30%] gap-2">
              <BiBookmarkAltPlus size={24} />
              <p>Kỳ</p>
            </div>
            <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
              <InputLabel id="demo-select-small-label">Kỳ</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={itemSemester}
                label="Kỳ"
                onChange={handleChangeSemester}
              >
                {semester?.length !== 0 &&
                  semester?.map((item) => (
                    <MenuItem value={item?.id} key={item?.id}>
                      {`${item?.year} - ${item?.name}`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex justify-start items-center w-[90%] gap-2">
            <div className="flex w-[30%] gap-2">
              <BiBookmarkAltPlus size={24} />
              <p>Chỉ tiêu</p>
            </div>
            <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
              <InputLabel id="demo-select-small-label">Chỉ tiêu</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={itemTargets}
                label="Chỉ tiêu"
                onChange={handleChangeTargets}
              >
                {targets?.length !== 0 &&
                  targets?.map((item) => (
                    <MenuItem value={item?.id} key={item?.id}>
                      {`${item?.id} - ${item?.name} -${item?.quantity}`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex justify-start items-center w-[90%] gap-2">
            <div className="flex w-[30%] gap-2">
              <BiBookmarkAltPlus size={24} />
              <p>Loại giá</p>
            </div>
            <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
              <InputLabel id="demo-select-small-label">Loại giá</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={itemLecturePrice}
                label="Loại giá"
                onChange={handleChangeLecturePrice}
              >
                {lecturePrice?.length !== 0 &&
                  lecturePrice?.map((item) => (
                    <MenuItem value={item?.id} key={item?.id}>
                      {`${item?.name} - ${
                        item?.coefficient
                      } - ${helpFn.converVND(item?.basic_price)}`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center gap-1">
          <div className="flex gap-2 w-[80%] justify-end">
            <CiCirclePlus
              onClick={handleAddDetails}
              size={22}
              className="cursor-pointer hover:text-blue-500"
            />
            <GoTrash
              onClick={handleDelete}
              size={20}
              className="cursor-pointer hover:text-blue-500"
            />
          </div>
          <div className="flex justify-start items-center w-[90%] gap-2">
            <div className="flex w-[30%] gap-2">
              <BiBookmarkAltPlus size={24} />
              <p>Môn học</p>
            </div>
            <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
              <InputLabel id="demo-select-small-label">Môn học</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={itemSubject}
                label="Môn học"
                onChange={handleChangeSubject}
              >
                {subject?.length !== 0 &&
                  subject?.map((item) => (
                    <MenuItem value={item?.id} key={item?.id}>
                      {`${item?.id} - ${item?.name}`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex justify-start items-center w-[90%] gap-2">
            <div className="flex w-[30%] gap-2">
              <BiBookmarkAltPlus size={24} />
              <p>Hệ số lớp</p>
            </div>
            <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
              <InputLabel id="demo-select-small-label">Hệ số lớp</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={itemClassCoefficient}
                label="Hệ số lớp"
                onChange={handleChangeClassCoefficient}
              >
                {classCoefficient?.length !== 0 &&
                  classCoefficient?.map((item) => (
                    <MenuItem value={item?.id} key={item?.id}>
                      {`${item?.id} - ${item?.name} - SL${item?.quantity} - HS${item?.coefficient}`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <div className="w-[80%] flex flex-col gap-1">
            <p className="border-b-2 py-1 text-[16px] font-medium">Details</p>
            {details?.length !== 0 &&
              details?.map((item, index) => (
                <div className="flex justify-start" key={index}>
                  <p>{`${index + 1} - ${item?.sub?.name} - HS${
                    item?.coeffic?.coefficient
                  }`}</p>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="absolute right-[30px] bottom-[15px] flex gap-3">
        <button
          onClick={handlCancel}
          className="bg-[#FF4500] hover:bg-[#ff7644] w-[80px] h-[30px] rounded-xl"
        >
          Hủy
        </button>
        <button
          onClick={handleCreate}
          className="bg-[#00FF00] hover:bg-[#56fb56] w-[80px] h-[30px] rounded-xl"
        >
          Tạo
        </button>
      </div>
    </div>
  );
};
export default FormAddTeachingPeriod;
