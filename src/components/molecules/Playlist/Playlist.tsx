import { Track } from '../../../models/Tracks';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setCurrentTrack } from '../../../store/slices/tracksSlice';
import TrackMinItem from '../../atoms/TrackMinItem/TrackMinItem';
import classes from './Playlist.module.css';

function Playlist() {
  const tracks = useAppSelector(state => state.tracks.trackResultList);
  const currentTrack = useAppSelector(state => state.tracks.currentTrack);

  const dispatch = useAppDispatch();

  const selectTrackHandler = (track: Track) => {
    dispatch(setCurrentTrack({ track: track, autoplay: true }));
  };

  return (
    <ul className={classes['playlist__container']}>
      {tracks
        .filter(t => t.id !== currentTrack?.id)
        .map((track, index) => (
          <TrackMinItem
            onClick={() => selectTrackHandler(track)}
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
