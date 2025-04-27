import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import awardReducer from "../reducers/award";
import educationReducer from "../reducers/education";
import experienceReducer from "../reducers/experience";
import methodologyReducer from "../reducers/methodology";
import principleReducer from "../reducers/principle";
import projectReducer from "../reducers/project";
import reviewReducer from "../reducers/review";
import settingReducer from "../reducers/setting";
import technologyReducer from "../reducers/technology";
import blogReducer from "../reducers/blog";

export const store = configureStore({
  reducer: {
    award: awardReducer,
    education: educationReducer,
    experience: experienceReducer,
    methodology: methodologyReducer,
    principle: principleReducer,
    project: projectReducer,
    review: reviewReducer,
    setting: settingReducer,
    technology: technologyReducer,
    blog: blogReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
