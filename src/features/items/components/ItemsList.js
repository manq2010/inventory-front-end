/* eslint-disable import/no-extraneous-dependencies */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getItems } from '../itemsSlice';

const ItemsList = () => {
  const { items } = useSelector((state) => state.items);
  console.log('items', items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <div className="carWrapper">
      {items.map((item) => (
        <li key={item.id}>
          {item.name}
        </li>

      ))}
    </div>
  );
};

export default ItemsList;
