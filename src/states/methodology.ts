import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MethodologyState {
    title: string;
    description: string;
}

const initialMethodologyState: MethodologyState[] = [];

export const MethodologySlice = createSlice({
    name: 'methodology',
    initialState: initialMethodologyState,
    reducers: {
        addMethodology: (state, action: PayloadAction<MethodologyState[]>) => {
            state.length = 0;
            state.push(...action.payload);
        }
    }
})

export const { addMethodology } = MethodologySlice.actions;

export const Methodology = (state: { methodology: MethodologyState[]; }) => state.methodology;

export default MethodologySlice.reducer;