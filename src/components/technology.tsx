import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  addTechnology,
  Technology,
  TechnologyState,
} from "../reducers/technology";
import sanity from "../services/sanity";
import Marquee from "react-fast-marquee";

export const TechnologyComponent = () => {
  const state = useAppSelector(Technology);
  const dispatch = useAppDispatch();

  const [TechnologyState, setTechnologyState] = useState<TechnologyState[]>([]);

  useEffect(() => {
    if (state.length > 0) return;
    sanity
      .fetch(
        `*[_type == "technology-type"]|order(orderRank){
            name,
            "technologies": *[_type=='technology' && references(^._id)]{name,featured}
        }`
      )
      .then((data) => {
        dispatch(addTechnology(data));
      })
      .catch(console.error);
  }, [state.length, dispatch]);

  useEffect(() => {
    if (state.length > 0) {
      for (const technologies of state) {
        for (const technology of technologies.technologies) {
          setTechnologyState((prev) => [...prev, technology]);
        }
      }
    }
  }, [state]);

  const ShuffleTechnologies = (direction: "left" | "right") => {
    let currentIndex = TechnologyState.length,
      randomIndex;
    const shuffle_array: TechnologyState[] = TechnologyState;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [shuffle_array[currentIndex], shuffle_array[randomIndex]] = [
        shuffle_array[randomIndex],
        shuffle_array[currentIndex],
      ];
    }

    return (
      <Marquee gradient={false} direction={direction} speed={1}>
        {shuffle_array.map((technology, index) => (
          <span
            key={index}
            className={`technology ${technology.featured ? "featured" : ""}`}
          >
            {technology.name}
          </span>
        ))}
      </Marquee>
    );
  };

  return state.length > 0 && TechnologyState.length > 0 ? (
    <section className="technology_component">
      {ShuffleTechnologies("left")}
      {ShuffleTechnologies("right")}
      {ShuffleTechnologies("left")}
      {ShuffleTechnologies("right")}
    </section>
  ) : (
    <h1>Loading...</h1>
  );
};
