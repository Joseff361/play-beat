import { useAppDispatch } from '../../../store/hooks';
import { setUpTracksAndAlbums } from '../../../store/slices/tracksSlice';
import classes from './Searcher.module.css';

interface FormElements extends HTMLFormControlsCollection {
  trackInput: HTMLInputElement;
}

interface CustomFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function Searcher() {
  const dispatch = useAppDispatch();

  const submitHandler = async (event: React.FormEvent<CustomFormElement>) => {
    event.preventDefault();
    const inputValue = event.currentTarget.elements.trackInput.value;
    const encodedInput = encodeURI(inputValue);

    if (encodedInput.trim().length > 0) {
      dispatch(setUpTracksAndAlbums(encodedInput));
    }
  };

  return (
    <form className={classes['searcher__container']} onSubmit={submitHandler}>
      <div className={classes['searcher__input-container']}>
        <div className={classes['searcher__glass']}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <input
          className={classes['searcher__input']}
          placeholder="Search your favorite track"
          type="text"
          id="trackInput"
        />
      </div>
    </form>
  );
}

export default Searcher;
