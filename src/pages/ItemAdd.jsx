import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout/Layout';
import ItemAdd from '../features/items/components/ItemsAdd';

const ItemAddPage = () => (
  <Layout>
    <Helmet>
      <title>Chillers | Add Item</title>
    </Helmet>
    <Div>
      <ItemAdd />
    </Div>
  </Layout>
);

export const Div = styled.div`
  h3 {
    text-align: center;
    margin-top: 1rem;
    /* margin-bottom: 1rem; */
  }
`;

export default ItemAddPage;
