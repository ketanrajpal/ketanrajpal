import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PrincipleState {
    title: string;
    description: string;
}

const initialPrincipleState: PrincipleState[] = [];

export const PrincipleSlice = createSlice({
    name: 'principle',
    initialState: initialPrincipleState,
    reducers: {
        addPrinciple: (state, action: PayloadAction<PrincipleState[]>) => {
            state.length = 0;
            state.push(...action.payload);
        }
    }
})

export const { addPrinciple } = PrincipleSlice.actions;

export const Principle = (state: { principle: PrincipleState[]; }) => state.principle;

export default PrincipleSlice.reducer;