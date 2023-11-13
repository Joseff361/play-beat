import { ChangeEvent, useEffect, useState } from 'react';

import { useAppSelector } from '../../../store/hooks';
import SwitchPlayer from '../../atoms/SwitchPlayer/SwitchPlayer';
import classes from './Player.module.css';

const player = new Audio();
const DEFAULT_VOLUMEN = 80;

function Player() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(DEFAULT_VOLUMEN);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const currentTrack = useAppSelector(state => state.tracks.currentTrack);

  useEffect(() => {
    player.addEventListener('canplaythrough', () => {
      player.volume = DEFAULT_VOLUMEN / 100;
      setDuration(player.duration);
      setVolume(DEFAULT_VOLUMEN);
    });

    player.addEventListener('timeupdate', () => {
      setCurrentTime(player.currentTime);
    });

    return () => {
      player.removeEventListener('canplaythrough', () => null);
      player.removeEventListener('timeupdate', () => null);
    };
  }, []);

  useEffect(() => {
    if (currentTrack) {
      player.src = currentTrack.preview;
    }
  }, [currentTrack]);

  const clickPlayer = () => {
    console.log(player.currentTime);
    if (isPlaying) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.play();
      setIsPlaying(true);
    }
  };

  const changeVolumeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    player.volume = +event.target.value / 100;
    setVolume(+event.target.value);
    console.log(player.duration);
  };

  return (
    <section className={classes['player__container']}>
      <div className={classes['player__info']}>
        <div className={classes['player__info__description']}>
          <img
            className={classes['player__info__description__image']}
            src={currentTrack?.album.cover_small}
            alt="Track image"
          />
          <div>
            <b>{currentTrack?.artist.name}</b>
            <div>{currentTrack?.title}</div>
          </div>
        </div>
        <SwitchPlayer
          active
          state={isPlaying ? 'stop' : 'play'}
          onClick={clickPlayer}
        />
      </div>
      <div className={classes['player__timer-container']}>
        <input
          style={{ width: '80%' }}
          className={classes['player__timer']}
          type="range"
          max={duration}
          value={currentTime}
          min={0}
          onChange={() => null}
        />
      </div>
      <div className={classes['player__volume-container']}>
        <input
          style={{ width: '30%', cursor: 'pointer' }}
          type="range"
          max={100}
          min={0}
          value={volume}
          onChange={changeVolumeHandler}
        />
      </div>
    </section>
  );
}

export default Player;
