import { useAppSelector } from '../../../store/hooks';
import TrackMinItem from '../../atoms/TrackMinItem/TrackMinItem';
import classes from './Playlist.module.css';

function Playlist() {
  const tracks = useAppSelector(state => state.tracks.trackResultList);
  return (
    <ul className={classes['playlist__container']}>
      {tracks.slice(1).map((track, index) => (
        <TrackMinItem
          key={track.id}
          order={index + 1}
          imageSource={track.album.cover_medium}
          trackName={track.title}
          trackArtist={track.artist.name}
        />
      ))}
    </ul>
  );
}

export default Playlist;
