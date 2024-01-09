import React from "react";
import {
  Navigate,
  Infor,
  Group,
  ResultCard,
  TermCard,
  ProgressCard,
} from "../../components";
import { sidebarMenu } from "../../util/navigate";

const Home = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <Navigate sidebarMenu={sidebarMenu} />
      <div className="h-[240px] flex gap-3">
        <Infor />
        <Group />
      </div>
      <div className="h-[320px] flex gap-3 mb-3">
        <ProgressCard />
        <TermCard />
        <ResultCard />
      </div>
    </div>
  );
};

export default Home;
