import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import icons from "../../util/icons";
import * as apis from "../../apis";
import { Scrollbars } from "react-custom-scrollbars-2";
import numeral from "numeral";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { ScoreOutlined } from "@mui/icons-material";
import { CiCirclePlus } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import * as helpFn from "../../util/HelpFn";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { BiBarChartAlt2 } from "react-icons/bi";
import { BiFontColor } from "react-icons/bi";

const { MdOutlineDriveFileRenameOutline, BiBookmarkAltPlus, BiCheckDouble } =
  icons;

const FormAddStudentExpenses = () => {
  const { isBlur, refreshBe } = useSelector((state) => state.app);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const [itemStudent, setItemStudent] = React.useState();
  const [itemSemester, setItemSemester] = React.useState();
  const [itemExpPrice, setItemExpPrice] = React.useState();
  const [details, setDetails] = React.useState([]);
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setItemStudent(event.target.value);
  };

  const handleChangeSemester = (event) => {
    setItemSemester(event.target.value);
  };

  const handleChangeExpPrice = (event) => {
    setItemExpPrice(event.target.value);
  };

  const handlCancel = () => {
    dispatch(actions.checkBlur(false));
  };

  const [student, setStudent] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await apis.apiGetAllStudent(axiosPrivate);
        if (response?.status === 200) {
          setStudent(response?.data);
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

  const [expensesPrice, setExpensesPrice] = React.useState();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await apis.apiGetExpPriceNew(axiosPrivate);
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

  const handleCreate = () => {
    const fetchApi = async () => {
      try {
        const data = details.map((item) => item.id);
        const dataAdd = {
          name,
          student_id: itemStudent,
          semester_id: itemSemester,
          details: data,
        };
        const response = await apis.apiCreateStudentExpenses(
          axiosPrivate,
          dataAdd
        );
        if (response?.status === 200) {
          toast.success("Thêm dữ liệu thành công");
          dispatch(actions.refreshBe(!refreshBe));
          dispatch(actions.checkBlur(!isBlur));
          console.log("success");
        }
      } catch (error) {
        toast.error("Thêm dữ liệu thất bại");
        console.log(error);
      }
    };
    // eslint-disable-next-line
    if (
      itemStudent !== undefined &&
      itemSemester !== undefined &&
      name !== "" &&
      details.length !== 0
    ) {
      fetchApi();
    }
  };

  const handleAddDetails = () => {
    if (expensesPrice) {
      const data = expensesPrice.find((item) => item?.id === itemExpPrice);
      const check = details.find((item) => item?.id === data?.id);
      if (!check) {
        setDetails((prev) => [...prev, data]);
      }
    }
  };

  const handleDelete = () => {
    if (details.length !== 0) {
      setDetails((prev) => prev.slice(0, prev.length - 1));
    }
  };

  return (
    <div className="w-full h-full font-roboto ">
      <div className="bg-sky-400 w-full rounded-t-xl">
        <h5 className="font-medium text-[20px] py-3">
          Tạo Hóa Đơn Chi Sinh Viên
        </h5>
      </div>
      <div className="flex mt-6 h-[70%]">
        <div className="w-1/2 flex flex-col items-center gap-4 border-r-2">
          <div className="flex justify-start items-center w-[80%] gap-2 mt-1">
            <div className="flex w-[30%] gap-2">
              <MdOutlineDriveFileRenameOutline size={24} />
              <p>Tên HĐ</p>
            </div>
            <input
              placeholder="Tên hóa đơn"
              className="ml-2 px-1 py-2 w-[220px] border rounded-md"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="flex justify-start items-center w-[80%] gap-2">
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
          <div className="flex justify-start items-center w-[80%] gap-2">
            <div className="flex w-[30%] gap-2">
              <BiFontColor size={24} />
              <p>Mã SV</p>
            </div>
            <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
              <InputLabel id="demo-select-small-label">Mã sinh viên</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={itemStudent}
                label="Mã sinh viên"
                onChange={handleChange}
              >
                {student?.length !== 0 &&
                  student?.map((item) => (
                    <MenuItem value={item?.studentId} key={item?.studentId}>
                      {`${item?.studentId} - ${item?.name}`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center gap-4">
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
          <div className="flex justify-start items-center w-[80%] gap-2">
            <div className="flex w-[30%] gap-2">
              <BiBookmarkAltPlus size={24} />
              <p>Loại</p>
            </div>
            <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
              <InputLabel id="demo-select-small-label">Loại hỗ trợ</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={itemExpPrice}
                label="Loại hỗ trợ"
                onChange={handleChangeExpPrice}
              >
                {expensesPrice?.length !== 0 &&
                  expensesPrice?.map((item) => (
                    <MenuItem value={item?.id} key={item?.id}>
                      {`${item?.id} - ${item?.name}`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <div className="w-[80%] flex flex-col gap-1">
            <p className="border-b-2 py-1 text-[16px] font-medium">Details</p>
            {details?.length !== 0 &&
              details?.map((item) => (
                <div className="flex justify-start">
                  <p>{`${item?.id} - ${item?.name} - ${helpFn.converVND(
                    item?.price
                  )}`}</p>
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
export default FormAddStudentExpenses;
