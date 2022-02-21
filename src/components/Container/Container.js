import { Wrapper } from './Container.styled';
import PropTypes from 'prop-types';

function Container({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Container;
