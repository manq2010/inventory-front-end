import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableBodyCellSticky = ({ icon, text }) => (
  <StyledTd className="sticky">
    <div className="icon">{icon}</div>
    {text || ''}
  </StyledTd>
);

TableBodyCellSticky.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string.isRequired,
};

const StyledTd = styled.td`
  display: flex;
  align-items: stretch;
  font-weight: 600;
  gap: 0.5em;
  z-index: 2;
  position: sticky;
  z-index: 1;
`;

export default TableBodyCellSticky;
