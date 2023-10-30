import React from "react";

const Infor = () => {
  return (
    <div className="w-[60%] bg-white font-roboto">
      <div className="p-[10px] h-full">
        <div className="w-full border-b-[0.5px] flex justify-start">
          <span className="font-bold text-[18px] pb-[10px] opacity-60">
            Thông tin sinh viên
          </span>
        </div>
        <div className="flex mt-[20px]">
          <div className="w-[180px] flex flex-col items-center justify-center">
            <img
              className="w-[120px] h-[120px] rounded-full"
              src="https://firebasestorage.googleapis.com/v0/b/music-ed1de.appspot.com/o/cho.jpg?alt=media&token=1f9ec7a2-a999-4e5f-8dfa-f1bbe9ca7652"
              alt="avatar"
            />
            <a href="/thong-tin-chi-tiet" className="text-[12px] mt-[8px]">
              Xem chi tiết
            </a>
          </div>
          <div className="w-full flex text-[14px] justify-around items-center">
            <div className="flex flex-col items-start gap-2">
              <span>MSSV: N19DCCN164</span>
              <span>Họ tên: Nguyễn Tiến Tài</span>
              <span>Giới tính: Nam</span>
              <span>Ngày sinh: 07/07/2001</span>
              <span>Nơi sinh: Tỉnh Long An</span>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span>Lớp học: D19CQCNPM02-N</span>
              <span>Khóa học: 2019-2024</span>
              <span>Bậc đào tạo: Đại học</span>
              <span>Loại hình đào tạo: Chính quy</span>
              <span>Ngành: Công nghệ thông tin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infor;
