import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NavLink as NavLinkBase } from 'react-router-dom';

const NavLink = ({ children, to }) => (
  <Wrapper>
    <NavLinkBase to={to}>
      {children}
    </NavLinkBase>
  </Wrapper>
);

NavLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

const Wrapper = styled.div`
  margin: 0 1rem;
`;

export default NavLink;
