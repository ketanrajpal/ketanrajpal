import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import awardReducer from '../states/award';

import educationReducer from '../states/education';
import experienceReducer from '../states/experience';
import methodologyReducer from '../states/methodology';
import principleReducer from '../states/principle';
import projectReducer from '../states/project';
import reviewReducer from '../states/review';
import settingReducer from '../states/setting';
import technologyReducer from '../states/technology';

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
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
