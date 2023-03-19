import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addContent, Setting } from "../reducers/setting";
import sanity from "../services/sanity";

import { ProjectComponent } from "./project";

export const HomeComponent = () => {
  const state = useAppSelector(Setting);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state.content.length > 0) return;
    sanity
      .fetch(
        `*[_type == "setting"]{
            title,
            "slug":slug.current,
            description,
        }`
      )
      .then((data) => {
        dispatch(addContent(data));
      })
      .catch(console.error);
  }, [state.content.length, dispatch]);

  const HandleSettingContent = (slug: string) => {
    const content = state.content;
    return content.filter((item: { slug: string }) => item.slug === slug)[0]
      .description;
  };

  const HandleTitleString = (string: string) => {
    string = string.replace(
      "{experience}",
      (new Date().getFullYear() - 2010).toString()
    );
    return { __html: string };
  };

  return (
    <>
      <div className="home_component">
        {state.content.length > 0 ? (
          <div className="container">
            <h1
              dangerouslySetInnerHTML={HandleTitleString(
                HandleSettingContent("title")
              )}
            ></h1>
          </div>
        ) : null}
      </div>
      <ProjectComponent />
    </>
  );
};
