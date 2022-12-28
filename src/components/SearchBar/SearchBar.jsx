import PropTypes from 'prop-types';
import css from './SearchBar.module.css';
export const SearchBar = ({ submitHandler }) => (
  <header className={css.SearchBar}>
    <form className={css.SearchForm} onSubmit={submitHandler}>
      <button type="submit" className={css.SearchFormButton}>
        <span className={css.SearchFormButtonLabel}>Search</span>
      </button>
      <input
        className={css.SearchFormInput}
        name="input"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  </header>
);

SearchBar.propTypes = {
  submitHandler: PropTypes.func.isRequired,
};
