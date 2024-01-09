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
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { BiBarChartAlt2 } from "react-icons/bi";
import { IoIosPricetags } from "react-icons/io";
import { BiArchiveOut } from "react-icons/bi";

const { MdOutlineDriveFileRenameOutline, BiBookmarkAltPlus, BiCheckDouble } =
  icons;

const FormEditTeachingPeriod = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const { editTeachingPeriod, refreshBe, isBlur } = useSelector(
    (state) => state.app
  );
  const [itemSubject, setItemSubject] = React.useState();
  const [itemClassCoefficient, setItemClassCoefficient] = React.useState();
  const [itemLecture, setItemLecture] = React.useState(
    editTeachingPeriod?.lecturer_id
  );
  const [itemSemester, setItemSemester] = React.useState(
    editTeachingPeriod?.semester?.id
  );
  const [itemTargets, setItemTargets] = React.useState(
    editTeachingPeriod?.targets?.id
  );
  const [itemLecturePrice, setItemLecturePrice] = React.useState(
    editTeachingPeriod?.lecturePrice?.id
  );
  const convertData = editTeachingPeriod?.details?.map((item) => ({
    sub: item?.subject,
    coeffic: item?.classCoefficient,
    id: item?.id,
  }));
  const [details, setDetails] = React.useState(convertData);
  const [itemDataCoefficient, setItemDataCoefficient] = React.useState();
  const [name, setName] = useState(null);

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
        const response = await apis.apiGetAllLecturer(axiosPrivate);
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
        const response = await apis.apiGetAllSemester(axiosPrivate);
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
        const response = await apis.apiGetAllTargets(axiosPrivate, 1);
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
        const response = await apis.apiGetAllLecturePrice(axiosPrivate);
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

  const [classCoefficient, setClassCoefficient] = React.useState();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await apis.apiGetAllClassCoefficient(axiosPrivate);
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
        const response = await apis.apiGetAllSubjcet(axiosPrivate);
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
    const arr1 = details.map((item) => item.id);
    const arr2 = editTeachingPeriod?.details.map((item) => item.id);
    const listDelete = arr2.filter((number) => !arr1.includes(number));
    const different = details.filter((item) => item.id === -1);
    const data = different.map((item) => ({
      subject_id: item?.sub?.id,
      class_coefficient_id: item?.coeffic?.id,
    }));
    const fetchApi = async () => {
      try {
        const dataEdit = {
          id: editTeachingPeriod?.id,
          targets_id: itemTargets,
          lecturer_id: itemLecture,
          lecture_price_id: itemLecturePrice,
          semester_id: itemSemester,
          listDelete,
          details: data,
        };
        const response = await apis.apiEditTeachingPeriod(
          axiosPrivate,
          dataEdit
        );
        if (response?.status === 200) {
          toast.success("Sửa dữ liệu thành công");
          dispatch(actions.refreshBe(!refreshBe));
          dispatch(actions.checkBlur(!isBlur));
          console.log("success");
        }
      } catch (error) {
        toast.error("Sửa dữ liệu thất bại");
        console.log(error);
      }
    };
    /// eslint-disable-next-line
    if (
      itemTargets !== editTeachingPeriod?.targets?.id ||
      itemSemester !== editTeachingPeriod?.semester?.id ||
      itemLecture !== editTeachingPeriod?.lecturer_id ||
      itemLecturePrice !== editTeachingPeriod?.lecturePrice?.id ||
      listDelete.length !== 0 ||
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
      setDetails((prev) => [...prev, { sub, coeffic, id: -1 }]);
    }
  };

  const handleDelete = () => {
    if (details?.length !== 0) {
      setDetails((prev) => prev.slice(0, prev.length - 1));
    }
  };

  useEffect(() => {
    if (classCoefficient && name !== null && name > 0) {
      const item = classCoefficient?.find((i) => {
        return i?.quantity >= name;
      });
      console.log(item);
      setItemDataCoefficient(item);
      setItemClassCoefficient(item?.id);
    }
    if (name === "") {
      setItemDataCoefficient();
      setItemClassCoefficient();
    }
    console.log(name);
    // eslint-disable-next-line
  }, [name]);

  return (
    <div className="w-full h-full font-roboto ">
      <div className="bg-sky-400 w-full rounded-t-xl">
        <h5 className="font-medium text-[20px] py-3">
          Chỉnh Sửa Kỳ Dạy Giảng Viên
        </h5>
      </div>
      <div className="flex mt-6 h-[70%]">
        <div className="w-1/2 flex flex-col items-center gap-4 border-r-2">
          <div className="flex justify-start items-center w-[90%] gap-2">
            <div className="flex w-[30%] gap-2">
              <BiBookmarkAltPlus size={24} />
              <p>Tên GV</p>
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
              <BiBarChartAlt2 size={24} />
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
          {/* <div className="flex justify-start items-center w-[90%] gap-2">
            <div className="flex w-[30%] gap-2">
              <BiArchiveOut size={24} />
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
              <IoIosPricetags size={24} />
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
          </div> */}
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
          {/* <div className="flex justify-start items-center w-[90%] gap-2">
            <div className="flex w-[30%] gap-2">
              <BiArchiveOut size={24} />
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
          </div> */}
          <div className="flex justify-start items-center w-[90%] gap-2">
            <div className="flex w-[30%] gap-2">
              <BiArchiveOut size={24} />
              <p>Số sinh viên</p>
            </div>
            <input
              placeholder="Số sinh viên"
              className="ml-2 px-1 py-2 w-[220px] border rounded-md"
              type="number"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="flex justify-start items-center w-[90%] gap-2 mt-3">
            <div className="flex w-[30%] gap-2">
              <BiArchiveOut size={24} />
              <p>Hệ số lớp</p>
            </div>
            {itemDataCoefficient && (
              <span>{`${itemDataCoefficient?.id} - ${itemDataCoefficient?.name} - SL${itemDataCoefficient?.quantity} - HS${itemDataCoefficient?.coefficient}`}</span>
            )}
            {/* <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
              <InputLabel id="demo-select-small-label">Hệ số lớp</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={itemClassCoefficient}
                label="Hệ số lớp"
                onChange={handleChangeClassCoefficient}
                disabled
              >
                {classCoefficient?.length !== 0 &&
                  classCoefficient?.map((item) => (
                    <MenuItem value={item?.id} key={item?.id}>
                      {`${item?.id} - ${item?.name} - SL${item?.quantity} - HS${item?.coefficient}`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl> */}
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
export default FormEditTeachingPeriod;
