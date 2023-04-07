import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TechnologyState {
  name: string;
  featured: boolean;
}

export interface TechnologiesState {
  type: string;
  technologies: TechnologyState[];
}

const initialTechnologyState: TechnologiesState[] = [];

export const TechnologySlice = createSlice({
  name: "technology",
  initialState: initialTechnologyState,
  reducers: {
    addTechnology: (state, action: PayloadAction<TechnologiesState[]>) => {
      state.length = 0;
      state.push(...action.payload);
    },
  },
});

export const { addTechnology } = TechnologySlice.actions;

export const Technology = (state: { technology: TechnologiesState[] }) =>
  state.technology;

export default TechnologySlice.reducer;
