import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import * as apis from "../../apis";
import { toast } from "react-toastify";
import useAxiosPrivateUpload from "../../hooks/useAxiosPrivateUpload";

const UploadInvoice = () => {
  const { isBlur, refreshBe, typeUpload } = useSelector((state) => state.app);
  const axiosPrivateUpload = useAxiosPrivateUpload();
  const dispatch = useDispatch();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [checkFile, setCheckFile] = useState(true);
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        // Xử lý file Excel
        console.log(file);
        setCheckFile(true);
        setUploadedFile(file);
      } else {
        setCheckFile(false);
        console.log("Chỉ chấp nhận file Excel (.xlsx, .xls)");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".xlsx, .xls",
    multiple: false,
  });

  const handlCancel = () => {
    dispatch(actions.checkBlur(false));
  };

  const handleCreate = () => {
    const fetchApi = async () => {
      try {
        const response = await apis.apiAddTPExcel(
          axiosPrivateUpload,
          uploadedFile,
          typeUpload
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
    if (uploadedFile !== null) {
      console.log(uploadedFile);
      fetchApi();
    }
  };

  return (
    <div className="w-full h-full font-roboto ">
      <div className="h-[80%] flex flex-col items-center gap-4">
        <div className="bg-sky-400 w-full rounded-t-xl">
          <h5 className="font-medium text-[18px] my-[16px]">
            {typeUpload === 1
              ? "Up File Danh Sách Hóa Đơn Học Phí"
              : typeUpload === 2
              ? "Up File Danh Sách Hóa Đơn Chi Sinh Viên"
              : "Up File Danh Sách Kỳ Dạy"}
          </h5>
        </div>
        <div className="w-[150px] h-[150px] bg-sky-400 text-white flex flex-col items-center justify-center rounded-xl cursor-pointer">
          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? "active" : ""}`}
          >
            <input type="file" {...getInputProps()} />
            {isDragActive ? (
              <p>Kéo và thả file Excel vào đây hoặc nhấp để chọn file</p>
            ) : (
              <p>Nhấp để chọn file Excel hoặc kéo thả file vào đây</p>
            )}
          </div>
        </div>

        {checkFile === false ? (
          <div className="text-red-500">
            <p>+ Chỉ nhận file Excel +</p>
          </div>
        ) : (
          uploadedFile && (
            <div>
              <p>File đã tải lên: {uploadedFile.name}</p>
              <p>Kích thước: {uploadedFile.size} bytes</p>
            </div>
          )
        )}
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

export default UploadInvoice;
