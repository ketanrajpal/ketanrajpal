import React from 'react';
import RouterComponent from "./services/router";

import { useAppSelector } from './app/hooks';
import { Setting } from "./reducers/setting";

function Application() {
  const state = useAppSelector(Setting);
  return (
    <div className={`${state.theme}`}>
      <RouterComponent />
    </div>
  );
}

export default Application;
