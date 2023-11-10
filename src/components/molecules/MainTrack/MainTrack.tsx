import { useAppSelector } from '../../../store/hooks';
import classes from './MainTrack.module.css';

function MainTrack() {
  const mainTrack = useAppSelector(state => state.tracks.currentTrack);

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
            className={`${classes['main-track__button']} ${classes['main-track__button--play']}`}
          >
            Play
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
