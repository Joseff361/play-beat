import Profile from '../../atoms/Profile/Profile';
import Searcher from '../../molecules/Searcher/Searcher';
import classes from './Header.module.css';

function Header() {
  return (
    <header className={classes['header__container']}>
      <Searcher />
      <Profile />
    </header>
  );
}

export default Header;
