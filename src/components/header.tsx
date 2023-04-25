import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { Setting, changeTheme } from "../reducers/setting";

export const HeaderComponent = () => {
  return (
    <div className="header_component">
      <div className="container">
        <Link to="/" className="heading">
          Ketan Rajpal
        </Link>
        <nav></nav>
        <a href="mailto:info@krpl.in" className="contact">
          <span className="material-symbols-rounded">alternate_email</span>
          <span>info@krpl.in</span>
        </a>
        <DarkLightModeComponent />
      </div>
    </div>
  );
};

export const DarkLightModeComponent = () => {
  const state = useAppSelector(Setting);
  const dispatch = useAppDispatch();

  const HandleChangeMode = () => {
    dispatch(changeTheme(state.theme === "dark" ? "light" : "dark"));
  };

  return (
    <button onClick={HandleChangeMode}>
      {state.theme === "dark" ? (
        <span className="material-symbols-rounded">light_mode</span>
      ) : (
        <span className="material-symbols-rounded">dark_mode</span>
      )}
    </button>
  );
};
