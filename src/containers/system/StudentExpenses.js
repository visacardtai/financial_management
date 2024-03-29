import * as React from "react";
import { styled } from "@mui/system";
import { Tabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as BaseTabPanel } from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import {
  TableStudentExpenses,
  TableStudentExpensesN,
  TableStudentExpensesP,
  TableStudentExpensesNA,
  Blur,
} from "../../components/admin";
import { useSelector } from "react-redux";

const StudentExpenses = () => {
  const { isBlur, typeBlur, typeDelete, listDelete, role } = useSelector(
    (state) => state.app
  );
  return (
    <div className="flex w-full h-full">
      <Tabs defaultValue={1} className="w-full">
        <TabsList>
          <Tab value={1}>Đã Thanh Toán</Tab>
          <Tab value={2}>Chưa Thanh Toán</Tab>
          <Tab value={3}>Chờ Duyệt</Tab>
        </TabsList>
        <TabPanel value={1}>
          <TableStudentExpenses />
        </TabPanel>
        <TabPanel value={2}>
          {role?.find((item) => item === "ROLE_TRUONGPHONG") ? (
            <TableStudentExpensesNA />
          ) : (
            <TableStudentExpensesN />
          )}
        </TabPanel>
        <TabPanel value={3}>
          <TableStudentExpensesP />
        </TabPanel>
      </Tabs>
      {isBlur && <Blur type={typeBlur} option={typeDelete} data={listDelete} />}
    </div>
  );
};

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const Tab = styled(BaseTab)`
  font-family: "IBM Plex Sans", sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  line-height: 1.5;
  padding: 8px 12px;
  margin: 6px;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)`
  width: 100%;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
    max-width: 480px;
    background-color: ${blue[500]};
    margin-top: 16px;
    margin-left: 16px;
    border-radius: 12px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
    box-shadow: 0px 4px 6px ${
      theme.palette.mode === "dark" ? "rgba(0,0,0, 0.4)" : "rgba(0,0,0, 0.2)"
    };
    `
);

export default StudentExpenses;
