import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Track } from '../../models/Tracks';

interface TracksState {
  tracks: Track[];
}

const initialState: TracksState = {
  tracks: [],
};

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setTracks: (state, action: PayloadAction<Track[]>) => {
      state.tracks = [...action.payload];
    },
  },
});

export const { setTracks } = tracksSlice.actions;

export default tracksSlice.reducer;
