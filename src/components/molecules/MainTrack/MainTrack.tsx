import Skeleton from 'react-loading-skeleton';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { switchPlayer } from '../../../store/slices/tracksSlice';
import { SkeletonStyles } from '../../../styles/skeletonStyles';
import classes from './MainTrack.module.css';

function MainTrack() {
  const mainTrack = useAppSelector(state => state.tracks.currentTrack);
  const isPlaying = useAppSelector(state => state.tracks.isPlaying);
  const loading = useAppSelector(state => state.tracks.loading);

  const dispatch = useAppDispatch();

  const switchPlayerHandler = () => {
    dispatch(switchPlayer());
  };

  let image = (
    <img
      className={classes['main-track__image']}
      src={mainTrack?.album.cover_big}
      alt="Track image"
    />
  );

  let content = (
    <>
      <div className={classes['main-track__title']}>{mainTrack?.title}</div>
      <div className={classes['main-track__subtitle']}>
        by {mainTrack?.artist.name}
      </div>
      <div className={classes['main-track__subtitle']}>
        {mainTrack?.album.title}
      </div>
    </>
  );

  if (loading) {
    image = (
      <div style={SkeletonStyles.mainTrackImage}>
        <Skeleton style={{ height: '100%' }} />
      </div>
    );

    content = (
      <div style={{ height: '80%' }}>
        <Skeleton count={3} style={SkeletonStyles.mainTrackContent} />
      </div>
    );
  }

  return (
    <div className={classes['main-track__container']}>
      {image}
      <div className={classes['main-track__content']}>
        {content}
        <div>
          <button
            onClick={switchPlayerHandler}
            className={`${classes['main-track__button']} ${classes['main-track__button--play']}`}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            className={`${classes['main-track__button']} ${classes['main-track__button--follow']}`}
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainTrack;
