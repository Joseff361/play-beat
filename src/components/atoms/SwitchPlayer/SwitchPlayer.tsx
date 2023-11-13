import classes from './SwitchPlayer.module.css';

type State = 'play' | 'stop';

interface Props {
  state?: State;
  active?: boolean;
  onClick: () => void;
}

function SwitchPlayer({ state = 'play', active = false, onClick }: Props) {
  const icon =
    state === 'play' ? (
      <i
        style={active ? { color: 'white' } : undefined}
        className="fa-solid fa-play"
      ></i>
    ) : (
      <i
        style={active ? { color: 'white' } : undefined}
        className="fa-solid fa-pause"
      ></i>
    );

  return (
    <div
      onClick={onClick}
      style={active ? { backgroundColor: '#3cbc6e' } : undefined}
      className={classes['player-container']}
    >
      {icon}
    </div>
  );
}

export default SwitchPlayer;
