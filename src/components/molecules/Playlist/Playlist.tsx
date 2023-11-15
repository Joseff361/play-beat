import Skeleton from 'react-loading-skeleton';

import { Track } from '../../../models/Tracks';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setCurrentTrack } from '../../../store/slices/tracksSlice';
import { SkeletonStyles } from '../../../styles/skeletonStyles';
import TrackMinItem from '../../atoms/TrackMinItem/TrackMinItem';
import classes from './Playlist.module.css';

function Playlist() {
  const tracks = useAppSelector(state => state.tracks.trackResultList);
  const currentTrack = useAppSelector(state => state.tracks.currentTrack);
  const loading = useAppSelector(state => state.tracks.loading);

  const dispatch = useAppDispatch();

  const selectTrackHandler = (track: Track) => {
    dispatch(setCurrentTrack({ track: track, autoplay: true }));
  };

  let content = (
    <>
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
    </>
  );

  if (loading) {
    content = <Skeleton count={7} style={SkeletonStyles.playlistContent} />;
  }

  return <ul className={classes['playlist__container']}>{content}</ul>;
}

export default Playlist;
