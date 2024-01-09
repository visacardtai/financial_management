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
import { BsCalendarDateFill } from "react-icons/bs";
import { BiBarChartAlt2 } from "react-icons/bi";
import { BiFontColor } from "react-icons/bi";
import { IoIosPricetags } from "react-icons/io";

const { MdOutlineDriveFileRenameOutline, BiBookmarkAltPlus, BiCheckDouble } =
  icons;

const FormEditInvoice = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const { editInvoice, refreshBe, isBlur } = useSelector((state) => state.app);
  const [itemSubject, setItemSubject] = React.useState();
  const [itemCreditPrice, setItemCreditPrice] = React.useState();
  const [itemStudent, setItemStudent] = React.useState(editInvoice?.student_id);
  const [itemSemester, setItemSemester] = React.useState(
    editInvoice?.semester?.id
  );
  const convertData = editInvoice?.invoiceDetails?.map((item) => ({
    sub: item?.subject,
    price: item?.creditPrice,
    id: item?.id,
  }));
  const [itemExpPrice, setItemExpPrice] = React.useState(0);
  const [details, setDetails] = React.useState(convertData);
  const [name, setName] = useState(editInvoice?.name);

  const getdate = () => {
    const datetimeString = editInvoice?.expiration_date;
    const currentDate = new Date(datetimeString);

    // Định dạng ngày tháng
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    // Tạo chuỗi ngày tháng hệ thống
    const defaultValue = `${year}-${month}-${day}`;
    return defaultValue;
  };
  const [expiration, setExpiration] = useState(getdate());

  const handleChange = (event) => {
    setItemStudent(event.target.value);
  };

  const handleChangeSemester = (event) => {
    setItemSemester(event.target.value);
  };

  const handleChangeExpPrice = (event) => {
    setItemExpPrice(event.target.value);
  };

  const handleChangeCreditPrice = (event) => {
    setItemCreditPrice(event.target.value);
  };

  const handleChangeSubject = (event) => {
    setItemSubject(event.target.value);
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
        const response = await apis.apiGetExpPriceByStatus(axiosPrivate, 1);
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

  const [creditPrice, setCreditPrice] = React.useState();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await apis.apiGetCreditPriceByStatus(axiosPrivate, 1);
        if (response?.status === 200) {
          setCreditPrice(response?.data);
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
    const arr2 = editInvoice?.invoiceDetails.map((item) => item.id);
    const listDelete = arr2.filter((number) => !arr1.includes(number));
    const different = details.filter((item) => item.id === -1);
    const data = different.map((item) => ({
      subject_id: item?.sub?.id,
      credit_price_id: item?.price?.id,
    }));
    const fetchApi = async () => {
      try {
        const dataEdit = {
          id: editInvoice?.id,
          name,
          student_id: itemStudent,
          semester_id: itemSemester,
          expiration_date: expiration,
          listDelete,
          details: data,
        };
        const response = await apis.apiEditInvoice(axiosPrivate, dataEdit);
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
    const defaultDate = getdate();
    if (
      itemStudent !== editInvoice?.student_id ||
      itemSemester !== editInvoice?.semester?.id ||
      name !== editInvoice?.name ||
      expiration !== defaultDate ||
      listDelete.length !== 0 ||
      different.length !== 0
    ) {
      fetchApi();
    }
  };

  const handleAddDetails = () => {
    if (itemSubject) {
      const sub = subject.find((item) => item?.id === itemSubject);
      // const price = creditPrice.find((item) => item?.id === itemCreditPrice);
      const check = details.find((item) => item?.sub?.id === sub?.id);
      if (!check) {
        setDetails((prev) => [...prev, { sub, price: 0, id: -1 }]);
      }
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
        <h5 className="font-medium text-[20px] py-3">
          Chỉnh Sửa Hóa Đơn Học Phí
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
              defaultValue={editInvoice?.name}
              className="ml-2 px-1 py-2 w-[220px] border rounded-md"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="flex justify-start items-center w-[80%] gap-2 mt-1">
            <div className="flex w-[30%] gap-2">
              <BsCalendarDateFill size={24} />
              <p>Ngày hết</p>
            </div>
            <input
              type="date"
              defaultValue={expiration}
              placeholder="Ngày hết"
              className="ml-2 px-1 py-2 w-[220px] border rounded-md"
              onChange={(event) => setExpiration(event.target.value)}
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
              <IoIosPricetags size={24} />
              <p>Giá</p>
            </div>
            <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
              <InputLabel id="demo-select-small-label">Loại giá</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={itemCreditPrice}
                label="Loại Giá"
                onChange={handleChangeCreditPrice}
              >
                {creditPrice?.length !== 0 &&
                  creditPrice?.map((item) => (
                    <MenuItem value={item?.id} key={item?.id}>
                      {`${item?.id} - ${item?.name}`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div> */}
          <div className="w-[80%] flex flex-col gap-1">
            <p className="border-b-2 py-1 text-[16px] font-medium">Details</p>
            {details?.length !== 0 &&
              details?.map((item, index) => (
                <div className="flex justify-start" key={index}>
                  <p>{`${index + 1} - ${item?.sub?.name}`}</p>
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
export default FormEditInvoice;
