import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EducationState {
    programme: string;
    school: string;
    schoolUrl: string;
    location: number;
    startDate: string;
    endDate: string;
    present: boolean;
    description: [string];
    subjects: [string];
}

const initialEducationState: EducationState[] = [];

export const EducationSlice = createSlice({
    name: 'education',
    initialState: initialEducationState,
    reducers: {
        addEducation: (state, action: PayloadAction<EducationState[]>) => {
            state.length = 0;
            state.push(...action.payload);
        }
    }
})

export const { addEducation } = EducationSlice.actions;

export const Education = (state: { education: EducationState[]; }) => state.education;

export default EducationSlice.reducer;