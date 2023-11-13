import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { switchPlayer } from '../../../store/slices/tracksSlice';
import classes from './MainTrack.module.css';

function MainTrack() {
  const mainTrack = useAppSelector(state => state.tracks.currentTrack);
  const isPlaying = useAppSelector(state => state.tracks.isPlaying);

  const dispatch = useAppDispatch();

  const switchPlayerHandler = () => {
    dispatch(switchPlayer());
  };

  return (
    <div className={classes['main-track__container']}>
      <img
        className={classes['main-track__image']}
        src={mainTrack?.album.cover_big}
        alt="Track image"
      />
      <div className={classes['main-track__content']}>
        <div className={classes['main-track__title']}>{mainTrack?.title}</div>
        <div className={classes['main-track__subtitle']}>
          by {mainTrack?.artist.name}
        </div>
        <div className={classes['main-track__subtitle']}>
          {mainTrack?.album.title}
        </div>
        <div>
          <button
            onClick={switchPlayerHandler}
            className={`${classes['main-track__button']} ${classes['main-track__button--play']}`}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            style={{ cursor: 'inherit' }}
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
