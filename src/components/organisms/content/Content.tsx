import MainTrack from '../../molecules/MainTrack/MainTrack';
import Playlist from '../../molecules/Playlist/Playlist';
import classes from './Content.module.css';

function Content() {
  return (
    <section className={classes['content__container']}>
      <div className={classes['content__main-results']}>
        <MainTrack />
        <Playlist />
      </div>
      <div className={classes['content__related-results']}></div>
    </section>
  );
}

export default Content;
