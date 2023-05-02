import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout/Layout';
import ItemsList from '../features/items/components/ItemsList';

const ItemPage = () => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  const cardNum = (windowSize) => {
    switch (true) {
      case windowSize > 1500:
        return 8;
      case windowSize > 1280:
        return 6;
      case windowSize > 980:
        return 4;
      default:
        return 2;
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Chillers | Item</title>
      </Helmet>
      <Div>
        <ItemsList itemsPerPage={cardNum(windowSize[0])} />
      </Div>
    </Layout>
  );
};

export default ItemPage;

export const Div = styled.div`
  h3 {
    text-align: center;
    margin-bottom: 1rem;
  }
`;
