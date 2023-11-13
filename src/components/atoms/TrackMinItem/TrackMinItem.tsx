import SwitchPlayer from '../SwitchPlayer/SwitchPlayer';
import classes from './TrackMinItem.module.css';

interface Props {
  order: number;
  imageSource: string;
  trackName: string;
  trackArtist: string;
  onClick: () => void;
}

function TrackMinItem({
  order,
  imageSource,
  trackName,
  trackArtist,
  onClick,
}: Props) {
  const buildOrder = (value: number): string => {
    if (value < 10) {
      return `0${order}.`;
    }

    return `${order}.`;
  };

  return (
    <li className={classes['track-item__container']} onClick={onClick}>
      <div className={classes['track-item__container--small']}>
        {buildOrder(order)}
      </div>
      <div className={classes['track-item__container--small']}>
        <img
          className={classes['track-item__image']}
          src={imageSource}
          alt="Track image"
        />
      </div>
      <div className={classes['track-item__container--medium']}>
        <div className={classes['track-item__title']}>{trackName}</div>
        <div className={classes['track-item__artist']}>{trackArtist}</div>
      </div>
      <span className={classes['track-item__container--small']}>
        <i className="fa-regular fa-heart"></i>
      </span>
      <span className={classes['track-item__container--small']}>
        <SwitchPlayer onClick={() => null} />
      </span>
    </li>
  );
}

export default TrackMinItem;
