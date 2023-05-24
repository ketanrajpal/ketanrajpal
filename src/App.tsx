import React, { useEffect } from "react";
import RouterComponent from "./services/router";

import { useAppSelector, useAppDispatch } from "./app/hooks";
import { Setting, changeTheme } from "./reducers/setting";

function Application() {
  const state = useAppSelector(Setting);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
      dispatch(changeTheme("dark"));
    else dispatch(changeTheme("light"));
  }, [dispatch]);

  return (
    <div className={`${state.theme}`}>
      <RouterComponent />
    </div>
  );
}

export default Application;
