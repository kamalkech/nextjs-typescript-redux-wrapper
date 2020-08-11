import { ReactNode } from "react";
import FirstLayout from "./FirstLayout";
import SecondLayout from "./SecondLayout";

type Props = {
  children?: ReactNode;
  layout_id: number;
};

const Layout = ({ children, layout_id }: Props) => {
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

  return <>
    {children}
    {renderLayout()}
  </>;
};

export default Layout;
