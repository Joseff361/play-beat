import classes from './Profile.module.css';

function Profile() {
  return (
    <section className={classes['profile__container']}>
      <div className={classes['profile__addon']}>
        <i className="fa-solid fa-gear"></i>
      </div>
      <div className={classes['profile__addon']}>
        <i className="fa-solid fa-bell"></i>
      </div>
      <div className={classes['profile__picture']}></div>
    </section>
  );
}

export default Profile;
