import React, { useState } from "react";
import icons from "../../util/icons";
import * as apis from "../../apis";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

const { MdOutlineDriveFileRenameOutline } = icons;

const FormAddTargets = () => {
  const { isBlur } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(null);

  const handlCancel = () => {
    dispatch(actions.checkBlur(!isBlur));
  };

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleCreate = () => {
    const fetchApi = async () => {
      try {
        const response = await apis.apiAddTargets(name, quantity, description);
        if (response?.status === 200) {
          console.log("success");
        }
      } catch (error) {
        console.log(error);
      }
    };
    // eslint-disable-next-line
    if (quantity !== null && name !== "") {
      fetchApi();
    }
  };

  return (
    <div className="w-full h-full font-roboto ">
      <div className="h-[80%] flex flex-col items-center gap-4">
        <div className="bg-sky-400 w-full rounded-t-xl">
          <h5 className="font-medium text-[20px] my-[20px]">Thêm Chỉ Tiêu</h5>
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
            <p>Số tiết</p>
          </div>
          <input
            placeholder="Số tiết"
            className="ml-2 px-1 py-2 w-[200px] border rounded-md"
            type="number"
            onChange={handleChangeQuantity}
          />
        </div>
        <div className="flex flex-col mt-10">
          <span>
            Chỉ tiêu được thêm mới vào cần có sự kiểm duyệt của trưởng phòng mới
            có hiệu lực
          </span>
          <span>Chỉ tiêu đang trong trạng thái chờ</span>
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

export default FormAddTargets;
