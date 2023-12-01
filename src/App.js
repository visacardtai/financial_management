import "./App.css";
import { Route, Routes } from "react-router-dom";

import {
  Public,
  Home,
  Pay,
  Debt,
  Receipt,
  Pub,
  CheckPayment,
  HomeIn,
  SearchInvoice,
} from "./containers/public";
import path from "./util/path";
import {
  HomeLec,
  PubLecturer,
  TeachingHours,
} from "./containers/public/lecturer";
import {
  PublicAd,
  HomeAd,
  CreditPrice,
  ExpensePrice,
  Targets,
  LecturePrice,
  Invoice,
  TeachingPeriod,
  StudentExpenses,
} from "./containers/system";
import Missing from "./context/Missing";
import RequireAuth from "./context/RequireAuth";
import Layout from "./context/Layout";
import Unauthorized from "./context/Unauthorized";

const ROLES = {
  SINHVIEN: "ROLE_SINHVIEN",
  GIANGVIEN: "ROLE_GIANGVIEN",
  TRUONGPHONG: "ROLE_TRUONGPHONG",
  QUANLY: "ROLE_QUANLY",
};

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            {/* // route trang chủ */}
            <Route path={path?.HOME} element={<Pub />}>
              <Route path={path?.HOME} element={<HomeIn />} />
              <Route path={path.SEARCH_INVOICE} element={<SearchInvoice />} />
            </Route>
            {/* // route trả kết quả thanh t oán */}
            <Route path={path?.PAYMENT} element={<CheckPayment />}></Route>
            <Route path="unauthorized" element={<Unauthorized />} />

            {/* we want to protect these routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.SINHVIEN]} />}>
              <Route path={path?.PUBLIC} element={<Public />}>
                <Route path={path?.HOME} element={<Home />} />
                <Route path={path?.PAY} element={<Pay />} />
                <Route path={path?.DEBT} element={<Debt />} />
                <Route path={path?.RECEIPT} element={<Receipt />} />
              </Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.GIANGVIEN]} />}>
              <Route path={path?.LECTURER} element={<PubLecturer />}>
                <Route path={path?.HOME} element={<HomeLec />} />
                <Route path={path?.TEACHINGHOURS} element={<TeachingHours />} />
              </Route>
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.QUANLY, ROLES.TRUONGPHONG]} />
              }
            >
              <Route path={path?.PUBLICAD} element={<PublicAd />}>
                <Route path={path?.HOME} element={<HomeAd />} />
                <Route path={path?.CREDITPRICE} element={<CreditPrice />} />
                <Route path={path?.EXPENSESPRICE} element={<ExpensePrice />} />
                <Route path={path?.TARGETS} element={<Targets />} />
                <Route path={path?.LECTUREPRICE} element={<LecturePrice />} />
                <Route path={path?.INVOICE} element={<Invoice />} />
                <Route
                  path={path?.TEACHINGPERIOD}
                  element={<TeachingPeriod />}
                />
                <Route
                  path={path?.STUDENTEXPENSES}
                  element={<StudentExpenses />}
                />
              </Route>
            </Route>
            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

{
  /* <Routes> */
}
{
  /* // route trang chủ */
}
{
  /* <Route path={path?.HOME} element={<Pub />}>
  <Route path={path?.HOME} element={<HomeIn />} />
  <Route path={path.SEARCH_INVOICE} element={<SearchInvoice />} />
</Route> */
}

{
  /* // route trả kết quả thanh t oán */
}
{
  /* <Route path={path?.PAYMENT} element={<CheckPayment />}></Route> */
}
{
  /* // route trang sinh vien */
}
{
  /* <Route path={path?.PUBLIC} element={<Public />}>
  <Route path={path?.HOME} element={<Home />} />
  <Route path={path?.PAY} element={<Pay />} />
  <Route path={path?.DEBT} element={<Debt />} />
  <Route path={path?.RECEIPT} element={<Receipt />} />
</Route> */
}
{
  /* // route trang giảng viên */
}
{
  /* <Route path={path?.LECTURER} element={<PubLecturer />}>
  <Route path={path?.HOME} element={<HomeLec />} />
  <Route path={path?.TEACHINGHOURS} element={<TeachingHours />} />
</Route> */
}
{
  /* // route trang chuyên viên */
}
{
  /* <Route path={path?.PUBLICAD} element={<PublicAd />}>
  <Route path={path?.HOME} element={<HomeAd />} />
  <Route path={path?.CREDITPRICE} element={<CreditPrice />} />
  <Route path={path?.EXPENSESPRICE} element={<ExpensePrice />} />
  <Route path={path?.TARGETS} element={<Targets />} />
  <Route path={path?.LECTUREPRICE} element={<LecturePrice />} />
  <Route path={path?.INVOICE} element={<Invoice />} />
  <Route path={path?.TEACHINGPERIOD} element={<TeachingPeriod />} />
  <Route path={path?.STUDENTEXPENSES} element={<StudentExpenses />} />
</Route>
</Routes> */
}
