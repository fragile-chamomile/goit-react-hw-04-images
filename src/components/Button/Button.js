import PropTypes from 'prop-types';
import { ButtonLoadMore } from './Button.styled';

function Button() {
  return <ButtonLoadMore type="button">Load more</ButtonLoadMore>;
}

Button.propTypes = {
  handleClickBtn: PropTypes.func.isRequired,
};

export default Button;
