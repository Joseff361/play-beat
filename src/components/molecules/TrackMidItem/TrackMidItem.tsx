import { Track } from '../../../models/Tracks';
import classes from './TrackMidItem.module.css';

interface Props {
  title: string;
  tracks: Track[];
}

function TrackMidItem({ title, tracks }: Props) {
  return (
    <div className={classes['track-mid-item__container']}>
      <div className={classes['track-mid-item__header']}>
        <span>
          {title}
          <b> songs</b>
        </span>
        <span className={classes['track-mid-item__header__line']}></span>
      </div>
      <div className={classes['track-mid-item__list']}>
        {tracks.map((item, index) => (
          <div
            className={classes['track-mid-item__item-container']}
            key={index}
          >
            <img
              className={classes['track-mid-item__image']}
              alt="Track image"
              src={item.album.cover_medium}
            />
            <div className={classes['track-mid-item__title']}>{item.title}</div>
            <div className={classes['track-mid-item__subtitle']}>
              {item.artist.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackMidItem;
