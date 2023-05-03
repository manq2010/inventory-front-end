/* eslint-disable react/no-unused-prop-types */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getSales } from '../salesSlice';

const SalesTable = () => {
  const { sales } = useSelector((state) => state.sales);
  const dispatch = useDispatch();

  console.log('sales', sales);

  useEffect(() => {
    dispatch(getSales());
  }, [dispatch]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, seTableRowowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    seTableRowowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, sales.length - page * rowsPerPage);

  return (
    <TableWrapper className="table-wrapper">
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Total Price</TableHeader>
            <TableHeader>Total Items</TableHeader>
            <TableHeader>Total Units</TableHeader>
            <TableHeader>User ID</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {(rowsPerPage > 0
            ? sales.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : sales
          ).map((sale) => (
            <TableRow key={sale.id}>
              <TableData>{sale.name}</TableData>
              <TableData>{sale.total_price}</TableData>
              <TableData>{sale.total_items}</TableData>
              <TableData>{sale.total_units}</TableData>
              <TableData>{sale.user_id.name}</TableData>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableData colSpan={7} />
            </TableRow>
          )}
        </tbody>
      </Table>

      <div className="table-pagination">
        <span>
          Showing
          {' '}
          {page * rowsPerPage + 1}
          -
          {Math.min((page + 1) * rowsPerPage, sales.length)}
          {' '}
          of
          {' '}
          {sales.length}
          {' '}
          sales
        </span>
        <div>
          <span>Rows per page:</span>
          <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={6}>6</option>
          </select>
        </div>
        <div>
          <button
            type="button"
            onClick={() => handleChangePage(null, page - 1)}
            disabled={page === 0}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => handleChangePage(null, page + 1)}
            disabled={page >= Math.ceil(sales.length / rowsPerPage) - 1}
          >
            Next
          </button>
        </div>
      </div>
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  overflow-x: auto;
  margin-top: 2rem;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableHeader = styled.th`
  background-color: #eee;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export default SalesTable;
