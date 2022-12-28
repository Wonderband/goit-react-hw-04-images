import PropTypes from 'prop-types';
import css from './Button.module.css';
export const Button = ({ imagesQtt, page, perPage, loadMore }) =>
  imagesQtt > page * perPage && (
    <button type="button" className={css.Button} onClick={loadMore}>
      Load more
    </button>
  );

Button.propTypes = {
  imagesQtt: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  loadMore: PropTypes.func.isRequired,
};
