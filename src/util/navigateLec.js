import icons from "./icons";

const {
  BsCalendarDate,
  RiLineChartFill,
  BiBookAdd,
  RiBillLine,
  LiaCcAmazonPay,
  HiOutlineDocumentChartBar,
  PiShoppingBagOpen,
  HiOutlineClipboardDocumentList,
  LiaUserClockSolid,
} = icons;

export const sidebarMenu = [
  {
    path: "thong-bao",
    text: "Thông báo",
    end: true,
    icons: <BsCalendarDate size="24px" />,
  },
  {
    path: "diem-mon-giang-day",
    text: "Điểm môn giảng dạy",
    end: true,
    icons: <RiLineChartFill size="24px" />,
  },
  {
    path: "thoi-khoa-bieu-tuan",
    text: "Thời khóa biểu tuần",
    end: true,
    icons: <BiBookAdd size="24px" />,
  },
  {
    path: "thoi-khoa-bieu-hoc-ky",
    text: "Thời khóa biểu học kỳ",
    end: true,
    icons: <RiBillLine size="24px" />,
  },
  {
    path: "gio-giang-day",
    text: "Giờ giảng dạy",
    end: true,
    icons: <LiaUserClockSolid size="24px" />,
  },
  {
    path: "sinh-vien-quan-ly",
    text: "Sinh viên quản lý",
    end: true,
    icons: <HiOutlineDocumentChartBar size="24px" />,
  },
  {
    path: "lich-thi",
    text: "Lịch thi",
    end: true,
    icons: <HiOutlineClipboardDocumentList size="24px" />,
  },
  {
    path: "nhac-nho",
    text: "Nhắc nhỡ",
    end: true,
    icons: <PiShoppingBagOpen size="24px" />,
  },
];
