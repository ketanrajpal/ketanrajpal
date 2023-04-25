import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addAward, Award } from "../reducers/award";
import sanity from "../services/sanity";

import { Swiper, SwiperSlide } from "swiper/react";

export const AwardComponent = () => {
  const state = useAppSelector(Award);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state.length > 0) return;
    sanity
      .fetch(
        `*[_type == "award"]|order(date desc) {
            name,
            "institution": institution->name,
            "event": event->name,
            rank,
            date
        }`
      )
      .then((data) => {
        dispatch(addAward(data));
      })
      .catch(console.error);
  }, [state.length, dispatch]);

  return state.length > 0 ? (
    <section className="award_component">
      <Swiper slidesPerView={"auto"} spaceBetween={30} mousewheel={true}>
        <SwiperSlide>
          <div>
            <h1>Awards</h1>
          </div>
        </SwiperSlide>
        {state.map((award, index) => (
          <SwiperSlide key={index}>
            <div>
              <h3>
                {award.rank}
                <sup>{award.rank === 1 ? "st" : "nd"}</sup> Prize
              </h3>
              <h1>{award.name}</h1>
              <h2>{award.institution}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  ) : (
    <h1>Loading...</h1>
  );
};
