import Player from '../Player/Player';
import classes from './Footer.module.css';

function Footer() {
  return (
    <footer className={classes['footer']}>
      <Player />
    </footer>
  );
}

export default Footer;
