import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addContent, Setting } from "../reducers/setting";
import sanity from "../services/sanity";

import { ExperienceComponent } from "./experience";

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
    const { title, description } = content.filter(
      (item: { slug: string }) => item.slug === slug
    )[0];
    return { title, description };
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
                HandleSettingContent("title").description
              )}
            ></h1>
            <div className="social_link">
              <a
                href={HandleSettingContent("github").description}
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-rounded">call_made</span>
                <span>{HandleSettingContent("github").title}</span>
              </a>
              <a
                href={HandleSettingContent("linkedin").description}
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-rounded">call_made</span>
                <span>{HandleSettingContent("linkedin").title}</span>
              </a>
              <a
                href={HandleSettingContent("behance").description}
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-rounded">call_made</span>
                <span>{HandleSettingContent("behance").title}</span>
              </a>
            </div>
          </div>
        ) : null}
      </div>
      <ExperienceComponent />
    </>
  );
};
