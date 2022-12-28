import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ imgUrl, hideModal }) => {
  const onEscape = e => {
    if (e.key === 'Escape') hideModal();
  };

  const onClick = e => {
    if (e.target === e.currentTarget) hideModal();
  };

  useEffect(() => {
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  });

  return (
    <div className="Overlay" onClick={onClick}>
      <div className="Modal">
        <img src={imgUrl} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
};
