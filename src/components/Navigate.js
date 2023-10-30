import React from "react";

import Card from "./Card";

const Navigate = ({ sidebarMenu }) => {
  return (
    <div className="grid grid-cols-8 gap-[14px]">
      {sidebarMenu?.map((item) => (
        <Card data={item} key={item.text} />
      ))}
    </div>
  );
};

export default Navigate;
