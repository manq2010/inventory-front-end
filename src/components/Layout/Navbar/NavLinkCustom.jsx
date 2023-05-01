import styled from 'styled-components';
import PropTypes from 'prop-types';

const NavLinkCustom = ({ children, onClick }) => (
  <StyledDiv onClick={onClick}>
    {children}
  </StyledDiv>
);

NavLinkCustom.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

const StyledDiv = styled.div`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  display: flex;
  align-items: center;
`;

export default NavLinkCustom;
