import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addProject, Project } from "../reducers/project";
import sanity from "../services/sanity";

import img from "../assets/project/usa-taxi-and-limo-service-website.png";

export const ProjectComponent = () => {
  const state = useAppSelector(Project);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state.length > 0) return;
    sanity
      .fetch(
        `*[_type == "project"]|order(orderRank){
            title,
            "slug":slug.current,
            description,
            url,
            "tags":tags[]->name,
            "technologies":technologies[]->name,
        }`
      )
      .then((data) => {
        dispatch(addProject(data));
      })
      .catch(console.error);
  }, [state.length, dispatch]);

  return state.length > 0 ? (
    <section className="project_component">
      <div className="container">
        {state.map((project, index) => {
          return (
            <article>
              <h2>{project.tags}</h2>
              <h1>{project.title}</h1>

              <img src={img} alt="project" />
            </article>
          );
        })}
      </div>
    </section>
  ) : null;
};
