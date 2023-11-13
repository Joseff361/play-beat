import { useRef } from 'react';

import classes from './ProgressBar.module.css';

interface Props {
  duration: number;
  progress: number;
}

function ProgressBar({ duration, progress }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const barRef = useRef<any>();

  const barWidth = barRef.current?.offsetWidth || 0;
  let progressWidth = 0;

  if (barWidth > 0 && duration > 0) {
    progressWidth = (barWidth * progress) / duration;
  }

  return (
    <div ref={barRef} className={classes['bar']}>
      <div
        style={{ width: progressWidth }}
        className={classes['bar__progress']}
      ></div>
      <div
        style={{ marginLeft: progressWidth - 4 }}
        className={classes['bar__circle']}
      ></div>
    </div>
  );
}

export default ProgressBar;
