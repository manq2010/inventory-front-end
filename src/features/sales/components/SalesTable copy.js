/* eslint-disable react/no-unused-prop-types */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PuffLoader } from 'react-spinners';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableBodyCell, TableHead, TableRow,
} from '../../../components/Table/Table';
import TablePagination from '../../../components/Table/TablePagination';
import { getSales } from '../salesSlice';

const SalesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SalesTableTitle = styled.h1`
  margin-top: 1rem;
  display: ${({ isLoading }) => (isLoading ? 'none' : 'block')};
`;

const CardContainer = styled.div`
  display: ${({ isLoading }) => (isLoading ? 'flex' : 'block')};
  align-items: center;
  justify-content: center;
  min-height: 300px;
`;

const SalesTable = () => {
  const { sales, isLoading } = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log('sales', sales);

  useEffect(() => {
    dispatch(getSales());
  }, [dispatch]);

  const showLoading = (isLoading) => {
    if (isLoading) {
      return (
        <CardContainer isLoading={isLoading}>
          <PuffLoader size={80} speedMultiplier={1} />
        </CardContainer>
      );
    }

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableBodyCell label="Name" />
            <TableBodyCell label="Total Price" />
            <TableBodyCell label="Total Items" />
            <TableBodyCell label="Total Units" />
            <TableBodyCell label="Created At" />
            <TableBodyCell label="Updated At" />
            <TableBodyCell label="User ID" />
          </TableRow>
        </TableHead>
        <TableBody>
          {sales.length > 0 ? (
            sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableBodyCell prop="name">{sale.name}</TableBodyCell>
                <TableBodyCell prop="total_price">{sale.total_price}</TableBodyCell>
                <TableBodyCell prop="total_items">{sale.total_items}</TableBodyCell>
                <TableBodyCell prop="total_units">{sale.total_units}</TableBodyCell>
                <TableBodyCell prop="created_at">{sale.created_at}</TableBodyCell>
                <TableBodyCell prop="updated_at">{sale.updated_at}</TableBodyCell>
                <TableBodyCell prop="user_id">{sale.user_id}</TableBodyCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableBodyCell colSpan={7}>No sales found.</TableBodyCell>
            </TableRow>
          )}
        </TableBody>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={sales.length}
          rowsPerPage={10}
          page={0}
        />
      </Table>
    );
  };

  return (
    <SalesWrapper>
      <SalesTableTitle isLoading={isLoading}>
        List of Sale
      </SalesTableTitle>
      <CardContainer isLoading={isLoading}>
        {showLoading(isLoading)}
      </CardContainer>
    </SalesWrapper>
  );
};

SalesTable.propTypes = {
  sales: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      total_price: PropTypes.number.isRequired,
      total_items: PropTypes.number.isRequired,
      total_units: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
      user_id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SalesTable;
