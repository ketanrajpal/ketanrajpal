import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addExperience, Experience } from "../reducers/experience";
import sanity from "../services/sanity";

export const ExperienceComponent = () => {
  const state = useAppSelector(Experience);
  const dispatch = useAppDispatch();

  const HandleDate = (date_string: string) => {
    const date = new Date(date_string);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  useEffect(() => {
    if (state.length > 0) return;
    sanity
      .fetch(
        `*[_type == "experience"]|order(present desc, endDate desc) {
            company,
            title,
            location,
            startDate,
            endDate,
            present,
            description,
            "technologies": technologies[]->name,
        }`
      )
      .then((data) => {
        dispatch(addExperience(data));
      })
      .catch(console.error);
  }, [state.length, dispatch]);

  return state.length > 0 ? (
    <section className="experience_component">
      <ul className="timeline-list">
        {state.map((experience, index) => (
          <li key={index}>
            <div className="content">
              <h3>
                {HandleDate(experience.startDate)} &ndash;{" "}
                {experience.present
                  ? "Present"
                  : HandleDate(experience.endDate)}
              </h3>
              <h2>
                <span>{experience.title}</span>
                <span className="material-symbols-rounded">
                  alternate_email
                </span>
                <span>{experience.company}</span>
              </h2>
              <p>
                {experience.description.map((experience, index) => (
                  <span key={index}>{experience}</span>
                ))}
              </p>
              <div className="technologies">
                {experience.technologies.map((technology, index) => (
                  <span key={index}>{technology}</span>
                ))}
              </div>
              <br />
            </div>
          </li>
        ))}
      </ul>
    </section>
  ) : null;
};
