import { ChangeEvent, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import PlayerService from '../../../services/PlayerService';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  playlistAction,
  switchPlayer,
} from '../../../store/slices/tracksSlice';
import { SkeletonStyles } from '../../../styles/skeletonStyles';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar';
import SwitchPlayer from '../../atoms/SwitchPlayer/SwitchPlayer';
import Volume from '../../atoms/Volume/Volume';
import classes from './Player.module.css';

let consistentVolume = 0.6;

function Player() {
  // volume scale for the range input (0-100)
  const [volume, setVolume] = useState<number>(consistentVolume * 100);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const dispatch = useAppDispatch();

  const currentTrack = useAppSelector(state => state.tracks.currentTrack);
  const isPlaying = useAppSelector(state => state.tracks.isPlaying);
  const loading = useAppSelector(state => state.tracks.loading);

  useEffect(() => {
    PlayerService.player.addEventListener('canplaythrough', () => {
      setDuration(PlayerService.player.duration);

      PlayerService.player.volume = consistentVolume;
      setVolume(consistentVolume * 100);
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
    consistentVolume = +event.target.value / 100;
    PlayerService.player.volume = consistentVolume;
    setVolume(consistentVolume * 100);
  };

  const handleClickVolumen = () => {
    if (volume !== 0) {
      PlayerService.player.volume = 0;
      setVolume(0);
    } else {
      PlayerService.player.volume = consistentVolume;
      setVolume(consistentVolume * 100);
    }
  };

  const formatTime = (value: number) => {
    return `00: ${Math.round(value)}`;
  };

  let image = (
    <img
      className={classes['player__info__description__image']}
      src={currentTrack?.album.cover_small}
      alt="Track image"
    />
  );

  let description = (
    <div className={classes['player__info__description__text']}>
      <b>{currentTrack?.artist.name}</b>
      <div className={classes['player__info__description__track']}>
        {currentTrack?.title}
      </div>
    </div>
  );

  if (loading) {
    image = <Skeleton style={SkeletonStyles.playerImage} />;

    description = (
      <Skeleton count={2} style={SkeletonStyles.playerDescription} />
    );
  }

  return (
    <section className={classes['player__container']}>
      <div className={classes['player__info']}>
        <div className={classes['player__info__description']}>
          {image}
          {description}
        </div>
        <i
          onClick={() => dispatch(playlistAction('back'))}
          className="fa-solid fa-backward-step"
        ></i>
        <SwitchPlayer
          active
          state={isPlaying ? 'stop' : 'play'}
          onClick={clickPlayer}
        />
        <i
          onClick={() => dispatch(playlistAction('next'))}
          className="fa-solid fa-forward-step"
        ></i>
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
          className={classes['player__volume-input']}
        />
        <Volume volume={volume} onClick={handleClickVolumen} />
      </div>
    </section>
  );
}

export default Player;
