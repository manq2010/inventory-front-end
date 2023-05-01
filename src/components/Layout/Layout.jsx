import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import Footer from '../Footer';
// import Sidebar from '../Sidebar';
// components
import Navbar from './Navbar/Navbar';

const Layout = ({ children }) => (
  <StyleLayout id="content">
    <Navbar />
    {/* <Sidebar /> */}
    <main>{children}</main>
    {/* <Footer /> */}
  </StyleLayout>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export const StyleLayout = styled.div`
  height: 100vh;

  main {
    height: 100vh;

    padding: 2rem;
  }
`;

export default Layout;
