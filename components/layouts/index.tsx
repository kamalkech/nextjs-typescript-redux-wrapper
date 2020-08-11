import React from "react";
import FirstLayout from "./FirstLayout";
import SecondLayout from "./SecondLayout";

const Layout = ({ layout_id }: any) => {
  const renderLayout = () => {
    switch (layout_id) {
      case 1:
        return <FirstLayout />;
      case 2:
        return <SecondLayout />;

      default:
        return <FirstLayout />;
    }
  };

  return <>{renderLayout()}</>;
};

export default Layout;
