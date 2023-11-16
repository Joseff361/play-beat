import { useEffect } from 'react';

import { useAppDispatch } from '../../../store/hooks';
import { setUpTracksAndAlbums } from '../../../store/slices/tracksSlice';
import Profile from '../../atoms/Profile/Profile';
import Searcher from '../../molecules/Searcher/Searcher';
import classes from './Header.module.css';

const INIT_SEARCH = encodeURI('last summer whisper');

function Header() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUpTracksAndAlbums(INIT_SEARCH));
  }, [dispatch]);

  return (
    <header className={classes['header__container']}>
      <Searcher />
      <Profile />
    </header>
  );
}

export default Header;
