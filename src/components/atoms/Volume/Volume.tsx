import classes from './Volume.module.css';

interface Props {
  volume: number;
  onClick: () => void;
}

function Volume({ volume, onClick }: Props) {
  let icon;

  if (volume === 0) {
    icon = <i className="fa-solid fa-volume-xmark"></i>;
  } else if (volume < 30) {
    icon = <i className="fa-solid fa-volume-off"></i>;
  } else if (volume < 60) {
    icon = <i className="fa-solid fa-volume-low"></i>;
  } else {
    icon = <i className="fa-solid fa-volume-high"></i>;
  }

  return (
    <div
      className={classes['volume']}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {icon}
    </div>
  );
}

export default Volume;
