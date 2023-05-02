import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout/Layout';
// import ItemsList from '../features/items/components/ItemsList';

const SalePage = () => (
  <Layout>
    <Helmet>
      <title>Chillers | Sales</title>
    </Helmet>
    <Div>
      Sale
    </Div>
  </Layout>
);

export default SalePage;

export const Div = styled.div`
  h3 {
    text-align: center;
    margin-bottom: 1rem;
  }
`;
