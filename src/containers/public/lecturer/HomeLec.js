import React from "react";
import {
  Navigate,
  Infor,
  Group,
  ResultCard,
  TermCard,
  ProgressCard,
} from "../../../components";
import { sidebarMenu } from "../../../util/navigateLec";
import { GroupLec } from "../../../components/lecturer";

const lecturer = {
  title: "Thông tin giảng viên",
};

const HomeLec = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <Navigate sidebarMenu={sidebarMenu} />
      <div className="h-[240px] flex gap-3">
        <Infor />
        <GroupLec />
      </div>
      <div className="h-[360px] flex gap-3 mb-3">
        <ProgressCard />
        <TermCard />
        <ResultCard />
      </div>
    </div>
  );
};

export default HomeLec;
