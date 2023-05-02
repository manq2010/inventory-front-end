import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout/Layout';
import ItemsDetails from '../components/Lists/ListsDetail';

const ItemDetailsPage = () => (
  <Layout>
    <Helmet>
      <title>Chillers | Item</title>
    </Helmet>
    <Div>
      <ItemsDetails />

    </Div>
  </Layout>
);

export const Div = styled.div`
  h3 {
    text-align: center;
    /* margin-top: 3rem; */
    /* margin-bottom: 1rem; */
  }
`;

export default ItemDetailsPage;
