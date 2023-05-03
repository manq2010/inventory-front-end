import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableBodyNoData = ({
  iconComponent, title, subtitle, columnsCount, noDataRowsCount,
}) => (
  <>
    {[...Array(noDataRowsCount || 10)].map((item, index) => (
      <tr key={index}>
        {[...Array(columnsCount)].map((cell, ind) => (
          <td key={ind} />
        ))}
      </tr>
    ))}
    <tr>
      <td>
        {iconComponent}
        <h3>{title}</h3>
        {subtitle && <StyledSubtext>{subtitle}</StyledSubtext>}
      </td>
    </tr>
  </>
);

TableBodyNoData.propTypes = {
  iconComponent: PropTypes.element,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  columnsCount: PropTypes.number.isRequired,
  noDataRowsCount: PropTypes.number,
};

const StyledSubtext = styled.p`
  /* max-width: 300px; */
  white-space: normal;
  text-align: center;
`;

export default TableBodyNoData;
