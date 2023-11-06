import React from 'react';

import DeezerService from '../../../services/DeezerService';
import classes from './Header.module.css';

interface FormElements extends HTMLFormControlsCollection {
  trackInput: HTMLInputElement;
}

interface CustomFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function Header() {
  const submitHandler = async (event: React.FormEvent<CustomFormElement>) => {
    event.preventDefault();
    const inputValue = event.currentTarget.elements.trackInput.value;
    const encodedInput = encodeURI(inputValue);

    if (encodedInput.trim().length > 0) {
      try {
        const { data } = await DeezerService.searchTracks(encodedInput);
        console.log(data);
      } catch {
        alert('error!');
      }
    }
  };

  return (
    <header className={classes['header__container']}>
      {/* {tracks.map(track => (
        <img alt="track-image" src={track.image} />
      ))} */}
      <form onSubmit={submitHandler}>
        <input type="text" id="trackInput" />
      </form>
    </header>
  );
}

export default Header;
