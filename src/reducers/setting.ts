import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface ContentState {
    title: string;
    slug: string;
    description: string;
}

export interface SettingState {
    content: ContentState[];
    theme: 'light' | 'dark';
}

const initialSettingState: SettingState = {
    content: [],
    theme: 'light',
};

export const SettingSlice = createSlice({
    name: 'setting',
    initialState: initialSettingState,
    reducers: {
        addContent: (state, action: PayloadAction<ContentState[]>) => {
            return { ...state, content: action.payload };
        },
        changeTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            return { ...state, theme: action.payload };
        }
    }
})

export const { addContent, changeTheme } = SettingSlice.actions;

export const Setting = (state: { setting: SettingState; }) => state.setting;

export default SettingSlice.reducer;