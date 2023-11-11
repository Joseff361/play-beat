import { useAppSelector } from '../../../store/hooks';
import MainTrack from '../../molecules/MainTrack/MainTrack';
import Playlist from '../../molecules/Playlist/Playlist';
import TrackMidItem from '../../molecules/TrackMidItem/TrackMidItem';
import classes from './Content.module.css';

function Content() {
  const albumRelatedTracks = useAppSelector(
    state => state.tracks.albumRelatedTracks,
  );

  const artistRelatedTracks = useAppSelector(
    state => state.tracks.artistRelatedTracks,
  );

  return (
    <section className={classes['content__container']}>
      <div className={classes['content__main-results']}>
        <MainTrack />
        <Playlist />
      </div>
      <div className={classes['content__related-results']}>
        <TrackMidItem title="Album" tracks={albumRelatedTracks} />
        <TrackMidItem title="Artist" tracks={artistRelatedTracks} />
      </div>
    </section>
  );
}

export default Content;
