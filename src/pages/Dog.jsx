import React from 'react';
import { Helmet } from 'react-helmet';
// import About from '../components/About';
import Layout from '../components/Layout/Layout';

const DogPage = () => (
  <Layout>
    <Helmet>
      <title>NetAdminPros | Dog</title>
    </Helmet>

    <h1>Dog</h1>
    {/* <About /> */}
  </Layout>
);

export default DogPage;
