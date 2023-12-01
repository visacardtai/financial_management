import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";

const UploadInvoice = () => {
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

  return (
    <div className="w-full h-full font-roboto ">
      <div className="h-[80%] flex flex-col items-center gap-4">
        <div className="bg-sky-400 w-full rounded-t-xl">
          <h5 className="font-medium text-[18px] my-[16px]">
            Upload File Hóa Đơn
          </h5>
        </div>
        <div className="w-[150px] h-[150px] bg-sky-400 text-white flex flex-col items-center justify-center rounded-xl cursor-pointer">
          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? "active" : ""}`}
          >
            <input {...getInputProps()} />
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
            // onClick={handleCreate}
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
