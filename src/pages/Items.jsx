import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout/Layout';
import ItemsList from '../features/items/components/ItemsList';

const ItemPage = () => (
  <Layout>
    <Helmet>
      <title>Chillers | Item</title>
    </Helmet>
    <Div>
      <h3>Items</h3>

      <ItemsList />

    </Div>
  </Layout>
);

export default ItemPage;

export const Div = styled.div`
  h3 {
    text-align: center;
    margin-top: 3rem;
    margin-bottom: 1rem;
  }
`;
