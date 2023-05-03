import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PuffLoader } from 'react-spinners';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListsCard from '../../../components/Lists/ListsCard';
import { getItems } from '../itemsSlice';

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ItemListTitle = styled.h1`
  margin-top: 1rem;
  display: ${({ isLoading }) => (isLoading ? 'none' : 'block')};
`;

const CardContainer = styled.div`
  display: ${({ isLoading }) => (isLoading ? 'flex' : 'block')};
  align-items: center;
  justify-content: center;
  min-height: 300px;
`;

const PaginationContainer = styled.div`
  display: ${({ isLoading }) => (isLoading ? 'none' : 'block')};
  margin-top: 20px;
`;

const ItemsList = ({ itemsPerPage }) => {
  const { items, isLoading } = useSelector((state) => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  const showLoading = (isLoading) => {
    if (isLoading) {
      return (
        <CardContainer isLoading={isLoading}>
          <PuffLoader size={80} speedMultiplier={1} />
        </CardContainer>
      );
    }
    return (
      items.length > 0
        ? <ListsCard currentItems={currentItems} />
        : <p className="empty-msg">No items found.</p>
    );
  };

  return (
    <ItemWrapper>
      <ItemListTitle isLoading={isLoading}>
        List of Items
      </ItemListTitle>
      <CardContainer isLoading={isLoading}>
        {showLoading(isLoading)}
      </CardContainer>
      <PaginationContainer isLoading={isLoading}>
        <ReactPaginate
          nextLabel="->"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<-"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </PaginationContainer>
    </ItemWrapper>
  );
};

ItemsList.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
};

export default ItemsList;
