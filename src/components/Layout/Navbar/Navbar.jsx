import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SiModrinth } from 'react-icons/si';
// components
import NavLinkCustom from './NavLinkCustom';
import NavLink from './NavLink';
// paths
import Paths from '../../../pages/Paths';

const Navbar = () => {
  // utils
  const navigate = useNavigate();

  return (
    <StyledNavbar>
      <div>
        <NavLinkCustom onClick={() => navigate(Paths.defaultRoute)}>
          {/* <SiDatadog size="2rem" color="white" /> */}
          <SiModrinth size="2rem" color="white" />
        </NavLinkCustom>
      </div>
      <div>
        <NavLink to={Paths.main}>Main</NavLink>
        <NavLink to={Paths.item}>Item</NavLink>
        <NavLink to={Paths.dog}>Dogs</NavLink>
        <NavLink to={Paths.about}>About</NavLink>
      </div>
    </StyledNavbar>
  );
};

export default Navbar;

const StyledNavbar = styled.nav`
  position: fixed;
  inset-inline: 0;
  top: 0;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary.normal};
  font-size: 1rem;
  font-weight: bold;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.primary.lightest};
  z-index: 2;
  padding: 0 1rem;

  a {
    display: inline-block;
    padding-block: 0.875em;
    font-size: ${({ theme }) => theme.typography.p};

    &:not(.active):hover {
      color: ${({ theme }) => theme.colors.white};
    }

    &.active {
      color: white;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        display: block;
        bottom: 0;
        left: -0.1rem;
        right: -0.1rem;
        border-bottom: 0.25rem solid white;
        border-radius: 0.2rem 0.2rem 0 0;
      }
    }
  }

  > div:nth-child(2) {
    display: flex;
    flex: 1;
  }
`;
