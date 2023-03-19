import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TechnologyState {
    type: string;
    technologies: string[];
}

const initialTechnologyState: TechnologyState[] = [];

export const TechnologySlice = createSlice({
    name: 'technology',
    initialState: initialTechnologyState,
    reducers: {
        addTechnology: (state, action: PayloadAction<TechnologyState[]>) => {
            state.length = 0;
            state.push(...action.payload);
        }
    }
})

export const { addTechnology } = TechnologySlice.actions;

export const Technology = (state: { technology: TechnologyState[]; }) => state.technology;

export default TechnologySlice.reducer;