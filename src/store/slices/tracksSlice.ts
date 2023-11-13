import {
  Action,
  PayloadAction,
  ThunkAction,
  createSlice,
} from '@reduxjs/toolkit';

import { Track } from '../../models/Tracks';
import DeezerService from '../../services/DeezerService';
import PlayerService from '../../services/PlayerService';
import { RootState } from '../store';

interface TracksState {
  currentTrack: Track | undefined;
  trackResultList: Track[];
  albumRelatedTracks: Track[];
  artistRelatedTracks: Track[];
  loading: boolean;
  isPlaying: boolean;
}

const initialState: TracksState = {
  currentTrack: undefined,
  trackResultList: [],
  albumRelatedTracks: [],
  artistRelatedTracks: [],
  loading: true,
  isPlaying: false,
};

interface SetCurrentTrack {
  track: Track;
  autoplay: boolean;
}

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<SetCurrentTrack>) => {
      state.currentTrack = action.payload.track;
      PlayerService.player.src = action.payload.track.preview;

      if (action.payload.autoplay) {
        PlayerService.player.play();
        state.isPlaying = true;
      }
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
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    switchPlayer: state => {
      if (state.isPlaying) {
        PlayerService.player.pause();
        state.isPlaying = false;
      } else {
        PlayerService.player.play();
        state.isPlaying = true;
      }
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
        dispatch(tracksSlice.actions.setIsPlaying(false));
        dispatch(
          tracksSlice.actions.setCurrentTrack({
            track: data[0],
            autoplay: false,
          }),
        );
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

export const {
  setCurrentTrack,
  setTrackResultList,
  setAlbumRelatedTracks,
  switchPlayer,
} = tracksSlice.actions;

export default tracksSlice.reducer;
