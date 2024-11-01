import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideoState {
  videos: string[];
  thumbnails: string[];
}

const initialState: VideoState = {
  videos: [],
  thumbnails: [],
};

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    addVideo(
      state,
      action: PayloadAction<{ videoUri: string; thumbnailUri: string }>
    ) {
      state.videos.push(action.payload.videoUri);
      state.thumbnails.push(action.payload.thumbnailUri);
    },
  },
});

export const { addVideo } = videoSlice.actions;
export default videoSlice.reducer;
