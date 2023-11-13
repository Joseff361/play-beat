import { Track } from '../../../models/Tracks';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  setCurrentTrack,
  setTrackResultList,
} from '../../../store/slices/tracksSlice';
import MainTrack from '../../molecules/MainTrack/MainTrack';
import Playlist from '../../molecules/Playlist/Playlist';
import TrackMidItems from '../../molecules/TrackMidItems/TrackMidItems';
import classes from './Content.module.css';

function Content() {
  const dispatch = useAppDispatch();

  const albumRelatedTracks = useAppSelector(
    state => state.tracks.albumRelatedTracks,
  );

  const artistRelatedTracks = useAppSelector(
    state => state.tracks.artistRelatedTracks,
  );

  const selectAlbumTracksHandler = (track: Track) => {
    dispatch(setCurrentTrack(track));
    dispatch(setTrackResultList(albumRelatedTracks));
  };

  const selectArtistTracksHandler = (track: Track) => {
    dispatch(setCurrentTrack(track));
    dispatch(setTrackResultList(artistRelatedTracks));
  };

  return (
    <section className={classes['content__container']}>
      <div className={classes['content__main-results']}>
        <MainTrack />
        <Playlist />
      </div>
      <div className={classes['content__related-results']}>
        <TrackMidItems
          onClickTrack={selectAlbumTracksHandler}
          title="Album"
          tracks={albumRelatedTracks}
        />
        <TrackMidItems
          onClickTrack={selectArtistTracksHandler}
          title="Artist"
          tracks={artistRelatedTracks}
        />
      </div>
    </section>
  );
}

export default Content;
