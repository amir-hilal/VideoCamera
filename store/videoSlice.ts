import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideoState {
  videos: string[];
}

const initialState: VideoState = {
  videos: [],
};

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setVideos(state, action: PayloadAction<string[]>) {
      state.videos = action.payload;
    },
    addVideo(state, action: PayloadAction<string>) {
      state.videos.push(action.payload);
    },
  },
});

export const { setVideos, addVideo } = videoSlice.actions;
export default videoSlice.reducer;
