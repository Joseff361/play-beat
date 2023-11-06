import {
  Action,
  PayloadAction,
  ThunkAction,
  createSlice,
} from '@reduxjs/toolkit';

import { Track } from '../../models/Tracks';
import DeezerService from '../../services/DeezerService';
import { RootState } from '../store';

interface TracksState {
  currentTrack: Track | undefined;
  trackResultList: Track[];
  albumRelatedTracks: Track[];
  artistRelatedTracks: Track[];
  loading: boolean;
}

const initialState: TracksState = {
  currentTrack: undefined,
  trackResultList: [],
  albumRelatedTracks: [],
  artistRelatedTracks: [],
  loading: true,
};

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
    },
    setTrackResultList: (state, action: PayloadAction<Track[]>) => {
      state.trackResultList = [...action.payload];
    },
    setAlbumRelatedTracks: (state, action: PayloadAction<Track[]>) => {
      state.albumRelatedTracks = [...action.payload];
    },
    setArtistRelatedTracks: (state, action: PayloadAction<Track[]>) => {
      state.artistRelatedTracks = [...action.payload];
    },
    updateLoadingState: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const setUpTracksAndAlbums = (
  text: string,
): ThunkAction<void, RootState, unknown, Action<unknown>> => {
  return async dispatch => {
    dispatch(tracksSlice.actions.updateLoadingState(true));

    try {
      const { data } = await DeezerService.searchTracks(text);
      if (data.length > 0) {
        dispatch(tracksSlice.actions.setCurrentTrack(data[0]));
        dispatch(tracksSlice.actions.setTrackResultList(data));

        const mainTrack = data[0];

        const { tracks } = await DeezerService.findAlbum(mainTrack.album.id);
        dispatch(tracksSlice.actions.setAlbumRelatedTracks(tracks.data));

        const { data: artistTracks } =
          await DeezerService.searchArtistTopTracks(
            encodeURI(mainTrack.artist.name),
          );
        dispatch(tracksSlice.actions.setArtistRelatedTracks(artistTracks));
      }
    } catch {
      alert('error!');
    } finally {
      dispatch(tracksSlice.actions.updateLoadingState(false));
    }
  };
};

export const { setCurrentTrack, setTrackResultList, setAlbumRelatedTracks } =
  tracksSlice.actions;

export default tracksSlice.reducer;
