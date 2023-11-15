import { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Track } from '../../../models/Tracks';
import { useAppSelector } from '../../../store/hooks';
import { SkeletonStyles } from '../../../styles/skeletonStyles';
import classes from './TrackMidItems.module.css';

interface Props {
  title: string;
  tracks: Track[];
  onClickTrack: (track: Track) => void;
}

const ITEMS_TO_MOVE = 2;

function TrackMidItems({ title, tracks, onClickTrack }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itemsRef = useRef<any>([]);
  const [currentItemIndex, setCurrentItemIndex] =
    useState<number>(ITEMS_TO_MOVE);
  const loading = useAppSelector(state => state.tracks.loading);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, tracks.length);
  }, [tracks]);

  const moveToRigth = () => {
    if (currentItemIndex < tracks.length - 1) {
      const index =
        currentItemIndex + ITEMS_TO_MOVE > tracks.length - 1
          ? tracks.length - 1
          : currentItemIndex + ITEMS_TO_MOVE;

      itemsRef.current[index]?.scrollIntoView({
        behavior: 'smooth',
      });

      setCurrentItemIndex(index);
    }
  };

  const moveToLeft = () => {
    if (currentItemIndex > 0) {
      const index =
        currentItemIndex - ITEMS_TO_MOVE < 0
          ? 0
          : currentItemIndex - ITEMS_TO_MOVE;

      itemsRef.current[index]?.scrollIntoView({
        behavior: 'smooth',
      });

      setCurrentItemIndex(index);
    }
  };

  let list = (
    <>
      {tracks.map((item, index) => (
        <div
          className={classes['track-mid-item__item-container']}
          key={index}
          ref={el => (itemsRef.current[index] = el)}
          onClick={() => onClickTrack(item)}
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
    </>
  );

  if (loading) {
    list = (
      <div style={SkeletonStyles.tracksContainer}>
        <div style={SkeletonStyles.trackMinContainer}>
          <Skeleton style={SkeletonStyles.tracksContent} />
        </div>
        <div style={SkeletonStyles.trackMinContainer}>
          <Skeleton style={SkeletonStyles.tracksContent} />
        </div>
        <div style={SkeletonStyles.trackMinContainer}>
          <Skeleton style={SkeletonStyles.tracksContent} />
        </div>
      </div>
    );
  }

  return (
    <div className={classes['track-mid-item__container']}>
      <div className={classes['track-mid-item__header']}>
        <span>
          {title}
          <b> songs</b>
        </span>
        <span className={classes['track-mid-item__header__line']}></span>
        <div>
          <i onClick={moveToLeft} className="fa-solid fa-angle-left"></i>
          <i
            onClick={moveToRigth}
            style={{ transform: 'rotate(180deg)' }}
            className="fa-solid fa-angle-left"
          ></i>
        </div>
      </div>
      <div className={classes['track-mid-item__list']}>{list}</div>
    </div>
  );
}

export default TrackMidItems;
