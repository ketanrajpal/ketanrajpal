import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AwardState {
    name: string;
    institution: string;
    event: string;
    rank: number;
    date: string;
}

const initialAwardState: AwardState[] = [];

export const AwardSlice = createSlice({
    name: 'award',
    initialState: initialAwardState,
    reducers: {
        addAward: (state, action: PayloadAction<AwardState[]>) => {
            state.length = 0;
            state.push(...action.payload);
        }
    }
})

export const { addAward } = AwardSlice.actions;

export const Award = (state: { award: AwardState[]; }) => state.award;

export default AwardSlice.reducer;