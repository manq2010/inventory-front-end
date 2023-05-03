import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
`;

const PaginationButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.5rem;
  margin: 0 0.25rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray};
    cursor: not-allowed;
  }
`;

const PageSelect = styled.select`
  margin: 0 0.5rem;
`;

const TablePagination = ({
  itemsPerPage,
  totalItems,
  page,
  changePageHandler,
  changeItemsPerPageHandler,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event) => {
    const selectedPage = parseInt(event.target.value, 10);
    if (selectedPage >= 1 && selectedPage <= totalPages) {
      changePageHandler(selectedPage);
    }
  };

  const handleItemsPerPageChange = (event) => {
    const itemsPerPage = parseInt(event.target.value, 10);
    changeItemsPerPageHandler(itemsPerPage);
  };

  const renderPageOptions = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(<option key={i} value={i}>{i}</option>);
    }
    return pages;
  };

  return (
    <PaginationWrapper>
      <PaginationButton
        onClick={() => changePageHandler(page - 1)}
        disabled={page === 1}
      >
        Previous
      </PaginationButton>
      <PageSelect value={page} onChange={handlePageChange}>
        {renderPageOptions()}
      </PageSelect>
      <PaginationButton
        onClick={() => changePageHandler(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </PaginationButton>
      <span>Items per page:</span>
      <PageSelect value={itemsPerPage} onChange={handleItemsPerPageChange}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
      </PageSelect>
    </PaginationWrapper>
  );
};

TablePagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  changePageHandler: PropTypes.func.isRequired,
  changeItemsPerPageHandler: PropTypes.func.isRequired,
};

export default TablePagination;
