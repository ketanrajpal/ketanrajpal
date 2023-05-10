import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ExperienceState {
  company: string;
  companyUrl: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  present: boolean;
  description: [string];
  technologies: [string];
}

const initialExperienceState: ExperienceState[] = [];

export const ExperienceSlice = createSlice({
  name: "experience",
  initialState: initialExperienceState,
  reducers: {
    addExperience: (state, action: PayloadAction<ExperienceState[]>) => {
      state.length = 0;
      state.push(...action.payload);
    },
  },
});

export const { addExperience } = ExperienceSlice.actions;

export const Experience = (state: { experience: ExperienceState[] }) =>
  state.experience;

export default ExperienceSlice.reducer;
