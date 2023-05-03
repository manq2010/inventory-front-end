import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as EllipseIcon } from 'assets/images/table/Ellipse.svg';

const TableBodyCellTh = ({ iconSrc, text, pendingAction }) => (
  <StyledTh>
    <div className="icon">
      {pendingAction && <EllipseIcon />}
      {iconSrc && <img src={iconSrc} alt="User Icon" className="user-icon" />}
    </div>
    {text || ''}
  </StyledTh>
);

TableBodyCellTh.propTypes = {
  iconSrc: PropTypes.string,
  text: PropTypes.string.isRequired,
  pendingAction: PropTypes.bool.isRequired,
};

const StyledTh = styled.th`
  display: flex;
  align-items: center;

  .icon {
    position: relative;

    svg {
      position: absolute;
      right: 0.7em;
      width: 0.5em;
      height: 0.5em;

      circle {
        fill: ${({ theme }) => theme.colors.error};
      }
    }
  }
`;

export default TableBodyCellTh;
