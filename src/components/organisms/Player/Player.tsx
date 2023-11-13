import { ChangeEvent, useEffect, useState } from 'react';

import PlayerService from '../../../services/PlayerService';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { switchPlayer } from '../../../store/slices/tracksSlice';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar';
import SwitchPlayer from '../../atoms/SwitchPlayer/SwitchPlayer';
import Volume from '../../atoms/Volume/Volume';
import classes from './Player.module.css';

const DEFAULT_VOLUMEN = 80;

function Player() {
  const [volume, setVolume] = useState<number>(DEFAULT_VOLUMEN);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const dispatch = useAppDispatch();

  const currentTrack = useAppSelector(state => state.tracks.currentTrack);
  const isPlaying = useAppSelector(state => state.tracks.isPlaying);

  useEffect(() => {
    PlayerService.player.addEventListener('canplaythrough', () => {
      PlayerService.player.volume = DEFAULT_VOLUMEN / 100;
      setDuration(PlayerService.player.duration);
      setVolume(DEFAULT_VOLUMEN);
    });

    PlayerService.player.addEventListener('timeupdate', () => {
      setCurrentTime(PlayerService.player.currentTime);
    });

    return () => {
      PlayerService.player.removeEventListener('canplaythrough', () => null);
      PlayerService.player.removeEventListener('timeupdate', () => null);
    };
  }, []);

  const clickPlayer = () => {
    dispatch(switchPlayer());
  };

  const changeVolumeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    PlayerService.player.volume = +event.target.value / 100;
    setVolume(+event.target.value);
  };

  const handleClickVolumen = () => {
    if (volume !== 0) {
      PlayerService.player.volume = 0;
      setVolume(0);
    } else {
      PlayerService.player.volume = DEFAULT_VOLUMEN / 100;
      setVolume(DEFAULT_VOLUMEN);
    }
  };

  const formatTime = (value: number) => {
    return `00: ${Math.round(value)}`;
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
            <div className={classes['player__info__description__track']}>
              {currentTrack?.title}
            </div>
          </div>
        </div>
        <SwitchPlayer
          active
          state={isPlaying ? 'stop' : 'play'}
          onClick={clickPlayer}
        />
      </div>
      <div className={classes['player__timer-container']}>
        <div>{formatTime(duration)}</div>
        <ProgressBar duration={duration} progress={currentTime} />
      </div>
      <div className={classes['player__volume-container']}>
        <input
          style={{
            marginRight: 20,
            background: `linear-gradient(to right, #3cbc6e ${volume}%, #bcbcbc ${volume}%)`,
          }}
          type="range"
          max={100}
          min={0}
          value={volume}
          onChange={changeVolumeHandler}
        />
        <Volume volume={volume} onClick={handleClickVolumen} />
      </div>
    </section>
  );
}

export default Player;
