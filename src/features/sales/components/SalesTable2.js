import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// components
import { Table, TableBodyCell } from 'components';
// actions
import { fetchSales } from 'actions/sales';

const SalesTable = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.sales);

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  const columns = [
    { prop: 'id', label: 'ID' },
    { prop: 'date', label: 'Date' },
    { prop: 'product', label: 'Product' },
    { prop: 'quantity', label: 'Quantity' },
    { prop: 'price', label: 'Price' },
    { prop: 'total', label: 'Total' },
  ];

  const rows = data?.map((sale) => ({
    id: sale.id,
    date: sale.date,
    product: sale.product,
    quantity: sale.quantity,
    price: sale.price,
    total: <TableBodyCell component={sale.total} />,
  }));

  return (
    <div>
      <Table columns={columns} rows={rows} isLoading={isLoading} error={error} />
    </div>
  );
};

export default SalesTable;
