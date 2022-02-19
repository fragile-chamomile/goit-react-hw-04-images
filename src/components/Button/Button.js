import PropTypes from 'prop-types';
import { ButtonLoadMore } from './Button.styled';

function Button({ handleClickBtn }) {
  return (
    <ButtonLoadMore type="button" onClick={handleClickBtn}>
      Load more
    </ButtonLoadMore>
  );
}

Button.propTypes = {
  handleClickBtn: PropTypes.func.isRequired,
};

export default Button;
