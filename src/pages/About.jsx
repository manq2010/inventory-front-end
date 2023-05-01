import React from 'react';
import { Helmet } from 'react-helmet';
// import About from '../components/About';
import Layout from '../components/Layout/Layout';

const AboutPage = () => (
  <Layout>
    <Helmet>
      <title>NetAdminPros | About</title>
    </Helmet>

    <h1>About</h1>
    {/* <About /> */}
  </Layout>
);

export default AboutPage;
