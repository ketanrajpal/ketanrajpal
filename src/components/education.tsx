import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addEducation, Education } from "../reducers/education";
import sanity from "../services/sanity";

export const EducationComponent = () => {
  const state = useAppSelector(Education);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state.length > 0) return;
    sanity
      .fetch(
        `*[_type == "education"]|order(endDate desc) {
            programme,
            school,
            schoolUrl,
            location,
            startDate,
            endDate,
            present,
            description,
            "subjects":subjects[]->name
        }`
      )
      .then((data) => {
        dispatch(addEducation(data));
      })
      .catch(console.error);
  }, [state.length, dispatch]);

  return state.length > 0 ? (
    <ul>
      {state.map((education, index) => (
        <li key={index}>{JSON.stringify(education)}</li>
      ))}
    </ul>
  ) : (
    <h1>Loading...</h1>
  );
};
