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
} = icons;

export const sidebarMenu = [
  {
    path: "lich-theo-tuan",
    text: "Lịch theo tuần",
    end: true,
    icons: <BsCalendarDate size="24px" />,
  },
  {
    path: "ket-qua-hoc-tap",
    text: "Kết quả học tập",
    end: true,
    icons: <RiLineChartFill size="24px" />,
  },
  {
    path: "dang-ky-hoc-phan",
    text: "Đăng ký học phần",
    end: true,
    icons: <BiBookAdd size="24px" />,
  },
  {
    path: "tra-cuu-cong-no",
    text: "Tra cứu công nợ",
    end: true,
    icons: <RiBillLine size="24px" />,
  },
  {
    path: "thanh-toan",
    text: "Thanh toán",
    end: true,
    icons: <LiaCcAmazonPay size="24px" />,
  },
  {
    path: "phieu-thu-tong-hop",
    text: "Phiếu thu tổng hợp",
    end: true,
    icons: <HiOutlineDocumentChartBar size="24px" />,
  },
  {
    path: "lich-theo-tien-do",
    text: "Lịch theo tiến độ",
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
