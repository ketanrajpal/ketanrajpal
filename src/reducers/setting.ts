import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingState {
    title: string;
    slug: string;
    description: string;
}

const initialSettingState: SettingState[] = [];

export const SettingSlice = createSlice({
    name: 'setting',
    initialState: initialSettingState,
    reducers: {
        addSetting: (state, action: PayloadAction<SettingState[]>) => {
            state.length = 0;
            state.push(...action.payload);
        }
    }
})

export const { addSetting } = SettingSlice.actions;

export const Setting = (state: { setting: SettingState[]; }) => state.setting;

export default SettingSlice.reducer;