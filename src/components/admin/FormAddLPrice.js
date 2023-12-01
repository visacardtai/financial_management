import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import icons from "../../util/icons";
import * as apis from "../../apis";
import numeral from "numeral";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

const { MdOutlineDriveFileRenameOutline, BiBookmarkAltPlus, BiCheckDouble } =
  icons;

const FormAddLPrice = () => {
  const { isBlur } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const [itemBranch, setItemBranch] = React.useState(1);
  const [study, setStudy] = React.useState(0);
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coefficient, setCoefficient] = useState(1);

  const handleChange = (event) => {
    setItemBranch(event.target.value);
  };

  const handleChangeStudy = (event) => {
    setStudy(event.target.value);
  };

  const handlCancel = () => {
    dispatch(actions.checkBlur(!isBlur));
  };

  const formatPrice = (value) => {
    // console.log(value);
    const numericValue = value.replace(/\D/g, ""); // Lọc bỏ tất cả các ký tự không phải số
    // console.log("one " + numericValue);
    const formattedPrice = numeral(numericValue).format("0,0");
    // setabc(formattedPrice);
    // console.log("two " + formattedPrice);

    setInputValue(formattedPrice);
  };
  const handleChangeAmount = (event) => {
    console.log("event" + event.target.value);
    formatPrice(event.target.value);
  };

  const [branch, setBranch] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await apis.apiGetAllBranch();
        if (response?.status === 200) {
          setBranch(response?.data);
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
        const price = Number(inputValue.replace(/,/g, ""));
        const response = await apis.apiAddLecturePrice(
          name,
          coefficient,
          price,
          description
        );
        if (response?.status === 200) {
          console.log("success");
        }
      } catch (error) {
        console.log(error);
      }
    };
    // eslint-disable-next-line
    if (inputValue !== "0" && name !== "") {
      fetchApi();
    }
  };

  const handleChangeCoe = (event) => {
    setCoefficient(event.target.value);
  };

  return (
    <div className="w-full h-full font-roboto ">
      <div className="h-[80%] flex flex-col items-center gap-4">
        <div className="bg-sky-400 w-full rounded-t-xl">
          <h5 className="font-medium text-[20px] my-[20px]">
            Thêm Giá Giảng Dạy
          </h5>
        </div>
        <div className="flex justify-start items-center w-[50%] gap-2 mt-1">
          <div className="flex w-[30%] gap-2">
            <MdOutlineDriveFileRenameOutline size={24} />
            <p>Tên giá</p>
          </div>
          <input
            placeholder="Tên giá"
            className="ml-2 px-1 py-2 w-[200px] border rounded-md"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="flex justify-start items-center w-[50%] gap-2 mt-1">
          <div className="flex w-[30%] gap-2">
            <MdOutlineDriveFileRenameOutline size={24} />
            <p>Mô tả</p>
          </div>
          <input
            placeholder="Mô tả..."
            className="ml-2 px-1 py-2 w-[200px] border rounded-md"
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="flex justify-start items-center w-[50%] gap-2">
          <div className="flex w-[30%] gap-2">
            <MdOutlineDriveFileRenameOutline size={24} />
            <p>Hệ số</p>
          </div>
          <input
            placeholder="Hệ số"
            className="ml-2 px-1 py-2 w-[200px] border rounded-md"
            type="number"
            step={0.1}
            defaultValue={1}
            onChange={handleChangeCoe}
          />
        </div>
        <div className="flex justify-start items-center w-[50%] gap-2">
          <div className="flex w-[30%] gap-2">
            <MdOutlineDriveFileRenameOutline size={24} />
            <p>Số tiền</p>
          </div>
          {/* type="text"
            placeholder="Tên giá"
            className="ml-2 px-1 py-2 w-[200px] border rounded-md"
            value={inputValue} */}
          <input
            placeholder="Số tiền"
            className="ml-2 px-1 py-2 w-[200px] border rounded-md"
            type="text"
            onChange={handleChangeAmount}
          />
        </div>
        <div className="flex justify-start items-center w-[50%] gap-2">
          <div className="flex w-[30%] gap-2">
            <MdOutlineDriveFileRenameOutline size={24} />
            <p>VND</p>
          </div>
          <span className="ml-2 px-1 py-2 w-[200px]">{inputValue}</span>
        </div>
        <div className="flex flex-col mt-2">
          <span>
            Mức giá được thêm mới vào cần có sự kiểm duyệt của trưởng phòng mới
            có hiệu lực
          </span>
          <span>Mức giá đang trong trạng thái chờ</span>
        </div>
      </div>
      <div className="h-[20%] flex relative">
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
    </div>
  );
};

export default FormAddLPrice;
