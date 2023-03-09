import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ReviewState {
    name: string;
    designation: string;
    organisation: string;
    description: string;
    image: string;
}

const initialReviewState: ReviewState[] = [];

export const ReviewSlice = createSlice({
    name: 'review',
    initialState: initialReviewState,
    reducers: {
        addReview: (state, action: PayloadAction<ReviewState[]>) => {
            state.length = 0;
            state.push(...action.payload);
        }
    }
})

export const { addReview } = ReviewSlice.actions;

export const Review = (state: { review: ReviewState[]; }) => state.review;

export default ReviewSlice.reducer;