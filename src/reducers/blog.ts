import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Content = {
  children: [
    {
      text: string;
    }
  ];
};

export type BlogState = {
  title: string;
  slug: string;
  content: Content[];
  categories: string[];
};

const initialBlogState: BlogState[] = [];

export const BlogSlice = createSlice({
  name: "blog",
  initialState: initialBlogState,
  reducers: {
    addBlog: (state, action: PayloadAction<BlogState[]>) => {
      state.length = 0;
      state.push(...action.payload);
    },
  },
});

export const { addBlog } = BlogSlice.actions;
export const Blog = (state: { blog: BlogState[] }) => state.blog;
export default BlogSlice.reducer;
