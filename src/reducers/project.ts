import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProjectState {
    title: string;
    slug: string;
    description: string;
    url: number;
    tags: [string];
    technologies: [string];
}

const initialProjectState: ProjectState[] = [];

export const ProjectSlice = createSlice({
    name: 'project',
    initialState: initialProjectState,
    reducers: {
        addProject: (state, action: PayloadAction<ProjectState[]>) => {
            state.length = 0;
            state.push(...action.payload);
        }
    }
})

export const { addProject } = ProjectSlice.actions;

export const Project = (state: { project: ProjectState[]; }) => state.project;

export default ProjectSlice.reducer;