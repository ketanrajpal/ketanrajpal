import { Outlet } from "react-router-dom";

import { HeaderComponent } from "./header";

export const RootComponent = () => {
  return (
    <>
      <HeaderComponent />
      <Outlet />
    </>
  );
};
