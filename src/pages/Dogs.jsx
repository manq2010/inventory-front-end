import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
// import About from '../components/About';
import Layout from '../components/Layout/Layout';
import BreedsTable from '../features/dogs/components/BreedsTable';

const DogPage = () => (
  <Layout>
    <Helmet>
      <title>NetAdminPros | Dog</title>
    </Helmet>
    <Div>
      <h3>Dog</h3>

      <BreedsTable />

    </Div>

    {/* <About /> */}
  </Layout>
);

export default DogPage;

export const Div = styled.div`
  h3 {
    text-align: center;
    margin-top: 3rem;
    margin-bottom: 1rem;
  }
`;
